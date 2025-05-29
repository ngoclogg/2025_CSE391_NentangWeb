function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.img} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">{product.price.toLocaleString()} VNĐ</p>
      <button
        onClick={() => addToCart(product.id, product)}
        className="product-button"
      >
        Thêm Vào Giỏ Hàng
      </button>
    </div>
  );
}

export default ProductCard;