import './css/login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import { useValidator } from "@validator.tool/hook";
import { UserAuth } from './Provider/AuthContextProvider';
import UserDataService from '../layout/services/Users.services';
const Login = () => {
    const { signInStudent, userStudent } = UserAuth();
    const navigate = useNavigate();
    const LoginStudent = async () => {
        try {
            if (isInputForm.studentId.length > 0 && isInputForm.password.length > 0) {
                await signInStudent(isInputForm.studentId.trim(), isInputForm.password.trim())
                if( signInStudent(isInputForm.studentId.trim(), isInputForm.password.trim())){
                    if (Object.getOwnPropertyNames(userStudent).length !== 0) {
                        alert("Đăng nhập thành công !");
                        if (userStudent.password === userStudent.studentId) {
                            // await signIn(isInputForm.studentId,isInputForm.password)
                            navigate('/doi-mat-khau');
                        } else {
                            navigate('/');
                        }
                    
                    } else {
                        alert("Đăng nhập tài khoản sai!")
                    }
                }

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
        setIsInputForm({ ...isInputForm, [name]: value });
        if (isInputForm.studentId.length === 0 || isInputForm.password.length === 0) {

            if (isInputForm.studentId.length === 0) {
                const Error = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "studentId": Error });
                console.log("error", isErrorMessage);
            }
            if (isInputForm.password.length === 0) {
                const Error = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "password": Error });

            }
            else if (isInputForm.studentId.length === 0 && isInputForm.password.length === 0) {
                const ErrorPassword = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "password": ErrorPassword });
                const ErrorStudentId = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "studentId": ErrorStudentId });
            }
        } else if (isInputForm.studentId.length > 0 || isInputForm.password.length > 0) {
            const valueError = "";
            if (isInputForm.studentId.length > 0) {
                setIsErrorMessage({ ...isErrorMessage, "studentId": valueError });
            } else if (isInputForm.password.length > 0) {
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
            }
            if (isInputForm.studentId.length > 0 && isInputForm.password.length > 0) {
                const valueError = "";
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
                setIsErrorMessage({ ...isErrorMessage, "studentId": valueError });


            }
        }
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