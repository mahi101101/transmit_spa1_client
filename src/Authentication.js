import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      setAuthenticated(true);
      const jsonToken = JSON.parse(token);
      const idToken = jwtDecode(jsonToken.id_token);

      axios
        .get("https://hostpc:4001/api/v1/user/details/email/" + idToken.email)
        .then((resp) => {
          setAuthenticatedUser(resp.data.data.result);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        authenticatedUser,
        setAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
