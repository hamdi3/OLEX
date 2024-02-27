import { createContext, useEffect, useReducer } from 'react';
import cartReducer from '../reducers/cartReducer';
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  REMOVE_ITEM,
  UPDATE_AMOUNT,
  UPDATE_TOTAL,
} from '../actions/actions';

export const CartContext = createContext();
//  reducer state
const initialState = {
  cart: [],
  total: 0,
  amount: 0,
};
const CartProvider = ({ children }) => {
  // reducer state
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // clear Cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  // add to cart
  const addToCart = (id, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, product } });
  };
  //  remove item cart
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };
  //  increase cart amount
  const increaseAmount = (id) => {
    dispatch({ type: INCREASE_AMOUNT, payload: id });
  };
  // decrease cart Amount
  const decreaseAmount = (id) => {
    dispatch({ type: DECREASE_AMOUNT, payload: id });
  };
  useEffect(() => {
    //  calc the amount
    const newAmount = state.cart.reduce((acc, item) => acc + item.amount, 0);
    // calc the total in the cart
    const newTotal = state.cart.reduce(
      (acc, item) => acc + item.amount * item.price,
      0
    );
    dispatch({ type: UPDATE_AMOUNT, payload: newAmount });
    dispatch({ type: UPDATE_TOTAL, payload: newTotal });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        clearCart,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
