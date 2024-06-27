import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

//url에 서버의 뒷주소(endpoint)를 적어서 GET으로 데이터와 에러를 가져온다
const useData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return { data, error };
};

export default useData;
