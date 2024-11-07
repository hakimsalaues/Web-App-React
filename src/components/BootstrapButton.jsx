// BootstrapButton.jsx
import { useEffect } from 'react';

function BootstrapButton({ children, onClick }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);


}

export default BootstrapButton;
