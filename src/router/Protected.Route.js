 import React from 'react';
 import { Navigate  } from 'react-router-dom';
 import { UserAuth } from '../layout/Provider/AuthContextProvider';
 const ProtectedRoute = ({children}) => {
    const {user} = UserAuth();
    localStorage.setItem('user', user.accessToken);
    console.log("user",user);
    if(JSON.stringify(user) === '{}'){
        return <Navigate to="/giao-vien/dang-nhap" />;
    }else return children;

 }
 export default ProtectedRoute;