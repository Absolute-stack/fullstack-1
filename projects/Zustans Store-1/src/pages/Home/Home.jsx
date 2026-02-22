import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <Link
        onMouseEnter={() => import('../Counter/Counter.jsx')}
        onTouchStart={() => import('../Counter/Counter.jsx')}
        to="/counter"
      >
        Counter🔢
      </Link>
      <Link
        onMouseEnter={() => import('../Cart/Cart.jsx')}
        onTouchStart={() => import('../Cart/Cart.jsx')}
        to="/cart"
      >
        Shopping Cart
      </Link>
    </div>
  );
}
