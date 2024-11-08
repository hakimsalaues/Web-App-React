import React, { useState, useEffect } from 'react'; // Añadí useEffect para cargar datos al iniciar
import './productpage.css';
import BootstrapButton from '../components/BootstrapButton';
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from '../helper/LocalStorage'; // Importación del helper

const ProductPage = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'Guppy', price: 10, image: 'ad1.jpg', description: 'El Guppy es un pequeño pez colorido ideal para acuarios de agua dulce. Es fácil de cuidar y muy resistente.', videoUrl: 'https://www.youtube.com/embed/VeaUipBA-Xo' },
    { id: 2, name: 'Flower horn', price: 20, image: 'ad2.jpg', description: 'El Flower horn es un pez exótico conocido por su cabeza prominente y su carácter territorial.', videoUrl: 'https://www.youtube.com/embed/t83kcn5MzxM' },   
    { id: 3, name: 'Betas', price: 30, image: 'ad3.jpg', description: 'Los Betas son peces vibrantes y populares en acuarios domésticos. Tienen aletas largas y una gran variedad de colores.', videoUrl: 'https://www.youtube.com/embed/jO_f7ZnX4bI' },
    { id: 4, name: 'Gold fish', price: 25, image: 'e1.jpg', description: 'El clásico Gold Fish es un pez ideal para acuarios o estanques. Es muy resistente y fácil de cuidar.', videoUrl: 'https://www.youtube.com/embed/nRz1_zphBYg' },
    { id: 5, name: 'Gold fish fantail', price: 40, image: 'e2.jpg', description: 'Este tipo de Gold Fish tiene una hermosa cola en forma de abanico que le da un aspecto elegante.', videoUrl: 'https://www.youtube.com/embed/DGCk8C9v6QM' },
    { id: 6, name: 'Gold fish oranda', price: 33, image: 'e3.jpg', description: 'El Gold Fish Oranda es único por su protuberancia en la cabeza, que lo hace muy distintivo.', videoUrl: 'https://www.youtube.com/embed/G8uzI40Il70' },
    { id: 7, name: 'Pez angel', price: 35, image: 'pm1.jpg', description: 'El Pez Ángel es un elegante pez de agua dulce, conocido por su forma y su comportamiento tranquilo.', videoUrl: 'https://www.youtube.com/embed/di21fC7RPOs' },
    { id: 8, name: 'Fire fish', price: 50, image: 'pm2.jpg', description: 'El Fire Fish es un pez marino con colores vivos que añaden brillo a cualquier acuario.', videoUrl: 'https://www.youtube.com/embed/9kcMtbpxy3A' },
    { id: 9, name: 'Six line wrasse', price: 23, image: 'pm3.jpg', description: 'El Six Line Wrasse es un pez activo que ayuda a mantener el acuario libre de parásitos.', videoUrl: 'https://www.youtube.com/embed/rmt2lD5nP-E' },
    { id: 10, name: 'Angel Emperador', price: 50, image: 'angel_emperador.jpg', description: 'El Six Line Wrasse es un pez activo que ayuda a mantener el acuario libre de parásitos.', videoUrl: 'https://www.youtube.com/embed/PD-HXSl4aA8' },
    { id: 11, name: 'Pez Dory', price: 30, image: 'dory.jpg', description: 'El Six Line Wrasse es un pez activo que ayuda a mantener el acuario libre de parásitos.', videoUrl: 'https://www.youtube.com/embed/qRXrzdLB-9I' },
    { id: 12, name: 'Pez payaso', price: 28, image: 'payaso.jpg', description: 'El Six Line Wrasse es un pez activo que ayuda a mantener el acuario libre de parásitos.', videoUrl: 'https://www.youtube.com/embed/C0MTtkQn3d0'},
  ];

   // Paso 1: Cargar el carrito desde localStorage al montar el componente
   const [quantities, setQuantities] = useState(products.map(() => 0));  // Establecemos un estado vacío para las cantidades
   const [selectedProduct, setSelectedProduct] = useState(null);
 
   useEffect(() => {
     const savedCart = loadFromLocalStorage(); // Cargar el carrito desde localStorage
     const initialQuantities = products.map((product) => {
       const cartItem = savedCart.find((item) => item.id === product.id);
       return cartItem ? cartItem.quantity : 0; // Si hay un producto en el carrito, tomar su cantidad
     });
     setQuantities(initialQuantities); // Establecer las cantidades iniciales
   }, []);
 
   // Paso 2: Guardar el carrito en localStorage cada vez que se actualicen las cantidades
   const saveCartToLocalStorage = (newQuantities) => {
     const updatedCart = newQuantities.map((quantity, index) => {
       if (quantity > 0) {
         return { id: products[index].id, name: products[index].name, price: products[index].price, quantity };
       }
       return null;
     }).filter(item => item !== null);
 
     saveToLocalStorage(updatedCart); // Guardamos el carrito en localStorage
   };
 
   const increment = (index) => {
     const newQuantities = [...quantities];
     newQuantities[index] += 1;
     setQuantities(newQuantities); // Actualizamos el estado con las nuevas cantidades
     saveCartToLocalStorage(newQuantities); // Guardamos las nuevas cantidades en localStorage
   };
 
   const decrement = (index) => {
     const newQuantities = [...quantities];
     if (newQuantities[index] > 0) {
       newQuantities[index] -= 1;
       setQuantities(newQuantities); // Actualizamos el estado con las nuevas cantidades
       saveCartToLocalStorage(newQuantities); // Guardamos las nuevas cantidades en localStorage
     }
   };
 
   const handlePurchase = () => {
     const totalProducts = quantities.reduce((acc, qty) => acc + qty, 0);
     const calculatedTotalPrice = products.reduce((acc, product, index) => acc + (product.price * quantities[index]), 0);
 
     if (totalProducts > 0) {
       Swal.fire({
         title: '¿Confirmar compra?',
         text: `Estás a punto de agregar ${totalProducts} productos con un total de $${calculatedTotalPrice}.`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Confirmar',
         cancelButtonText: 'Cancelar',
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire('Compra realizada!', 'Tus productos han sido añadidos al carrito.', 'success');
           setQuantities(products.map(() => 0)); // Restablecer las cantidades al comprar
           addToCart(totalProducts, calculatedTotalPrice);
           clearLocalStorage(); // Limpiar el carrito de localStorage después de la compra
         }
       });
     } else {
       Swal.fire({
         title: 'Carrito vacío',
         text: 'No has agregado productos.',
         icon: 'info',
         confirmButtonText: 'Aceptar'
       });
     }
   };
 
   const openModal = (product) => {
     setSelectedProduct(product);
   };
 
   const closeModal = () => {
     setSelectedProduct(null);
   };
 
   return (
     <div className="product-page">
       <header>
         <h1>Productos</h1>
         <select name="categorias" id="categorias">
           <option value="marinos">Peces marinos</option>
           <option value="dulce">Peces de agua dulce</option>
           <option value="estanque">Peces de estanque</option>
           <option value="alimentos">Alimentos para peces (próximamente)</option>
         </select>
       </header>
 
       <section className="contenedor">
         {products.map((product, index) => (
           <div key={product.id} className="producto-item">
             <img src={`/images/fish/${product.image}`} alt={product.name} />
             <h2>{product.name}</h2>
             <p className="price">Precio: ${product.price}</p>
             <div className="quantity-controls">
               <button onClick={() => decrement(index)}>-</button>
               <span>{quantities[index]}</span>
               <button onClick={() => increment(index)}>+</button>
             </div>
             <button className="details-button" onClick={() => openModal(product)}>Ver Detalles</button>
           </div>
         ))}
       </section>
 
       <div className="totals">
         <button onClick={handlePurchase}>Confirmar Compra</button>
       </div>
 
       {selectedProduct && (
         <div className="modal-overlay" onClick={closeModal}>
           <div className="modal-content" style={{ backgroundColor: '#375857' }} onClick={(e) => e.stopPropagation()}>
             <h2>{selectedProduct.name}</h2>
             <img src={`/images/fish/${selectedProduct.image}`} alt={selectedProduct.name} className="product-image-large" />
             <p>{selectedProduct.description}</p>
             {selectedProduct.videoUrl && (
               <div className="video-container">
                 <iframe 
                   width="100%" 
                   height="315" 
                   src={selectedProduct.videoUrl} 
                   title="Video del Producto"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen>
                 </iframe>
               </div>
             )}
             <button className="close-button" onClick={closeModal}>Cerrar</button>
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default ProductPage;