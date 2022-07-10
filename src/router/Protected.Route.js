import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../layout/Provider/AuthContextProvider';
import UsersTeacherServices from '../layout/services/UsersTeacher.services';
const ProtectedRoute = ({ children }) => {
  
   const { user } = UserAuth() || {};
   let userLocal;
   var userChecked = localStorage.getItem('Authorization');
   try {
      if(JSON.parse(userChecked)){
         userLocal = JSON.parse(localStorage.getItem('Authorization'));
      }else{
         userLocal = null;
      }
   } catch (error) {
      userLocal = {};
   }
   const getUser = async(email) => {   
      try {
         const UserTeacher = await UsersTeacherServices.getUserTeacherByEmail(email);
         if(UserTeacher) {
            UserTeacher.forEach((user) => {
               if(user){
                  return true;
               }
            })
            return false;
         }
      } catch (error) {
         
      }
   }
   if (JSON.stringify(user) === '{}') {
      if (userLocal === null) {
         // userLocal is null and user is null
         localStorage.removeItem('Authorization');
         
         return <Navigate to="/giao-vien/dang-nhap" />;
      }else if(userLocal.email && userLocal.accesstoken){
         // user is null and userLocal not null
         // This is not correct, hummmmm
         localStorage.removeItem('Authorization');
         return <Navigate to="/giao-vien/dang-nhap" />;
      }
   } else {
      if(userLocal!== null){
         // user not null and userLocal not null
         if (userLocal.stsTokenManager.accessToken === user.accessToken && user.email === userLocal.email) {
            return children;
         }else if(userLocal.stsTokenManager.accessToken !== user.accessTokenx){
            localStorage.removeItem('Authorization');
            user = '';
            return <Navigate to="/giao-vien/dang-nhap" />;
         }
      }else if(userLocal === null ){
         // user not null and userLocal is null
         localStorage.setItem('Authorization', JSON.stringify(user));
        
      }else{
         console.log("Error")
      }
   }

}
export default ProtectedRoute;