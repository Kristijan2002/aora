import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";

interface GlobalContextType {
   isLoggedIn: boolean;
   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
   user: any;
   setUser: React.Dispatch<React.SetStateAction<any>>;
   isLoading: boolean;
  }

const GlobalContext = createContext<GlobalContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    isLoading: true
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: any }> = ({ children }) =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;