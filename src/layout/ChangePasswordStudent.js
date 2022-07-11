import './css/login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import UserDataService from "../layout/services/Users.services";
import { useValidator } from "@validator.tool/hook";
const ChangePasswordStudent = ({prevStep,nextStep,handleChange,isInputFormChangePassword}) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isColorInput, setIsColorInput] = useState({
        'passwordOld': '',
        'passwordNew': '',
        'confirmPasswordNew': ''
    });
    const [isInputForm, setIsInputForm] = useState({
        'passwordOld': isInputFormChangePassword.password,
        'passwordNew': '',
        'confirmPasswordNew': ''
    });
    const [isErrorMessage, setIsErrorMessage] = useState({
        'passwordOld': '',
        'passwordNew': '',
        'confirmPasswordNew': ''
    });
    const getUser = () => {
        try {
            
        } catch (error) {
            console.log("getUser", error);
        }
    }
    console.log("IsInputForm in ChangePasswordStudent",isInputForm);
    function handleChangeForm(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value.trim();
        const name = target.name;
        setIsInputForm({ ...isInputForm, [name]: value });
        if (isInputForm.passwordOld.length === 0 || isInputForm.passwordNew.length === 0 || isInputForm.confirmPasswordNew.length === 0) {
            console.log("isInputForm.passwordOld.length === 0 || isInputForm.passwordNew.length === 0")
            setIsButtonDisabled(true);
            if (isInputForm.passwordOld.length === 0) {
                const Error = 'Vui lòng nhập mật khẩu cũ sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "passwordOld": Error });
                setIsButtonDisabled(true);
                console.log("error", isErrorMessage);
                console.log("isInputForm.passwordOld.length = " + isInputForm.passwordOld.length);
            }
            if (isInputForm.passwordNew.length === 0) {
                console.log("isInputForm.passwordNew.length = 0")
                const Error = "Vui lòng mật khẩu sinh viên mới ở đây";
                setIsErrorMessage({ ...isErrorMessage, "passwordNew": Error });
                setIsButtonDisabled(true);
            }
            else if (isInputForm.passwordOld.length === 0 && isInputForm.passwordNew.length === 0) {
                console.log("isInputForm.passwordOld.length === 0 && isInputForm.passwordNew.length === 0")
                setIsButtonDisabled(true);
                const ErrorPassword = "Vui lòng mật khẩu sinh viên ở đây";
                setIsErrorMessage({ ...isErrorMessage, "passwordNew": ErrorPassword });
                const ErrorStudentId = 'Vui lòng nhập mã sinh viên ở đây';
                setIsErrorMessage({ ...isErrorMessage, "passwordOld": ErrorStudentId });
            }
        } else if (isInputForm.passwordOld.length > 0 || isInputForm.passwordNew.length > 0) {
            console.log("isInputForm.passwordOld.length > 0 || isInputForm.passwordNew.length > 0");
            setIsButtonDisabled(true);
            const valueError = "";
            if (isInputForm.passwordOld.length > 0) {
                setIsButtonDisabled(true);
                setIsErrorMessage({ ...isErrorMessage, "passwordOld": valueError });
                console.log("isInputForm.passwordOld.length >0")
            } else if (isInputForm.passwordNew.length > 0) {
                setIsButtonDisabled(true);
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
            }
            if (isInputForm.passwordOld.length > 0 && isInputForm.passwordNew.length > 0) {
                console.log("isInputForm.passwordOld.length > 0 && isInputForm.passwordNew.length > 0")
                const valueError = "";
                setIsErrorMessage({ ...isErrorMessage, "password": valueError });
                setIsErrorMessage({ ...isErrorMessage, "passwordOld": valueError });
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
            if(isInputForm.passwordNew.trim() === isInputForm.confirmPasswordNew.trim() && isInputForm.passwordOld.trim() === isInputFormChangePassword.password.trim() && isInputFormChangePassword.password.trim() !== isInputForm.passwordNew.trim()){
                isInputFormChangePassword.password = isInputForm.passwordNew;
                nextStep();
            }
            
        } catch (error) {
            console.log("error", error);
        }
    }
    const { validator, handleSubmit, handleReset } = useValidator({
        initValues: isInputForm,
    });
    useEffect(()=>{
        console.log("isInputFormChangePassword",isInputFormChangePassword);
        console.log("isInputForm", isInputForm);
    },[])
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="m-auto w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full h-full">
                    <div className="cardHeader p-3">
                        <h1 className="font-bold text-black text-2xl">Đổi mật khẩu sinh viên</h1>
                    </div>
                    <div className="cardBody p-0 m-0">
                        <form onReset={handleReset(onReset)} onSubmit={handleSubmit(onSubmit)} onChange={handleChangeForm} onBlur={handleChangeForm}>
                            <label className="form-label inline-block my-2 text-gray-700" htmlFor="stude">Mật khẩu cũ:</label>
                            <input value={isInputForm.passwordOld} name="passwordOld" placeholder="Mật khẩu cũ" className="studentid w-full rounded-lg py-2 my-3" type="password" required />
                            <span className="text-red">
                                {isErrorMessage.passwordOld}
                            </span>
                            <label className="form-label inline-block my-2 text-gray-700" htmlFor="gender">Mật khẩu mới:</label>
                            <input value={isInputForm.passwordNew} name="passwordNew" placeholder="Mật khẩu mới" className="w-full rounded-lg py-2 my-3" type="password" required />
                            <span className="text-red">
                                {isErrorMessage.passwordNew}
                            </span>
                            <label className="form-label inline-block my-2 text-gray-700" htmlFor="gender">Xác nhận mật khẩu mới:</label>
                            <input value={isInputForm.confirmPasswordNew} name="confirmPasswordNew" placeholder="Xác nhận mật khẩu mới" className="w-full rounded-lg py-2 my-3" type="password" required />
                            <span className="text-red">
                                {isErrorMessage.confirmPasswordNew}
                            </span>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <button disabled={isButtonDisabled} type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Đổi mật khẩu</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangePasswordStudent;