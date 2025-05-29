import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const products = {
  1: { id: 1, name: "Bánh Mỳ", price: 30000, img: "/images/imageBanhMy.jpg" },
  2: { id: 2, name: "Bánh Cuốn", price: 25000, img: "/images/imageBanhCuon.jpg" },
  3: { id: 3, name: "Phở Bò", price: 35000, img: "/images/imagePho.jpg" },
  4: { id: 4, name: "Xôi Ngũ Vị", price: 40000, img: "/images/imageXoi.jpg" },
  5: { id: 5, name: "Bánh Xèo", price: 50000, img: "/images/imageBanhXeo.jpg" },
  6: { id: 6, name: "Cơm Tấm", price: 60000, img: "/images/imageCom.jpg" },
};

function Home() {
  const { addToCart } = useCart();

  return (
    <div className="container">
      <h2 className="page-title">Menu</h2>
      <div className="grid">
        {Object.values(products).map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;