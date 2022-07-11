import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../layout/Provider/AuthContextProvider';
import UsersTeacherServices from '../layout/services/UsersTeacher.services';
const ProtectedUserRoute = ({ children }) => {
  
   const { userStudent } = UserAuth() || {};
   if (JSON.stringify(userStudent) === '{}') {
      localStorage.removeItem('Authorization');
      return <Navigate to="/dang-nhap" />;
      
   } else {
      return children;
   }

}
export default ProtectedUserRoute;