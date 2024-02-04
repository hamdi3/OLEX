import axios from 'axios';
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
// creating product Context
export const ProductContext = createContext();
//  using product provider
const ProductProvider = ({ children }) => {
  //  calling the access token for products
  const { accessToken } = useAuth();
  // initial products state
  const [products, setProducts] = useState([]);
  // fetch products
  const fetchProducts = useCallback(async () => {
    if (accessToken) {
      const response = await axios(
        'http://127.0.0.1:8000/products_api/products/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProducts(response.data);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchProducts();
  }, [accessToken, fetchProducts]);
  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
// creating custom hook
export const useProducts = () => {
  return useContext(ProductContext);
};
export default ProductProvider;
