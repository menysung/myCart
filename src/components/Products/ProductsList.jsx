import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Pagination from "../Common/Pagination";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import "./ProductsList.css";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams(); // ?(물음표) 뒤의 쿼리스트링 가져온다
  const category = search.get("category"); //쿼리스트링에서 category=값을 가져온다
  const page = search.get("page");
  const searchQuery = search.get("search"); //검색어 가져오기
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  //console.log("카테고리 :" + category);
  //서버에서 가져오는 데이터에는 제품데이터 및 페이지등 다른 데이터들 있음.
  const { data, error, isLoading } = useData(
    "products",
    { params: { search: searchQuery, category, page } },
    [category, page, searchQuery]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  //쿼리스트링 search에 페이지를 업데이트한다
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products]; //제품 데이터 복사

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {/* pagination 넣기 */}
      {data && (
        <Pagination
          total={data.totalProducts} //전체페이지 출력
          perPage={8} //한 페이지에 8개 출력
          onClick={handlePageChange} //클릭하면 클릭한 페이지로 쿼리스트링 바뀜
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductsList;
