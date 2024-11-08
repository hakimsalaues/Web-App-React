import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer';
import ProductPage from './paginas/productpage';
import HomeLayout from './Layouts/HomeLayout';
import BasicLayout from './Layouts/BasicLayout';
import CartWidget from './components/CartWidget';
import BootstrapButton from './components/BootstrapButton'; // Importa el botón de Bootstrap

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Crear el elemento de script para cargar SweetAlert desde el CDN
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.body.appendChild(script);

    // Limpiar el script cuando el componente se desmonte (opcional)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const addToCart = (quantity, price) => {
    setCartCount(cartCount + quantity);
    setTotalPrice(totalPrice + price);
  }; 

  const resetCartCount = () => {
    setCartCount(0);
    setTotalPrice(0);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout cartCount={cartCount} totalPrice={totalPrice} resetCartCount={resetCartCount}>
              <CartWidget cartCount={cartCount} totalPrice={totalPrice} resetCartCount={resetCartCount} />
            </HomeLayout>
          }
        />
        <Route
          path="/productos"
          element={
            <BasicLayout cartCount={cartCount} totalPrice={totalPrice} resetCartCount={resetCartCount}>
              <CartWidget cartCount={cartCount} totalPrice={totalPrice} resetCartCount={resetCartCount} />
              <ProductPage addToCart={addToCart} />
            </BasicLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;