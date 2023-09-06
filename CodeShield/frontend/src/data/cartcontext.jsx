import React from "react";

const CartContext = React.createContext();

const MyCartContext = ({ children }) => {
  const [data, setData] = React.useState({
    itemCount: 0,
    items: [],
  });
  return (
    <CartContext.Provider value={{data, setData}}>
      {children}
    </CartContext.Provider>
  );
};

export {MyCartContext,CartContext};
