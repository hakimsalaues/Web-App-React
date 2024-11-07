import React from 'react';

const ItemListContainer = ({ welcomeMessage }) => {
  return (
    <div className="item-list-container">
      <h1>{welcomeMessage}</h1>
      {}
    </div>
  );
};

export default ItemListContainer;