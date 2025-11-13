import { useContext } from 'react';
import { AdminContext } from '../context/Admincontext';
import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
function Login() {
  const { token, setToken, backend } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        backend + '/api/user/admin',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setToken(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} action="#" className="login-form">
        <h2>Admin Login Panel</h2>
        <div className="form-item">
          <label htmlFor="email-input-field">Email</label>
          <input
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            name="email-input-field"
            id="email-input-field"
            placeholder="Your Email..."
          />
        </div>
        <div className="form-item">
          <label htmlFor="password-input-field">Password</label>
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="text"
            name="password-input-field"
            id="password-input-field"
            placeholder="Your Password..."
          />
        </div>
        <button type="submit" className="">
          LOGIN
        </button>
      </form>
    </>
  );
}

export default Login;
