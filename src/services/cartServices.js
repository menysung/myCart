import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
  //제품 id와 수량을 입력하여 장바구니 추가
  return apiClient.post(`/cart/${id}`, { quantity });
}

// 카트 정보를 가져오는 함수
export async function getCartAPI() {
  return await apiClient.get("/cart");
}
