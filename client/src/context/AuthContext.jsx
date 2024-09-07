import { createContext, useContext, useEffect, useState } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest, updatePasswordRequest, updateProfileRequest } from '../api/auth.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState("");
  const [errorup, setErrorup] = useState("");
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  const updatePassword = async (user) => {
    try {
      const res = await updatePasswordRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrorup("");
    } catch (error) {
      setErrorup(error.response.data.message);
    }
  }

  const updateProfile = async (user) => {
    try {
      const res = await updateProfileRequest(user);
      console.log(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrorup("");
      console.log(res.data);
    } catch (error) {
      setErrorup(error.response.data.message);
    }
  }


  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  const logout = () => {
    Cookies.remove("token");
    isAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        updatePassword,
        updateProfile,
        loading,
        user,
        isAuthenticated,
        errors,
        errorup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};