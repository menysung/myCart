import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";

function App() {
  const [user, setUser] = useState(null);

  //시작시 jwt 토근을 가져온다
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token"); //유효기간 지났을때 삭제하고
        window.location.reload(); //재시작한다
      } else {
        setUser(jwtUser); //유효기간 안 지났을때는 저장한다
      }
    } catch (err) {}
    // 실제 에러가 아니라 가입한 경우가 없을수도있으니까 그대로 두기
  }, []);

  return (
    <div className="app">
      <Navbar user={user} />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
