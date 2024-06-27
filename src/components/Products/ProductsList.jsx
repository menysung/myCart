import useData from "../../Hook/useData";
import ProductCard from "./ProductCard";
import "./ProductsList.css";

// const ProductsList = () => {
//   //제품들 데이터
//   const [products, setProducts] = useState([]);
//   //에러메세지
//   const [error, setError] = useState("");
//   //처음 시작시 제품데이터를 가져옴
//   useEffect(() => {
//     apiClient
//       .get("/products") //Get으로 요청 기본주소+/products
//       .then((res) => setProducts(res.data.products)) //결과를 업데이트
//       .catch((err) => setError(err)); //에러발생시 업데이트
//   }, []);

//서버에서 가져오는 데이터에는 제품 데이터 및 페이지 등 다른 데이터들 있음
const ProductsList = () => {
  const { data, error } = useData("products");

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data.products &&
          data.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              image={product.images[0]}
              price={product.price}
              rating={product.rating}
              ratingCounts={product.reviews.counts}
              stock={product.stock}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductsList;
