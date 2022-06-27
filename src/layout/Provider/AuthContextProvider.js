import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducer/AuthReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from '../context/Constants';
import axios from 'axios';
import setAuthToken  from '../utils/setAuthToken';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase";
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    
}