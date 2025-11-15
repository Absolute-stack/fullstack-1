import { useState, useEffect } from 'react';
import { assets } from '../assets/assest.js';
import { useContext } from 'react';
import { ShopContext } from '../contxt/ShopContext.jsx';
import './Navbar.css';

function Navbar() {
  const { showSearchbar, setShowSearchbar } = useContext(ShopContext);
  const [fixed, setFixed] = useState('');

  useEffect(() => {
    function autoadd() {
      if (window.scrollY > 50) {
        setFixed('active');
      } else {
        setFixed('');
      }
    }

    window.addEventListener('scroll', autoadd);

    return () => window.removeEventListener('scroll', autoadd);
  }, []);

  return (
    <nav className={`prim-nav ${fixed}`}>
      <div className="search-container">
        <img
          onClick={() => setShowSearchbar(true)}
          src={assets.search_icon}
          loading="eager"
          alt=""
          className="icon-btn"
        />
      </div>
      <div className="logo-container">
        <img src={assets.logo} loading="eager" alt="" />
      </div>
      <div className="profile-container">
        <img
          src={assets.profie_icon}
          loading="eager"
          alt=""
          className="icon-btn"
        />
      </div>
    </nav>
  );
}

export default Navbar;
