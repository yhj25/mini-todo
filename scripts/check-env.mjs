import { loadEnv } from 'vite'
const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const keys = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_APP_ID']
const missing = keys.filter(key => !env[key] || env[key].includes('YOUR_'))
if (missing.length) {
  console.error('Firebase 설정 누락: ' + missing.join(', '))
  console.error('.env.local 또는 GitHub Actions의 Secrets를 확인하세요.')
  process.exit(1)
}
