import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../layout/Provider/AuthContextProvider';
import UsersTeacherServices from '../layout/services/UsersTeacher.services';
const ProtectedRoute = ({ children }) => {
   const { user } = UserAuth();
   // localStorage.setItem('user', user.accessToken);
   // console.log("user",user);
   // localStorage.setItem('user',JSON.stringify(user));
   // console.log("AuthContextProvider in localStorage", localStorage.getItem('Authorization'));
   const userLocal = JSON.parse(localStorage.getItem('Authorization'));
   // console.log("userLocal", userLocal);
   // console.log("user", user);
   // console.log("userLocal.accesstoken === user.accesstoken", userLocal.accesstoken === user.accesstoken);
   const getUser = async(email) => {
      const UserTeacher = await UsersTeacherServices.getUserTeacherByEmail(email);
      UserTeacher.forEach((user) => {
         if(user){
            return true;
         }
      })
      return false;
   }
   if (JSON.stringify(user) === '{}') {
      if (userLocal === null) {
         return <Navigate to="/giao-vien/dang-nhap" />;
      }else if(userLocal.email){
         console.log("userLocal.email in JSON.stringfy(user)", userLocal.email);
      }
   } else {
      if(userLocal && userLocal.accesstoken){
         console.log("userLocal not in JSON.stringfy(user)", userLocal)
         if (userLocal.accesstoken === user.accesstoken) {
            return children;
         }
      }else if(userLocal !== null ){
         const checkEmail = getUser(userLocal.email);
         if(checkEmail){
            return children;
         }else{
            localStorage.removeItem('Authorization');
            return <Navigate to="/giao-vien/dang-nhap" />;
         }
      }
   }

}
export default ProtectedRoute;