import React from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

function ProtectedRoute({ children }) {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return children;
  } else if (login === false) {
    <Navigate to={'/login'} />;
  } else {
    return <></>;
  }
}

export default ProtectedRoute;
