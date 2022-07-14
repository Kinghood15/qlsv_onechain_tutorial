import './App.css';
import Login from './layout/LoginStudent';
// import SignUpStudent from './layout/SignUpStudent';
import Home from './layout/pages/Home';
import Dashboard from './layout/pages/Dashboard';
import MainPages from './layout/pages/MainPages';
import LoginTeacher from './layout/LoginTeacher';
import Error404 from './layout/pages/404';
import SignUpTeacher from './layout/SignUpTeacher';
import UserTeacherForm from './layout/UserTeacherForm';
import ChangePasswordStudent from './layout/ChangePasswordStudent';
import MainProfile from './layout/pages/MainProfile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotificationMessageProvider from './layout/Provider/NotificationMessageProvider';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./layout/Firebase";
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './layout/env';
import CryptoJS from 'crypto-js';
import { useState } from 'react';
import { AuthContextProvider } from './layout/Provider/AuthContextProvider';
import ProtectedRoute from './router/Protected.Route';
import ProtectedUserRoute from './router/ProtectedUser.Route';
// import PrivateRoute from './PrivateRoute';
function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* <div> */}
          <Route path="/" exact element={<Home accesstoken={true} />} />
          {/* <Route path="/giao-vien/tong-quan" element={
            <ProtectedRoute>
              <Dashboard accesstoken={true} />
            </ProtectedRoute>
          } /> */}
          <Route path="/giao-vien/sinh-vien" element={
            <ProtectedRoute>
              <MainPages page="List" />
            </ProtectedRoute>
          } />
          <Route path="/giao-vien/sinh-vien/them-sinh-vien" element={
            <ProtectedRoute>
              <MainPages page="NewUser" />
            </ProtectedRoute>
          } />
          <Route path="/giao-vien/thong-tin-ca-nhan" element={
            <ProtectedRoute>
              <MainProfile page="ShowUser" />
            </ProtectedRoute>
          } />
          <Route path="/giao-vien/thong-tin-ca-nhan/chinh-sua-thong-tin-ca-nhan" element={
            <ProtectedRoute>
              <MainProfile page="EditUser" />
            </ProtectedRoute>
          } />
          <Route path="/404" element={<Error404 />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/giao-vien/dang-nhap" element={<LoginTeacher />} />
          {/*<Route path="/thay-doi-thong-tin-ca-nhan" element={<EditUser />} /> {/*Dang Fix */}
          <Route path="/giao-vien/dang-ky" element={<SignUpTeacher />} />
          <Route path="/giao-vien/dang-ky-2" element={<UserTeacherForm />} />
        </Routes>
      </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;
          {/* <Route path="/dang-nhap" element={<Login />} /> {/*Dang Fix */}
          // <Route path="/cap-nhat-thong-tin-sinh-vien" element={
          //   <ProtectedUserRoute>
          //     <UserStudentForm />
          //   </ProtectedUserRoute>
          // } />{/* Dang Fix */}
          // <Route path="/doi-mat-khau" element={
          //   <ProtectedUserRoute>
          //     <ChangePasswordStudent />
          //   </ProtectedUserRoute>
          // } /> 