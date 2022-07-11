import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../Firebase';
import UserDataService from '../services/Users.services';
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userStudent, setUserStudent] = useState([]);
  const [userStudentID, setUserStudentID] = useState([]);
  // console.log("user in AuthContextProvider", user);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInStudent = async(studentId, password) =>  {
    try {
      const userCheck =  await UserDataService.signinStudent(studentId, password);
      setUserStudentID(userCheck.docs.map((doc) => ({id: doc.id })));
      userStudent.map((item) => {
        console.log("item in AuthContextProvider",item.id);
      })
      console.log("UserStudent.id: ",userStudent.id);
      if(userCheck){
        userCheck.forEach((user) => {
          if(user.data() !== '{}'){  
            console.log("user.data() in AuthContextProvider: " + user.data());
            setUserStudent(user.data());
            localStorage.setItem('Authorization',JSON.stringify(user.data()));
          }
        })
        console.log("userStudent in AuthContextProvider:",userStudent);
      }else setUserStudent([]);
      
    } catch (error) {
      console.log("Error login user", error);
    }
  }
  const signIn = (email, password) =>  {
   return signInWithEmailAndPassword(auth, email, password)
  }

  const logoutStudent = () => {
    setUserStudent(null);
    localStorage.removeItem('Authorization');
  }
  const logout = () => {
    localStorage.removeItem('Authorization');
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser !== null){
        console.log("currentUser",currentUser);
        console.log("user in AuthContextProvider",user);
        console.log("userStudent in AuthContextProvider",userStudent);
        setUser(currentUser);
        localStorage.setItem('Authorization', JSON.stringify(currentUser));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser,signInStudent,userStudent,logoutStudent, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
