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
  const [userStudent, setUserStudent] = useState({});
  // console.log("user in AuthContextProvider", user);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInStudent = async (studentId, password) => {
    try {
      try {
        const userCheck = await UserDataService.signinStudent(studentId, password);
        if (userCheck) {
          userCheck.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            setUserStudent({...doc.data()});
          });
        } else {
          setUserStudent({});
        }
        if (Object.getOwnPropertyNames(userStudent).length !== 0) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log("Check login firebase error: " + err);
      }
    } catch (error) {
      console.log("Error login user", error);
    }
  }
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logoutStudent = () => {
    setUserStudent({});
    localStorage.removeItem('Authorization');
  }
  const logout = () => {
    localStorage.removeItem('Authorization');
    return signOut(auth)
  }
  // useEffect((studentId, password) => {
  //   signInStudent(studentId, password);
  // },[userStudent])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        // console.log("currentUser", currentUser);
        console.log("user in AuthContextProvider", user);
        console.log("userStudent in AuthContextProvider", userStudent);
        setUser(currentUser);
        localStorage.setItem('Authorization', JSON.stringify(currentUser));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userStudent, user]);

  return (
    <UserContext.Provider value={{ createUser, signInStudent, userStudent, logoutStudent, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
