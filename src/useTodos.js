import { useEffect, useRef, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, limit, onSnapshot,
  orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { errorMessage } from './errors'

export function useTodos(uid) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const pending = useRef(false)

  // [DB 1] UID가 바뀌면 이전 관찰을 끝내고 새 계정의 목록을 관찰합니다.
  useEffect(() => {
    setTodos([])
    setLoading(true)
    setMessage('')
    const todoCollection = collection(db, 'users', uid, 'todos')
    const todoQuery = query(todoCollection, orderBy('createdAt', 'desc'), limit(50))
    const unsubscribe = onSnapshot(todoQuery, snapshot => {
      setTodos(snapshot.docs.map(item => ({ ...item.data(), id: item.id })))
      setLoading(false)
    }, error => {
      setMessage(errorMessage(error))
      setLoading(false)
    })
    return unsubscribe // [DB 2] 로그아웃으로 화면이 사라질 때도 관찰을 끝냅니다.
  }, [uid])

  function todoCollection() {
    return collection(db, 'users', uid, 'todos')
  }

  // [DB 3] 중복 요청 방지, 오류 표시와 성공 여부 반환을 한곳에서 처리합니다.
  async function run(action) {
    if (pending.current) return false
    pending.current = true
    setBusy(true)
    setMessage('')
    try { await action(); return true }
    catch (error) { setMessage(errorMessage(error)); return false }
    finally { pending.current = false; setBusy(false) }
  }

  function cleanTitle(value) {
    const title = value.trim()
    if (!title || title.length > 80) {
      setMessage('할 일은 공백을 제외해 1~80자로 입력하세요.')
      return null
    }
    return title
  }

  function addTodo(value) {
    const title = cleanTitle(value)
    if (!title) return Promise.resolve(false)
    // [DB 4] ID는 자동 생성하고 생성 시각은 서버가 정합니다.
    return run(() => addDoc(todoCollection(), {
      title, done: false, createdAt: serverTimestamp(),
    }))
  }
  function toggleTodo(todo) {
    return run(() => updateDoc(doc(todoCollection(), todo.id), { done: !todo.done }))
  }
  function renameTodo(todo, value) {
    const title = cleanTitle(value)
    if (!title) return Promise.resolve(false)
    return run(() => updateDoc(doc(todoCollection(), todo.id), { title }))
  }
  function removeTodo(todo) {
    return run(() => deleteDoc(doc(todoCollection(), todo.id)))
  }
  return { todos, loading, busy, message, addTodo, toggleTodo, renameTodo, removeTodo }
}
