import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(AccountContext);

  if (!loggedIn) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;
