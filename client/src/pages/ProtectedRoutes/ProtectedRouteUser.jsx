import {Navigate, Outlet} from 'react-router-dom';


export const ProtectedRouteUser = ({isAllowed, children, redirectTo = '/',rol}) => {


  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};
