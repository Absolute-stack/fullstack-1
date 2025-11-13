import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AdminContextProvider from './context/Admincontext.jsx';
createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AdminContextProvider>
);
