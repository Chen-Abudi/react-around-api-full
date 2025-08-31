import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const user = useContext(AccountContext);

  return (
    <Route>
      {() =>
        user.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
