import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  //  getting the access token for products
  const { accessToken } = useAuth();
  // products state
  const [products, setProducts] = useState([]);
  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios(
        'http://127.0.0.1:8000/products_api/products/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(response.data);
      setProducts(response.data);
    };

    fetchProducts();
  }, [accessToken]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('https://fakestoreapi.com/products');
  //     const data = await response.json();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
