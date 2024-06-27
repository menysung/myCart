import "./QuantityInput.css";

const QuantityInput = ({ quantity, setQuantity, stock }) => {
  console.log({ quantity, setQuantity, stock });
  return (
    <>
      <button
        onClick={() => setQuantity((prev) => prev - 1)}
        className="quantity_input_button"
        disabled={quantity <= 1}
      >
        {" "}
        -{" "}
      </button>
      {/* 현재 수량 화면에 표시하기 */}
      <p className="quantity_input_count">{quantity}</p>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="quantity_input_button"
        disabled={quantity >= stock}
      >
        {""}+{""}
      </button>
    </>
  );
};

export default QuantityInput;
