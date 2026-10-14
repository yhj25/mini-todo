# 7주차 · React + Firebase

Node 24 LTS를 설치하고 package.json이 있는 이 폴더에서 시작합니다.

```sh
npm ci
cp .env.example .env.local
```

.env.local의 네 Firebase 값을 입력합니다. Firebase 콘솔에서 Email/Password를 활성화하고 Firestore (default) DB를 만든 뒤 firestore.rules 전체를 게시합니다.

```sh
npm run dev
```

React·Firebase·Vite는 npm ci에 포함됩니다. Firebase CLI는 이 실습에 필요하지 않습니다.

## 안내 파일
- INSTALLATION.html: OS별 설치 명령, Firebase 연결, Pages 배포, Ubuntu 직접 업로드 전체 순서
- 코드해설.html: React·Firebase·Pages·Nginx 코드 설명
- deploy/nginx-mini-todo.conf: 복사해서 사용할 Nginx 설정 전체
- .github/workflows/pages.yml: GitHub Pages 자동 배포

Ubuntu에는 로컬에서 VITE_BASE_PATH=/ npm run build로 만든 dist 파일을 scp로 올립니다. 서버 경로는 /var/www/mini-todo입니다. Node와 Firebase SDK는 서버에 설치하지 않습니다. 설치와 업로드 명령은 INSTALLATION.html의 실행 위치를 확인하고 한 블록씩 사용하세요.
