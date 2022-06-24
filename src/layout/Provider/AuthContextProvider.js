import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducer/AuthReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from '../context/Constants';
import axios from 'axios';
import setAuthToken  from '../utils/setAuthToken';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase";
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState,dispatch] = useReducer(authReducer,{
        authLoading:true,
        isAutherticated: false,
        user:null,

    })
    //Loading user state
    const loadingUser = async() => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);

        }
        try{
            //Get document query parameters
            const q = query(collection(db, "users"),);

            const querySnapshot = await getDocs(q);
            let checkQuery;
            // console.log("querySnapshot",querySnapshot);
            querySnapshot.forEach((doc) => {
                // if (doc.data().email === email) {
                    // countEmail += 1;
                checkQuery += doc.data();
                console.log("Check Query: ",checkQuery);
            });
        }catch(e){
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload:{isAutherticated:false,user:null}
            })
        }
    }
    //Login user
    const login = () => {
        try{
            const response = 
        }
    }
}