import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext ';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const { accessToken, user } = useAuth();
  const [products, setProducts] = useState([]);
  const fetchProducts = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/products_api/products/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [accessToken, products]);

  useEffect(() => {
    fetchProducts();
  }, [accessToken]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
