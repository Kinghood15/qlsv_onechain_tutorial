// import { createContext, useReducer, useEffect } from 'react';
// import AuthReducer from '../reducer/AuthReducer';
// import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from './Constants';
// import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { db, auth } from "../Firebase";
// // import {setAuthToken} from '../utils/setAuthToken';
// const jwt = require('jsonwebtoken');
// const verify = () =>{
//     const authHeader 
// }
// const INITIAL_STATE = {
//     currentUser: JSON.parse(localStorage.getItem('user')) || null,

// };

// export const AuthContext = createContext();

// // export const AuthContextProvider = ({children}) =>{
// //     const [state,dispatch] = useReducer(AuthReducer,{
// //         authLoading:true,
// //         isAutherticated:false,
// //         user:null,
// //     });
// //     //Loading user
// //     const loadingUser = async() =>{
// //         if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
// //             setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
// //         }
// //         try{
// //             const q = query(collection(db, "users"));

// //             const querySnapshot = await getDocs(q);
// //             querySnapshot.forEach((doc) => {

// //             });
// //             if(querySnapshot){
// //                 dispatch:({
// //                     type:SET_AUTH,
// //                     payload:{
// //                         isAutherticated:true,
// //                         user: querySnapshot.data(),
// //                     }
// //                 })
// //             }

// //         }catch(e){
// //             localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
// //             setAuthToken(null);
// //             dispatch:({
// //                 type:SET_AUTH,
// //                 payload:{
// //                     isAutherticated:false,
// //                     user:null
// //                 }
// //             })
// //         }
// //     }
// //     useEffect(() =>{
// //         localStorage.setItem("user",JSON.stringify(state.currentUser))
// //     },[state.currentUser]);
// //     return (
// //         <AuthContext.Provider value={{currentUser:state.currentUser,dispatch}}> 
// //             {children}
// //         </AuthContext.Provider>
// //     )
// // }

// const registerUser = async userForm => {
//     try {
//         const q = query(collection(db, "users"), where("email", "==", userForm.email), where("studentId", "==" , userForm.studentId), where("password","==",userForm.password));
//         const querySnapshot = await getDocs(q);
//         const countData = 0;
//         let getUser;
//         querySnapshot.forEach((doc) => {
//             if(doc.data()){
//                 countData++;
//                 getUser = doc.data();
//             }
//         });
//         if(countData > 1){
//             return { success:false, message:"Query register user error"}
//         }else{
//             return localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,)
//         }
        
//     } catch (e) {

//     }
// }