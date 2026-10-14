import { useState } from 'react'
import { useTodos } from '../useTodos'

export default function TodoPanel({ uid }) {
  const { todos, loading, busy, message, addTodo, toggleTodo, renameTodo, removeTodo } = useTodos(uid)
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editedTitle, setEditedTitle] = useState('')
  // 렌더링할 때 배열에서 계산합니다. 별도 Effect나 상태가 필요하지 않습니다.
  const completed = todos.filter(todo => todo.done).length

  async function add(event) {
    event.preventDefault()
    if (await addTodo(title)) setTitle('') // 저장 실패 시 입력은 유지합니다.
  }
  function startEdit(todo) {
    setEditingId(todo.id)
    setEditedTitle(todo.title)
  }
  async function saveEdit(event, todo) {
    event.preventDefault()
    if (await renameTodo(todo, editedTitle)) setEditingId(null)
  }
  async function remove(todo) {
    if (window.confirm(`“${todo.title}”을 삭제할까요?`)) await removeTodo(todo)
  }

  return (
    <section className="panel">
      <div className="section-heading"><h2>나의 목록</h2><span>표시 중 {todos.length}개 / 완료 {completed}개</span></div>
      <form className="add-form" onSubmit={add}>
        <label className="sr-only" htmlFor="new-todo">새 할 일</label>
        <input id="new-todo" value={title} onChange={event => setTitle(event.target.value)}
          placeholder="오늘 할 일을 적어 보세요" maxLength={80} required disabled={busy} />
        <button className="primary" disabled={busy || !title.trim()}>추가</button>
      </form>
      {message && <p className="error" role="alert">{message}</p>}
      {loading ? <p role="status" className="empty">목록을 불러오고 있습니다…</p>
        : !todos.length && <p className="empty">첫 번째 할 일을 추가해 보세요.</p>}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <form className="edit-form" onSubmit={event => saveEdit(event, todo)}>
                <input value={editedTitle} onChange={event => setEditedTitle(event.target.value)}
                  aria-label="할 일 수정" maxLength={80} required disabled={busy} />
                <button className="primary" disabled={busy}>저장</button>
                <button type="button" className="quiet" disabled={busy} onClick={() => setEditingId(null)}>취소</button>
              </form>
            ) : (
              <>
                <label className={`todo-title${todo.done ? ' completed' : ''}`}>
                  <input type="checkbox" checked={todo.done} disabled={busy} onChange={() => toggleTodo(todo)} />
                  <span>{todo.title}</span>
                </label>
                <button className="quiet" disabled={busy} onClick={() => startEdit(todo)} aria-label={`${todo.title} 수정`}>수정</button>
                <button className="quiet danger" disabled={busy} onClick={() => remove(todo)} aria-label={`${todo.title} 삭제`}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <p className="hint">최근 생성한 50개까지 표시합니다. 변경 사항은 Firebase에 저장됩니다.</p>
    </section>
  )
}
