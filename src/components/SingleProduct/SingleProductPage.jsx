import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Loader from "../Common/Loader";
import QuantityInput from "./QuantityInput";
import "./SingleProductPage.css";

const SingleProductPage = () => {
  // 선택한 이미지 기억
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams(); //주소 변수 값으로 id 얻기
  //console.log(id);
  //id 값으로 제품 데이터 요청한다
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  //console.log(product);
  //구매 증가, 감소 버튼
  const [quantity, setQuantity] = useState(1); //초기값 1 이다

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            {/* 큰 이미지는 왼쪽 4개의 이미지중 선택한 인덱스 번호의 이미지 표시 */}
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              ￦ {product.price.toLocaleString("ko-KR")} 원
            </p>

            <h2 className="quantity_title">구매개수:</h2>
            <div className="align_center quantity_input">
              {/* quantity: 현재 선택된 수량 */}
              {/* setquantiry: 수량을 업데이트하는 함수 */}
              {/* stock: 제품의 재고 수량 */}
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock} //재고보다 많은 수량 선택 할 수 없음
              />
            </div>

            <button className="search_button add_cart">장바구니 추가</button>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
