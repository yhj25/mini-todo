import { useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { errorMessage } from '../errors'

export default function AuthPanel() {
  // [입력] value는 상태를 표시하고 onChange는 입력한 값으로 상태를 바꿉니다.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const pending = useRef(false)

  async function submit(event) {
    event.preventDefault() // 폼 제출 때문에 브라우저가 새로고침되지 않게 합니다.
    if (pending.current) return
    pending.current = true
    setBusy(true)
    setMessage('')
    try {
      // [로그인] 가입과 로그인의 요청 함수를 고릅니다. 화면 전환은 useAuth가 알립니다.
      const action = isSignup
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword
      await action(auth, email.trim(), password)
      setPassword('')
    } catch (error) {
      setMessage(errorMessage(error))
    } finally {
      pending.current = false
      setBusy(false)
    }
  }

  function changeMode() {
    setIsSignup(previous => !previous)
    setMessage('')
    setPassword('')
  }

  return (
    <section className="panel auth-panel">
      <div className="section-heading"><h2>{isSignup ? '회원가입' : '로그인'}</h2><span>이메일 계정</span></div>
      <form onSubmit={submit}>
        <label htmlFor="email">이메일</label>
        <input id="email" value={email} onChange={event => setEmail(event.target.value)}
          type="email" autoComplete="username" required disabled={busy} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" value={password} onChange={event => setPassword(event.target.value)}
          type="password" required disabled={busy} minLength={isSignup ? 12 : 6}
          autoComplete={isSignup ? 'new-password' : 'current-password'} />
        <p className="hint">{isSignup ? '12자 이상으로 입력하세요. 프로젝트의 비밀번호 정책도 적용됩니다.' : '가입한 이메일과 비밀번호로 로그인하세요.'}</p>
        {message && <p className="error" role="alert">{message}</p>}
        <button className="primary wide" disabled={busy}>{busy ? '처리 중…' : isSignup ? '계정 만들기' : '로그인'}</button>
      </form>
      <button className="quiet mode" disabled={busy} onClick={changeMode}>
        {isSignup ? '계정이 있나요? 로그인' : '처음인가요? 회원가입'}
      </button>
    </section>
  )
}
