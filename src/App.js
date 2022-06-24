import './App.css';
import Login from './layout/LoginStudent';
import SignUp from './layout/SignUpStudent';
import Home from './layout/pages/Home';
import Dashboard from './layout/pages/Dashboard';
import List from './layout/pages/List';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotificationMessageProvider from './layout/Provider/NotificationMessageProvider';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./layout/Firebase";
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './layout/env';
import CryptoJS from 'crypto-js';
function App() {
  const AuthorizationCheck = async (stringToken) => {
    let token = stringToken.split(' ')[1];
    console.log("token test app", token);
    // Get data by token 
    let data = CryptoJS.AES.decrypt(token, ACCESS_TOKEN_SECRET);
    data = data.toString(CryptoJS.enc.Utf8);
    let dataJSON = JSON.parse(data);
    //Get document query parameters
    const q = query(collection(db, "users"), where("studentId", "==", dataJSON.studentId), where("email", "==", dataJSON.email), where("firstName", "==", dataJSON.firstName), where("lastName", "==", dataJSON.lastName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
      if (doc.data()) {

      }
    });
  }
  return (
    <BrowserRouter>
      {/* <NotificationMessageProvider> */}
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        {(() => {
          if (localStorage.getItem('Authorization') && AuthorizationCheck(localStorage.getItem('Authorization'))) {
            return (
              <>
                <Route path="/" exact element={<Home accesstoken={true} />} />
                <Route path="/dashboard" element={<Dashboard accesstoken={true} />} />
                <Route path="/user-list" element={<List accesstoken={true} />} />
                <Route path="*" element={<Navigate to="/"/>} />
              </>
            );
          } else {
            return (
              <>
                <Route path="/" exact element={<Home accesstoken={false} />} />
                <Route path="/dashboard" element={<Dashboard accesstoken={false} />} />
                <Route path="*" element={<Navigate to="/"/>} />
              </>
            );
          }
        })()}
      </Routes>
      {/* </NotificationMessageProvider> */}
    </BrowserRouter>
  );
}

export default App;
