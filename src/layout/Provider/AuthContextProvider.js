// import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducer/AuthReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from '../context/Constants';
import axios from 'axios';
import setAuthToken  from '../utils/setAuthToken';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../Firebase";
import React,{useState,useEffect} from "react";
export const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);

    },[]);
    return(
     <AuthContext.Provider value={{currentUser}}>
        {children}
     </AuthContext.Provider>
    );
}


// import {createContext, useReducer, useEffect} from 'react';
// import {authReducer} from '../reducers/AuthReducer';
// import {apiUrl, LOCAL_STORAGE_TOKEN_NAME,SET_AUTH} from './Constants';
// import axios from 'axios';
// import setAuthToken from '../Utils/setAuthToken';

// export const AuthContext = createContext(); 

// const AuthContextProvider = ({children}) =>{
    
    // const [authState, dispatch] = useReducer(authReducer,{
    //     authLoading: true, 
    //     isAutherticated:false, 
    //     userAdmin: null
    // });
    // //Loading user admin
    // const loadingUserAdmin = async() =>{
    //     if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
    //         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    //     }
    //     try {
    //         const response = await axios.get(`${apiUrl}/admin-acodern`)
    //         if(response.data.success){
    //             dispatch({ 
    //                 type:SET_AUTH,
    //                 payload:{ isAutherticated:true,
    //                 userAdmin:response.data.userAdmin} 
    //             })
    //         }
    //     } catch (error) {
    //         localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    //         setAuthToken(null);
    //         dispatch({ 
    //             type:SET_AUTH,
    //             payload:{isAutherticated:false, userAdmin:null}
    //         })
    //     }
    // }
    // useEffect(() => loadingUserAdmin(),[])
    // //LoginAdmin
    // const loginAdmin = async userAdminForm => {
    //     try {
    //         const response = await axios.post(`${apiUrl}/admin-acodern/login`,userAdminForm);
    //         if(response.data.success) {
    //             localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    //         }
    //         await loadingUserAdmin();            
    //         return response.data;
    //     } catch (error) {
    //         if(error.response.data) return error.response.data;
    //         else return {success:false, message: error.message};
            
    //     }
    // }
    // //RegisterAdmin
    // const registerAdmin = async userAdminForm => {
    //     try {
    //         const response = await axios.post(`${apiUrl}/admin-acodern/register`,userAdminForm);
    //         if(response.data.success) {
    //             localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    //         }
    //         await loadingUserAdmin();            
    //         return response.data;
    //     } catch (error) {
    //         if(error.response.data) return error.response.data;
    //         else return {success:false, message: error.message};
            
    //     }
    // }
    // //Logout
    // const logoutAdmin = () =>{
    //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    //     dispatch({ 
    //         type:SET_AUTH,
    //         payload:{isAutherticated:false, userAdmin:null}
    //     })
    // }
    // //Context data
    // const authContextData = {loginAdmin:loginAdmin, registerAdmin:registerAdmin, logoutAdmin , authState};

    // //Return provider information
    // return (
    //     <AuthContext.Provider value={authContextData}>
    //         {children}
    //     </AuthContext.Provider>
    // );
// }
// export default AuthContextProvider;
