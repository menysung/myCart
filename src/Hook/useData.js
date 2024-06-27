import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

//url에 서버의 뒷주소(endpoint)를 적어서 GET으로 데이터와 에러를 가져온다
//현재 로딩상태를 추가한다
//두번째 입력은 객체 형식으로 ?쿼리스트링을 추가한다
//세번째 입력은 카테고리가 있을 경우 useEffect에 새로 실행되는 값.(없을 경우는 시작시만 실행됨)
const useData = (url, customConfig, deps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(url, customConfig)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    },
    deps ? deps : []
  );

  return { data, error, isLoading };
};

export default useData;
