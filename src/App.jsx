import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { addToCartAPI } from "./services/cartServices";
import setAuthToken from "./utils/setAuthToken";

//이미 인증된 토큰이 있으면 요청헤더에 추가하고 없으면 제거한다.
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  console.log(cart);
  //제품과, 개수를 입력하여 장바구니 업데이트
  const addToCart = (product, quantity) => {
    //같은 제품이 추가되면 수량만 추가하자!
    const updatedCart = [...cart]; //장바구니 복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    ); // 찾으면 그 제품의 인덱스 번호가 리턴됨 아니면 -1
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    // 백엔드 서버에도 장바구니 추가
    addToCartAPI(product._id, quantity)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  //시작시 jwt 토큰을 가져옴
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload(); //재시작(리프레쉬)
      } else {
        setUser(jwtUser); //유효기간 내일때 유저정보 저장
      }
    } catch (err) {}
  }, []);

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
