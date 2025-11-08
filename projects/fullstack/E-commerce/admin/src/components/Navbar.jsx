import { assets } from '../assets/assets.js';
import './Navbar.css';
function Navbar({ setToken }) {
  return (
    <>
      <nav className="admin-nav">
        <img src={assets.logo} alt="" />
        <button onClick={() => setToken('')}>Logout</button>
      </nav>
    </>
  );
}

export default Navbar;
