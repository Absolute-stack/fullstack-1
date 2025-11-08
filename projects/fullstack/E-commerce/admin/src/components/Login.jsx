import axios from 'axios';
import { useState } from 'react';
import './Login.css';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', {
        email,
        password,
      });
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        setToken(response.data.adminToken);
      }, 4000);
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || 'Login in Failed Try Again';
      toast.error(errMsg);
    }
  }
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>Admin Panel Login</h1>
        <form action="#" onSubmit={handleSubmit}>
          <div className="form-item">
            <p>Email Address</p>
            <input
              onInput={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="example@gmail.com..."
            />
          </div>
          <div className="form-item">
            <p>Password</p>
            <input
              onInput={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter Your Password..."
            />
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
