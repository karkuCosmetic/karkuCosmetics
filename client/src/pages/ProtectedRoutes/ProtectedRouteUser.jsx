import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {DecodedToken} from '../../utils/DecodedToken';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {getUserDetail} from '../../functions/fetchingUsers';
import { useEffect, useRef } from 'react';

// export const ProtectedRouteUser = ({children}) => {
//   const location = useLocation ();

//   const UserRoutes = ['/profile'];
//   const userAdmin = ['/admin'];

//   const token = GetDecodedCookie ('cookieToken');
//   let rol;

//   const CallUsers = async value => {
//     const data = await getUserDetail (value);
//     rol = data.Rol;
//   };

//   if (token) {
//     const {value} = DecodedToken (token);

//     if (value) {
//       CallUsers (value);
//     }
//   }
//   console.log (rol);
//   if (!token) {
//     return <Navigate to={'/login'} />;
//   }

//   return children;
// };

export const ProtectedRouteUser = ({ children }) => {
  const location = useLocation();
  const rolRef = useRef(null);

  const UserRoutes = ['/profile'];
  const userAdmin = ['/admin'];

  const token = GetDecodedCookie('cookieToken');

  const fetchUserRol = async () => {
    if (token) {
      const { value } = DecodedToken(token);
      if (value) {
        const data = await getUserDetail(value);
        rolRef.current = data.Rol;
      }
    }
  };

  useEffect(() => {
    fetchUserRol();
  }, [token]);
  if (rolRef.current!=="ROL_Admin") {
    console.log(rolRef.current);
    return <Navigate to="/login" />;
  }

  return children;
};