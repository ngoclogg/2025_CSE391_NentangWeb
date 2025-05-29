import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, updateQty, clearCart } = useCart();

  const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container">
      <h2 className="page-title">Giỏ Hàng 🛒</h2>
      {Object.keys(cart).length === 0 ? (
        <p className="empty-cart">Bụng bạn đói à, mua đồ ăn đi 🍛</p>
      ) : (
        <>
          <ul className="cart-list">
            {Object.entries(cart).map(([id, item]) => (
              <li key={id} className="cart-item">
                <span>{item.name} (x{item.qty})</span>
                <span>{(item.price * item.qty).toLocaleString()} VNĐ</span>
                <div className="controls">
                  <button
                    onClick={() => updateQty(id, -1)}
                    className="decrease"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQty(id, 1)}
                    className="increase"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total: {total.toLocaleString()} VNĐ</span>
            <button onClick={clearCart} className="clear-cart">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;