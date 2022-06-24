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
    console.log("stringToken in function AuthorizationCheck with App.js",stringToken)
    let token = stringToken.trim().split(' ')[1];
    console.log("Token in function AuthorizationCheck with App.js",token)
    // Get data by token 
    let data = CryptoJS.AES.decrypt(token, ACCESS_TOKEN_SECRET);
    data = data.toString(CryptoJS.enc.Utf8);
    console.log("data in function with App.js ",data)
    let dataJSON = JSON.parse(data);
    console.log("dataJSON", dataJSON);
    //Get document query parameters
    const q = query(collection(db, "users"), where("studentId", "==", Object(dataJSON).studentId), where("email", "==", Object(dataJSON).email), where("firstName", "==", Object(dataJSON).firstName), where("lastName", "==", Object(dataJSON).lastName));

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
        {(() => {
          if (localStorage.getItem('Authorization') && AuthorizationCheck(localStorage.getItem('Authorization'))) {
            return (
              <>
                <Route path="/" exact element={<Home accesstoken={true} />} />
                <Route path="/dashboard" element={<Dashboard accesstoken={true} />} />
                <Route path="/user-list" element={<List accesstoken={true} />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Navigate to="/" />} />
              </>
            );
          } else {
            return (
              <>
                <Route path="/" exact element={<Home accesstoken={false} />} />
                <Route path="/dashboard" element={<Dashboard accesstoken={false} />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
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
