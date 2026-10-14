import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

// StrictMode는 개발 중 Effect의 연결·정리가 올바른지 추가로 확인합니다.
createRoot(document.getElementById('app')).render(
  <StrictMode><App /></StrictMode>,
)
