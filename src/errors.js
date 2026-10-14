const messages = {
  'auth/invalid-credential': '이메일 또는 비밀번호를 확인해 주세요.',
  'auth/wrong-password': '이메일 또는 비밀번호를 확인해 주세요.',
  'auth/user-not-found': '이메일 또는 비밀번호를 확인해 주세요.',
  'auth/invalid-email': '이메일 형식을 확인해 주세요.',
  'auth/email-already-in-use': '가입할 수 없습니다. 기존 계정 로그인을 확인해 주세요.',
  'auth/weak-password': 'Firebase에 설정한 비밀번호 정책을 확인해 주세요.',
  'auth/password-does-not-meet-requirements': '비밀번호 정책을 충족하지 않습니다.',
  'auth/operation-not-allowed': 'Firebase에서 이메일/비밀번호 로그인을 켜 주세요.',
  'auth/network-request-failed': '인터넷 연결을 확인해 주세요.',
  'auth/too-many-requests': '요청이 많습니다. 잠시 뒤 다시 시도해 주세요.',
  'permission-denied': '데이터 권한을 확인해 주세요. Firestore Rules와 UID를 확인합니다.',
  'unavailable': '서버에 연결할 수 없습니다. 인터넷 연결을 확인해 주세요.',
}
export function errorMessage(error) {
  return messages[error.code] || `요청을 처리하지 못했습니다. (${error.code || 'unknown'})`
}
