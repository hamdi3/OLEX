import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext ';
import authFetchProducts from '../axios/authFetchProducts';
import axios from 'axios';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};
export const ProductProvider = ({ children }) => {
  const { accessToken, user } = useAuth();
  const [products, setProducts] = useState([]);

  // fetching Products
  const fetchProducts = useCallback(async () => {
    if (user) {
      try {
        const response = await authFetchProducts('/products/');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [accessToken, products]);

  //  deleting Products
  const deletedProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/products_api/products/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
      console.log('deleted', response);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/products_api/products/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
      console.log('deleted', response);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        deletedProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
