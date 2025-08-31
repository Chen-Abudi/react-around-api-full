import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { auth } from "../utils/auth";
import { AccountContext } from "../contexts/AccountContext";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";

import AroundUS from "./AroundUS";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/api";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountData, setAccountData] = useState({ _id: "", email: "" });
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isInfoToolTipAction, setIsInfoToolTipAction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setAccountData(res.data);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  const closeAllTooltips = () => {
    setIsInfoToolTipOpen(false);
    setListener(false);
  };

  const closeOnEscape = (evt) => {
    if (evt.key === "Escape") closeAllTooltips();
  };

  const setListener = (listen) => {
    listen
      ? document.addEventListener("keydown", closeOnEscape)
      : document.removeEventListener("keydown", closeOnEscape);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    api.updatedAuthUserToken("");
    setLoggedIn(false);
    navigate("/signin");
  };

  const login = (userData) => {
    setLoggedIn(true);
    setAccountData(userData);
    navigate("/");
  };

  const handleRegister = (credentials) => {
    setIsLoading(true);
    auth
      .register(credentials)
      .then((res) => {
        setIsInfoToolTipAction("successful");
        api.updatedAuthUserToken(localStorage.getItem("jwt"));
        login(res.data);
      })
      .catch((err) => {
        console.log(`${err} one of the fields was filled in incorrectly`);
        setIsInfoToolTipAction("unsuccessful");
        setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setListener(true);
        setIsLoading(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogin = (credentials) => {
    setIsLoading(true);
    auth
      .login(credentials)
      .then((res) => {
        api.updatedAuthUserToken(localStorage.getItem("jwt"));
        login(res.data);
      })
      .catch((err) => {
        console.log(`${err} the user with the specified email not found`);
        setIsInfoToolTipAction("unsuccessful");
        setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setListener(true);
        setIsLoading(false);
      });
  };

  const handleShowTooltip = (success, text) => {
    setIsSuccess(success);
    setIsInfoToolTipAction(text);
    setIsInfoToolTipOpen(true);
  };

  return (
    <AccountContext.Provider value={{ loggedIn, accountData }}>
      <div className="container">
        <Header
          loggedIn={loggedIn}
          userEmail={accountData.email}
          handleLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <AroundUS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                showTooltip={handleShowTooltip}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                showTooltip={handleShowTooltip}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllTooltips}
          isSuccess={isSuccess}
          action={isInfoToolTipAction}
          isToolTipOpen={isInfoToolTipOpen}
          name="tooltip"
        />
        <Footer />
      </div>
    </AccountContext.Provider>
  );
}

export default App;
