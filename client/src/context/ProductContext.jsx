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
  0;
};

export const ProductProvider = ({ children }) => {
  const { accessToken, user } = useAuth();
  const [products, setProducts] = useState([]);

  const deleteroduct = (id) => {
    let newPro = products.filter((item) => item.id !== id);
    setProducts(newPro);
    console.log('deletedproducts');
  };
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
    // Only fetch products if accessToken and user are available
    if (accessToken && user) {
      fetchProducts();
    }
  }, [accessToken, user]);

  return (
    <ProductContext.Provider value={{ products, deleteroduct }}>
      {children}
    </ProductContext.Provider>
  );
};
