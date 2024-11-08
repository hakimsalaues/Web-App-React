// helper/LocalStorage.js

export const saveToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
  
  export const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; // Si no hay carrito guardado, retornar un array vacío
  };
  
  export const clearLocalStorage = () => {
    localStorage.removeItem('cart'); // Limpiar el carrito del localStorage
  };
  