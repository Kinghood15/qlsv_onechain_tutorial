 import React from 'react';
 import { Navigate  } from 'react-router-dom';
 import { UserAuth } from '../layout/Provider/AuthContextProvider';
 const ProtectedRoute = ({children}) => {
    const {user} = UserAuth();
    // localStorage.setItem('user', user.accessToken);
    // console.log("user",user);
    // localStorage.setItem('user',JSON.stringify(user));
    console.log("user in localStorage",localStorage.getItem('user'));
    const userLocal =JSON.parse(localStorage.getItem('user'));
    console.log("userLocal",userLocal);
    console.log("user",user);
    console.log("userLocal == user",userLocal == user);
    if(JSON.stringify(user) === '{}'){
       if(JSON.stringify(userLocal) === '{}'){
        return <Navigate to="/giao-vien/dang-nhap" />;
       }
    }else return children;

 }
 export default ProtectedRoute;