import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Ẩm Thực Việt Nam - DevSwhat Quán 🛎️</Link>
        <Link to="/cart" className="cart-link">
          🧺
          {Object.keys(cart).length > 0 && (
            <span className="cart-badge">
              {Object.keys(cart).length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;