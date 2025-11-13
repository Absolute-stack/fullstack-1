import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useContext, useEffect } from 'react';
import { AdminContext } from './context/Admincontext';
import { toast, ToastContainer } from 'react-toastify';
import Login from './pages/Login.jsx';
import Add from './pages/Add.jsx';
import List from './pages/List.jsx';
import Orders from './pages/Orders.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';
import Sidebar from './components/Sidebar.jsx';

function App() {
  const { token, setToken, backend } = useContext(AdminContext);

  async function verifyAdmin() {
    try {
      const res = await axios.get(`${backend}/api/user/verify`, {
        withCredentials: true,
      });
      if (res.data.success) setToken(true);
      else setToken(false);
    } catch (error) {
      setToken(false);
    }
  }

  useEffect(() => {
    verifyAdmin();
  }, []);

  // 🧩 IMPORTANT — render condition must handle undefined/null gracefully
  if (!token) {
    return (
      <>
        <ToastContainer />
        <Login />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="seperator">
        <div>
          <Sidebar />
        </div>
        <div className="main-display">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
