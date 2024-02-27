import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  REMOVE_ITEM,
} from '../actions/actions';

const cartReducer = (state, action) => {
  // clearing the cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], amount: 0, total: 0 };
  }
  // add to cart
  if (action.type === ADD_TO_CART) {
    const cartItem = state.cart.find((item) => item.id === action.payload.id);
    // if the item is in the cart
    if (cartItem) {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        ),
      };
    } else {
      //  amount to be 1 for new item
      const newItem = { ...action.payload.product, amount: 1 };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  // remove item form the cart
  if (action.type === REMOVE_ITEM) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  // increase cart amount
  if (action.type === INCREASE_AMOUNT) {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  // decrease cart amount
  if (action.type === DECREASE_AMOUNT) {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => item.amount > 0);
    return { ...state, cart: tempCart };
  }
  // update amount when cart changes
  if (action.type === 'UPDATE_AMOUNT') {
    return { ...state, amount: action.payload };
  }
  // update total when cart changes
  if (action.type === 'UPDATE_TOTAL') {
    return { ...state, total: action.payload };
  }

  return state;
};

export default cartReducer;
