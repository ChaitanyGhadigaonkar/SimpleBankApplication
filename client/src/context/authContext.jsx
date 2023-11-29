import { createContext, useEffect, useState } from "react";
import { VITE_API_URL } from "../../config";

import toast from "react-hot-toast";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const registerHandler = async (name, email, password) => {
    try {
      const res = await fetch(`${VITE_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Sign up successful. Please Login to access the content");
      } else {
        toast.error("somethings went's wrong");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const loginHandler = async (email, password) => {
    try {
      const res = await fetch(`${VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("login successful");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return (
    <authContext.Provider
      value={{ user, setUser, loginHandler, registerHandler }}
    >
      {children}
    </authContext.Provider>
  );
};
