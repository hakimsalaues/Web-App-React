import React, { useEffect, useState } from 'react';
import { loadFromLocalStorage, clearLocalStorage } from '../helper/LocalStorage';

const CartWidget = ({ cartCount, totalPrice, resetCartCount }) => {
  const [savedCart, setSavedCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar el componente
  useEffect(() => {
    const loadedCart = loadFromLocalStorage();
    setSavedCart(loadedCart); // Guardamos los productos en estado local
  }, []);

  const handleCartClick = () => {
    if (cartCount > 0) {
      // Alerta de compra realizada
      Swal.fire({
        title: '¡Compra realizada!',
        text: `Has comprado ${cartCount} productos. Total: $${totalPrice}`,
        imageUrl: "https://c.tenor.com/wfReVicMcJYAAAAd/tenor.gif",
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // Resetea el carrito después de confirmar la alerta
        resetCartCount();
        clearLocalStorage(); // Limpiar el carrito de localStorage
      });
    } else {
      // Alerta de carrito vacío
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No tienes productos en el carrito.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="cart-widget" onClick={handleCartClick}>
      <span className='carrito'>🛒</span>
      {cartCount > 0 && <span className='contador'>{cartCount}</span>}
    </div>
  );
};

export default CartWidget;
