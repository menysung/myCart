const Logout = () => {
  // 로그아웃시 토큰 삭제하고 홈으로 이동
  localStorage.removeItem("token");
  window.location = "/";

  return null;
};

export default Logout;
