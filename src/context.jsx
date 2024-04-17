// createContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "./Link";
import Cookies from 'js-cookie'



const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const socket = io('ws://localhost:8900/');
  const [token, setToken] = useState(null)
  const [ data, setData ] = useState()

  useEffect(() => {
    const uId = Cookies.get('uId');
    setToken(uId);
  });

  const setTokenContext = (value) =>{
    setToken(value)
  }

  useEffect(() => {
    if (token)
      axios.get(`${Link}getUser`, {
        headers: {
          'token': token
        }
      })
        .then(function (response) {
            setData(response?.data.user);
        })
        .catch(function (error) {
          console.log(error);
        });
  },[token, data])

  return (
    <AppContext.Provider value={{
      token,
      setTokenContext,
      data
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
