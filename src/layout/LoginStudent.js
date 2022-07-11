import './css/login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import { useValidator } from "@validator.tool/hook";
import { UserStudentAuth } from './Provider/AuthUserContextProvider';
import UserDataService from '../layout/services/Users.services';
const Login = () => {
    const {signIn,userStudent } = UserStudentAuth();
    const navigate = useNavigate();
    const LoginStudent = async() => {

        try {
            // if(await UserDataService.signinStudent(isInputForm.studentId, isInputForm.password)){
            await signIn(isInputForm.studentId,isInputForm.password);
            if(userStudent){
                alert("Đăng nhập thành công !");
                if(userStudent.password === userStudent.studentId){
                    // await signIn(isInputForm.studentId,isInputForm.password)
                    navigate('/cap-nhat-thong-tin-sinh-vien');
                }else{
                    navigate('/');
                }
            }else{
                alert("Đăng nhập tài khoản sai!")
            }
        } catch (error) {
            console.log("Error login student: " + error.message);
        }
    }
    const [isColorInput, setIsColorInput] = useState({
        'studentId': '',
        'password': ''
    });
    const [isInputForm, setIsInputForm] = useState({
        'studentId': '',
        'password': '',
    });
    const [isErrorMessage, setIsErrorMessage] = useState({
        "studentId": "",
        "password": ""
    });
    function handleChange(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value.trim();
        const name = target.name;
        console.log("isInputForm", isInputForm);
        setIsInputForm({ ...isInputForm, [name]: value });
        // console.log("isInputForm", isInputForm);
        if (isInputForm.studentId.length === 0 || isInputForm.password.length === 0) {
            console.log("isInputForm.studentId.length === 0 || isInputForm.password.length === 0")
            
            if (isInputForm.studentId.length === 0) {
                const Error = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "studentId": Error });
                
                console.log("error", isErrorMessage);
                console.log("isInputForm.studentId.length = " + isInputForm.studentId.length);
            }
            if (isInputForm.password.length === 0) {
                console.log("isInputForm.password.length = 0")
                const Error = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "password": Error });
                
            }
            else if (isInputForm.studentId.length === 0 && isInputForm.password.length === 0) {
                console.log("isInputForm.studentId.length === 0 && isInputForm.password.length === 0")
                
                const ErrorPassword = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "password": ErrorPassword });
                const ErrorStudentId = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "studentId": ErrorStudentId });
            }
        } else if (isInputForm.studentId.length > 0 || isInputForm.password.length > 0) {
            console.log("isInputForm.studentId.length > 0 || isInputForm.password.length > 0");
            
            const valueError = "";
            if (isInputForm.studentId.length > 0) {
                
                setIsErrorMessage({ ...isErrorMessage, "studentId": valueError });
                console.log("isInputForm.studentId.length >0")
            } else if (isInputForm.password.length > 0) {
                
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
            }
            if (isInputForm.studentId.length > 0 && isInputForm.password.length > 0) {
                console.log("isInputForm.studentId.length > 0 && isInputForm.password.length > 0")
                const valueError = "";
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
                setIsErrorMessage({ ...isErrorMessage, "studentId": valueError });
                
    
            }
        }
        // console.log("IsInputForm",isInputForm);
        // console.log("IsErrorMessage", isErrorMessage);
    }
    const onReset = (value) => {
        setIsInputForm({ ...value });
    }
    const { validator, handleSubmit, handleReset } = useValidator({
        initValues: isInputForm,
    });
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="m-auto w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full h-full">
                <div className="cardHeader p-3">
                        <h1 className="font-bold text-black text-2xl">Đăng nhập sinh viên</h1>
                    </div>
                    <div className="cardBody p-0 m-0">
                        <form onReset={handleReset(onReset)} onSubmit={handleSubmit(LoginStudent)} onChange={handleChange} onBlur={handleChange}>
                            <input defaultValue={isInputForm.studentId} name="studentId" placeholder="Mã sinh viên" className="studentid w-full rounded-lg py-2 my-3" type="text" required />
                            <p className="text-red">
                                {isErrorMessage.studentId}
                            </p>
                            <input defaultValue={isInputForm.password} name="password" placeholder="Mật khẩu" className="w-full rounded-lg py-2 my-3" type="password" required />
                            <p className="text-red">
                                {isErrorMessage.password}
                            </p>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;