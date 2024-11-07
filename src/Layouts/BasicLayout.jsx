import React from 'react';
import NavBar from '../components/NavBar';

const BasicLayout = ({ cartCount, resetCartCount, children }) => {
  return (
    <div>
      <NavBar showWelcome={false} />  
      <main>{children}</main>
    </div>
  );
};

export default BasicLayout;