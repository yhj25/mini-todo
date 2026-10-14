import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, setupError } from './firebase'
import { errorMessage } from './errors'
import { useAuth } from './useAuth'
import AuthPanel from './components/AuthPanel.jsx'
import TodoPanel from './components/TodoPanel.jsx'

export default function App() {
  const { user, ready, message } = useAuth()
  const [leaving, setLeaving] = useState(false)
  const [sessionError, setSessionError] = useState('')

  async function logout() {
    if (leaving) return
    setLeaving(true)
    setSessionError('')
    try { await signOut(auth) }
    catch (error) { setSessionError(errorMessage(error)) }
    finally { setLeaving(false) }
  }

  return (
    <main className="shell">
      <header className="masthead">
        <span>WEEK 07 · MINI TODO</span><span>React + Firebase</span>
      </header>
      <section className="intro">
        <p className="eyebrow">나에게 집중하는 작은 기록</p>
        <h1>나의 작은 할 일</h1>
        <p>오늘 할 일을 저장하고, 끝낸 일에 표시해 보세요.</p>
      </section>
      {setupError ? (
        <section className="panel">
          <h2>Firebase 연결 준비</h2>
          <p>.env.example을 .env.local로 복사한 뒤, Firebase 웹 앱의 설정값 4개를 입력하세요.</p>
          <p>파일을 저장하고 개발 서버를 다시 시작하면 로그인 화면이 나타납니다.</p>
        </section>
      ) : !ready ? (
        <p role="status">로그인 상태를 확인하고 있습니다…</p>
      ) : (
        <>
          {user && <div className="account">
            <span>{user.email}</span>
            <button className="quiet" disabled={leaving} onClick={logout}>로그아웃</button>
          </div>}
          {(message || sessionError) && <p role="alert" className="error">{message || sessionError}</p>}
          {/* [화면] 계정이 바뀌면 key도 바뀌어 이전 목록과 입력 상태를 새로 만듭니다. */}
          {user
            ? <TodoPanel key={user.uid} uid={user.uid} />
            : <AuthPanel />}
        </>
      )}
      <footer>초급프로젝트 7주차 실습 · 사용자마다 자신의 할 일만 볼 수 있습니다.</footer>
    </main>
  )
}
