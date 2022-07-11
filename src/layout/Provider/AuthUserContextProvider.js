import { createContext, useContext, useEffect, useState } from 'react';
import UserDataService from '../services/Users.services';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
const UserStudentContext = createContext();

export const AuthUserContextProvider = ({ children }) => {
  const [userStudent, setUserStudent] = useState({});
  console.log("userStudent in AuthUserContextProvider", userStudent);
  const navigate = useNavigate();
  const signIn = async(studentId, password) =>  {
    try {
      const userCheck =  await UserDataService.signinStudent(studentId, password);
      
      userCheck.forEach((user) => {
        if(user.data()){  
          setUserStudent(user.data());
          localStorage.setItem('Authorization',JSON.stringify(user.data()));
        }
      })
    } catch (error) {
      console.log("Error login user", error);
    }
  }

  const logout = () => {
    setUserStudent({});
    localStorage.removeItem('Authorization');
    navigate("/dang-nhap");
    // return signOut(auth)
  }

  useEffect(() => {
      // console.log(currentUser);
      // setUser(currentUser);
    //   localStorage.setItem('Authorization', JSON.stringify(currentUser));
  }, []);

  return (
    <UserStudentContext.Provider value={{ userStudent, logout, signIn }}>
      {children}
    </UserStudentContext.Provider>
  );
};

export const UserStudentAuth = () => {
  return useContext(UserStudentContext);
};
