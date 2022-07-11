import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserStudentAuth } from '../layout/Provider/AuthStudentContextProvider';
import UsersTeacherServices from '../layout/services/UsersTeacher.services';
const ProtectedUserRoute = ({ children }) => {
  
   const { userStudent } = UserStudentAuth() || {};
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
   // const getUser = async(email) => {   
   //    try {
   //       const UserTeacher = await UsersTeacherServices.getUserTeacherByEmail(email);
   //       if(UserTeacher) {
   //          UserTeacher.forEach((user) => {
   //             if(user){
   //                return true;
   //             }
   //          })
   //          return false;
   //       }
   //    } catch (error) {
         
   //    }
   // }
   if (JSON.stringify(userStudent) === '{}') {
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
         if (userLocal.stsTokenManager.accessToken === userStudent.accessToken && userStudent   .email === userLocal.email) {
            return children;
         }else if(userLocal.stsTokenManager.accessToken !== userStudent.accessTokenx){
            localStorage.removeItem('Authorization');
            userStudent = '';
            return <Navigate to="/giao-vien/dang-nhap" />;
         }
      }else if(userLocal === null ){
         // user not null and userLocal is null
         localStorage.setItem('Authorization', JSON.stringify(userStudent));
        
      }else{
         console.log("Error")
      }
   }

}
export default ProtectedUserRoute;