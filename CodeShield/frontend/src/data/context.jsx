import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [opa, setOpa] = useState({
    opacity: false,
    color : '',
    message: ''
  });
  return (
    <MyContext.Provider value={{ opa, setOpa }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
