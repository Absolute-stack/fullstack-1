import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SideBar from './components/SideBar.jsx';
import List from './pages/List.jsx';
import Orders from './pages/Orders.jsx';
import Login from './components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/AddProduct.jsx';
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return token === '' ? (
    <div className="auth-wrapper">
      <ToastContainer />
      <Login setToken={setToken} />
    </div>
  ) : (
    <div className="dashboard-wrapper">
      <Navbar setToken={setToken} />
      <div className="dashboard-content">
        <SideBar />
        <div className="app-content">
          <Routes>
            <Route path="/add" element={<AddProduct token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
