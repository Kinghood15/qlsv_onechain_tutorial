import './css/login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import { confirmPasswordReset, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useValidator } from "@validator.tool/hook";
const Login = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const LoginStudent = () => {
        try {
            alert("Button clicked");
        } catch (error) {

        }
    }
    const [isColorInput, setIsColorInput] = useState({
        'studentId': '',
        'password': ''
    });
    const [isInputForm, setIsInputForm] = useState({
        'studentId': '',
        'password': ''
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
            console.log("isInputForm.studentId.length === 0 || isInputForm.password.length === 0")
            setIsButtonDisabled(true);
            if (isInputForm.studentId.length === 0) {
                const Error = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "studentId": Error });
                setIsButtonDisabled(true);
                console.log("error", isErrorMessage);
                console.log("isInputForm.studentId.length = " + isInputForm.studentId.length);
            }
            if (isInputForm.password.length === 0) {
                console.log("isInputForm.password.length = 0")
                const Error = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "password": Error });
                setIsButtonDisabled(true);
            }
            else if (isInputForm.studentId.length === 0 && isInputForm.password.length === 0) {
                console.log("isInputForm.studentId.length === 0 && isInputForm.password.length === 0")
                setIsButtonDisabled(true);
                const ErrorPassword = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "password": ErrorPassword });
                const ErrorStudentId = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "studentId": ErrorStudentId });
            }
        } else if (isInputForm.studentId.length > 0 || isInputForm.password.length > 0) {
            console.log("isInputForm.studentId.length > 0 || isInputForm.password.length > 0");
            setIsButtonDisabled(true);
            const valueError = "";
            if (isInputForm.studentId.length > 0) {
                setIsButtonDisabled(true);
                setIsErrorMessage({ ...isErrorMessage, "studentId": valueError });
                console.log("isInputForm.studentId.length >0")
            } else if (isInputForm.password.length > 0) {
                setIsButtonDisabled(true);
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
            }
            if (isInputForm.studentId.length > 0 && isInputForm.password.length > 0) {
                console.log("isInputForm.studentId.length > 0 && isInputForm.password.length > 0")
                const valueError = "";
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
                setIsErrorMessage({ ...isErrorMessage, "studentId": valueError });
                setIsButtonDisabled(false);
    
            }
        }
        // console.log("IsInputForm",isInputForm);
        // console.log("IsErrorMessage", isErrorMessage);
    }
    const onReset = (value) => {
        setIsInputForm({ ...value });
    }
    const onSubmit = () => {
        try {

        } catch (error) {
            console.log("error", error);
        }
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
                            <input defaultValue={isInputForm.studentId} name="studentId" placeholder="Tên đăng nhập" className="studentid w-full rounded-lg py-2 my-3" type="text" required />
                            <span className="text-red">
                                {isErrorMessage.studentId}
                            </span>
                            <input defaultValue={isInputForm.password} name="password" placeholder="Mật khẩu" className="w-full rounded-lg py-2 my-3" type="password" required />
                            <span className="text-red">
                                {isErrorMessage.password}
                            </span>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <button disabled={isButtonDisabled} type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;