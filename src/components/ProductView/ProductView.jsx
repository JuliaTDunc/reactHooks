import React, { useState, useEffect } from 'react';
import ProductListItem from '../ProductListItem';
import ProductDetails from '../ProductDetails';
import './ProductView.css';

function ProductView({ products }) {

  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    console.log(`selectedProduct CHANGED TO`, selectedProduct)
    if (selectedProduct) {
      setSideOpen(true);
      localStorage.setItem('sideOpen', sideOpen)
    }
  }, [selectedProduct]);

  useEffect(() => {
    console.log(`sideOpen CHANGED TO`, sideOpen)
    if (!sideOpen) {
      setSelectedProduct();
      localStorage.setItem('sideOpen', sideOpen)
    }
  }, [sideOpen])


  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={selectedProduct && selectedProduct.id === item.id}
              onClick={() => setSelectedProduct(item)}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
            onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
