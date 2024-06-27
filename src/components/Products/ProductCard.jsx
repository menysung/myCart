import { Link } from "react-router-dom";
import basket from "../../assets/basket.png";
import star from "../../assets/white-star.png";
import "./ProductCard.css";

const ProductCard = ({
  id,
  image,
  price,
  title,
  rating,
  ratingCounts,
  stock,
}) => {
  return (
    <article className="product_card">
      <div className="product_image">
        <Link to={`/product/${id}`}>
          <img
            src={`http://localhost:5000/products/${image}`}
            alt="product image"
          />
        </Link>
      </div>

      <div className="product_details">
        <h3 className="product_price">{price?.toLocaleString("ko-KR")} 원</h3>
        <p className="product_title">{title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" />
              {rating}
            </p>
            <p className="product_review_count">{ratingCounts}</p>
          </div>

          {stock > 0 && (
            <button className="add_to_cart">
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
