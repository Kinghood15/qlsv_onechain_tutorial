import './App.css';
import Login from './layout/LoginStudent';
import SignUp from './layout/SignUpStudent';
import Home from './layout/pages/Home';
import Dashboard from './layout/pages/Dashboard';
import MainPages from './layout/pages/MainPages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotificationMessageProvider from './layout/Provider/NotificationMessageProvider';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./layout/Firebase";
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './layout/env';
import CryptoJS from 'crypto-js';
import { useState } from 'react';
function App() {
  const [isActive, setIsActive] = useState(false);
  var checkToken = 0;
  const querySnapshotFunction = async (query) => {
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
      checkToken++;
      // console.log("doc.data() in querySnapshot function", doc.data())
    });
    // console.log("checkToken in querySnapshot function", checkToken)
  }
  const AuthorizationCheck = (stringToken) => {
    let token = stringToken.trim().split(' ')[1];
    // Get data by token 
    let data = CryptoJS.AES.decrypt(token, ACCESS_TOKEN_SECRET);
    data = data.toString(CryptoJS.enc.Utf8);
    let dataJSON = JSON.parse(data);
    //Get document query parameters
    const q = query(collection(db, "users"), where("studentId", "==", Object(dataJSON).studentId), where("email", "==", Object(dataJSON).email), where("firstName", "==", Object(dataJSON).firstName), where("lastName", "==", Object(dataJSON).lastName));

    if (querySnapshotFunction(q)) {
      // console.log("checkToken", checkToken);
      if (checkToken === 1) {
        return true;
      } else return false;
    }
  }
  return (
    <BrowserRouter>
      {/* <NotificationMessageProvider> */}
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        {(() => {
          // console.log("AuthorizationCheck(localStorage.getItem('Authorization'))", AuthorizationCheck(localStorage.getItem('Authorization')))
          if (localStorage.getItem('Authorization')) {
            return (
              <>
                <Route path="/" exact element={<Home accesstoken={true} />} />
                <Route path="/tong-quan" element={<Dashboard accesstoken={true} />} />
                {/* <Route path="/user-list" element={<List accesstoken={true} />} /> */}
                <Route path="/sinh-vien" element={<MainPages page="List" accesstoken={true} />} />
                <Route path="/sinh-vien/them-sinh-vien" element={<MainPages page="NewUser" accesstoken={true} />} />
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
