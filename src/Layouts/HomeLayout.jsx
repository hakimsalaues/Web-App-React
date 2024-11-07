import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import '../components/scoped-bootstrap.css';
import './HomeLayout.css';

const HomeLayout = ({ cartCount, children }) => {
  useEffect(() => {
    // Cargar los estilos de Swiper desde un CDN
    const linkSwiper = document.createElement('link');
    linkSwiper.href = 'https://unpkg.com/swiper/swiper-bundle.min.css';
    linkSwiper.rel = 'stylesheet';
    document.head.appendChild(linkSwiper);

    // Cargar el script de Swiper desde un CDN
    const scriptSwiper = document.createElement('script');
    scriptSwiper.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
    scriptSwiper.defer = true; // Asegura que se cargue después del contenido
    document.body.appendChild(scriptSwiper);

    // Inicializar Swiper después de que el script se haya cargado
    scriptSwiper.onload = () => {
      const swiper = new window.Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: true,
        loopAdditionalSlides: 1,
        autoHeight: true,
      });
    };

    // Limpiar (remover) los elementos cuando el componente se desmonte
    return () => {
      document.head.removeChild(linkSwiper);
      document.body.removeChild(scriptSwiper);
    };
  }, []);

  return (
    <div className="pagina-home">
      <NavBar cartCount={cartCount} />

      <main>
        <header>
          <div className="header" aria-label="logo de la empresa"></div>
        </header>

        <section className="perfil"></section>

        <h1>Bienvenido</h1>

        <p className="intro">
          ¡Bienvenido a Fish&Co.! Nos apasiona el mundo acuático y estamos aquí para ayudarte a crear un acuario lleno de vida y color. Descubre nuestra amplia
          selección de peces, plantas y accesorios de alta calidad. Nuestro equipo de expertos está listo para ofrecerte asesoramiento y cuidados personalizados
          para tus amigos acuáticos. ¡Ven y sumérgete en una experiencia única en Fish&Co.!
        </p>

        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="/images/fish/ad1.jpg" alt="Pez de agua dulce" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/ad2.jpg" alt="Pez de agua dulce" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/ad3.jpg" alt="Pez de agua dulce" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/e1.jpg" alt="Pez marino" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/e2.jpg" alt="Pez marino" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/e3.jpg" alt="Pez marino" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/pm1.jpg" alt="Pez de estanque" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/pm2.jpg" alt="Pez de estanque" />
            </div>
            <div className="swiper-slide">
              <img src="/images/fish/pm3.jpg" alt="Pez de estanque" />
            </div>
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>

        <nav>
          <div className="nav-center">
            <Link to="/productos" className="links">
              IR A CATALOGO
            </Link>
          </div>
        </nav>
      </main>

      <footer>
        <section className="derechos">
          <p>Todos los derechos reservados©</p>
        </section>
      </footer>
    </div>
  );
};

export default HomeLayout;
