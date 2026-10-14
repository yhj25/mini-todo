import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// [연결 1] Vite가 읽은 웹 앱 설정값으로 어느 Firebase 프로젝트인지 지정합니다.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const setupError = Object.values(config).some(
  value => !value || value.includes('YOUR_'),
)
// [연결 2] 인증(auth)과 데이터베이스(db)를 다른 파일에서도 가져다 쓰게 합니다.
const app = setupError ? null : initializeApp(config)
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
