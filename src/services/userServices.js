import apiClient from "../utils/api-client";

export async function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);

  // axios로 서버에 유저폼데이터 post 요청한다
  // 토큰을 저장한다
  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem("token", data.token);
}

// 로그인 함수 : 유저객체를 입력한다
// 토큰을 저장한다
export async function login(user) {
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem("token", data.token);
}
