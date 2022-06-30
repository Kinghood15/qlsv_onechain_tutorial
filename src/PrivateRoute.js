import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './layout/Provider/AuthContextProvider';
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route {...rest} render={routeProps => !!currentUser ? (
            <RouteComponent {...routeProps} />
        ) : (
            <Navigate to="/giao-vien/dang-nhap" />
        )}
        />
    );
};
export default PrivateRoute;