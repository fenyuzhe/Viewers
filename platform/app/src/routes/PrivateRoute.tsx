// import React from 'react';
// import { useUserAuthentication } from '@ohif/ui';

// export const PrivateRoute = ({ children, handleUnauthenticated }) => {
//   const [{ user, enabled }] = useUserAuthentication();

//   if (enabled && !user) {
//     return handleUnauthenticated();
//   }

//   return children;
// };

// export default PrivateRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('auth') === 'true';

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
