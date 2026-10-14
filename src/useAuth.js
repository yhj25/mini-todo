import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, setupError } from './firebase'
import { errorMessage } from './errors'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('')

  // [인증 1] 로그인 상태는 Firebase가 알려주는 현재 계정을 기준으로 합니다.
  useEffect(() => {
    if (setupError) return
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setMessage('')
      setReady(true)
    }, error => {
      setUser(null)
      setMessage(errorMessage(error))
      setReady(true)
    })
    // [인증 2] 화면 제거 시 관찰을 끝냅니다. StrictMode의 재연결에도 대응합니다.
    return unsubscribe
  }, [])

  return { user, ready, message }
}
