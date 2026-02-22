import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Cart = lazy(() => import('./pages/Cart/Cart.jsx'));
const Counter = lazy(() => import('./pages/Counter/Counter.jsx'));

function App() {
  return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/counter"
            element={
              <Suspense fallback={null}>
                <Counter />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={null}>
                <Cart />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
