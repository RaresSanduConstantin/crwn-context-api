import { render } from "@testing-library/react";
import React, { createContext, useState, useEffect } from "react";
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartItemsTotal,
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemsFromCart: () => {},
  cartItemsCount: 0,
  cartItemsTotal: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const localState = JSON.parse(localStorage.getItem("cartItems"));
  const [cartItems, setCartItems] = useState(localState);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItemsTotal, setCartItemsTotal] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemsFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));

  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartItemsTotal(getCartItemsTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        addItem,
        removeItem,
        clearItemsFromCart,
        cartItems,
        cartItemsCount,
        cartItemsTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
