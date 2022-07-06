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
   console.log("user",user);
   console.log("userLocal",userLocal);
   if (JSON.stringify(user) === '{}') {
      console.log("JSON.stringify === {}",JSON.stringify(user) === '{}');
      if (userLocal === null) {
         // userLocal is null and user is null
         console.log("userLocal is null and user is null");
         localStorage.removeItem('Authorization');
         
         return <Navigate to="/giao-vien/dang-nhap" />;
      }else if(userLocal.email && userLocal.accesstoken){
         // user is null and userLocal not null
         // This is not correct, hummmmm
         localStorage.removeItem('Authorization');
         console.log("user is null and userLocal not null");
         return <Navigate to="/giao-vien/dang-nhap" />;
      }
   } else {
      console.log("JSON.stringify !== {}",JSON.stringify(user) === '{}');
      if(userLocal!== null){
         // user not null and userLocal not null
         console.log("user not null and userLocal not null",userLocal.stsTokenManager.accessToken == user.accessToken);
         console.log("user.accessToken",user.accessToken);
         console.log("userLocal.stsTokenManager.accessToken",userLocal.stsTokenManager.accessToken);
         if (userLocal.stsTokenManager.accessToken === user.accessToken && user.email === userLocal.email) {
            console.log("user not null and userLocal not null and user.accessToken === userLocal.stsTokenManager.accessToken");
            return children;
         }else if(userLocal.stsTokenManager.accessToken !== user.accessTokenx){
            console.log("user not null and userLocal not null and user.accessToken !== user.accessToken");
            localStorage.removeItem('Authorization');
            user = '';
            return <Navigate to="/giao-vien/dang-nhap" />;
         }
      }else if(userLocal === null ){
         // user not null and userLocal is null
         console.log("user not null and userLocal is null");
         localStorage.setItem('Authorization', JSON.stringify(user));
        
      }else{
         console.log("Error")
      }
   }

}
export default ProtectedRoute;