import apiClient from "../utils/api-client";

//유저객체와 이미지파일을 입력받아서 폼데이터 객체로 서버로 post 요청
export async function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);
  //axios로 서버에 유저폼데이터 post 요청
  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem("token", data.token);
}

//로그인 함수 : 유저객체를 입력
export async function login(user) {
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem("token", data.token);
}
