import { useState, useEffect, useRef } from 'react';
import { isEmpty } from "validator";
import ClassDataService from '../services/Class.services';
import ScienceBratchServices from '../services/ScienceBratch.services';
// import UserDataService from '../services/UsersTeacher.services';
import Validator from 'validator.tool';
import { useValidator } from "@validator.tool/hook";
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from '../env';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from "../Provider/AuthContextProvider";
import UsersTeacherServices from "../services/UsersTeacher.services";
// import { isEmpty } from "validator";
import isEmail from 'validator/es/lib/isEmail';
const EditUserPage3 = ({ nextStep, prevStep, handleChange, isInputFormEditUser }) => {
    const navigate = useNavigate();
    const [colorInput, setColorInput] = useState({
        'password': 'border-gray-300',
        'confirmPassword': 'border-gray-300',
        'email': 'border-gray-300',
    })
    const [validateInput, setValidateInput] = useState({
        'birthday': "",
        'nameScienceBranch': "",
        'gender': "Nam",
    })
    const { createUser } = UserAuth();
    const onSubmit = async(e) => {
        // e.preventDefault();
        console.log("isInputFormEditUser", isInputFormEditUser);
        if (isInputFormEditUser.email && isInputFormEditUser.password && isInputFormEditUser.password.trim() === isInputFormEditUser.confirmPassword.trim() && isInputFormEditUser.firstName && isInputFormEditUser.lastName && isInputFormEditUser.gender && isInputFormEditUser.position && isInputFormEditUser.birthday && isInputFormEditUser.nameScienceBranch) {
            try{
                await createUser(isInputFormEditUser.email, isInputFormEditUser.password);
                try{
                    if(await UsersTeacherServices.addUserTeacher(isInputFormEditUser)){
                        alert("Đăng ký tài khoản thành công !")
                        navigate("/giao-vien/dang-nhap")
                    }else return alert("Đăng ký tài khoản không thành công !")
                    
                }catch(err){
                    alert("Đăng ký hệ thống lỗi!");
                    console.log("Save data user teacher failed", err);
                }
            }catch(e){
                console.log("Create user teacher authtication failed",e);
            }
        }
    }
    function handleChangeAge() {
        if (isInputFormEditUser.birthday) {
            if (isInputFormEditUser.birthday.length > 0) {
                const date = new Date();
                console.log("date: " + date);
                const birthdayCheck = new Date(isInputFormEditUser.birthday);
                console.log("birthdayCheck", birthdayCheck);
                var age_now = date.getFullYear() - birthdayCheck.getFullYear();
                var m = date.getMonth() - birthdayCheck.getMonth();
                if (m < 0 || (m === 0 && date.getDate() < birthdayCheck.getDate())) {
                    age_now--;
                }
                console.log("age_now", age_now);
                if (age_now < 18) {
                    setValidateInput({ ...validateInput, ['birthday']: 'Tuổi của bạn không hợp lệ bắt buộc phải trên 18 tuổi!' })
                    setColorInput({ ...colorInput, ['birthday']: 'border-red-300' })
                } else {
                    setValidateInput({ ...validateInput, ['birthday']: 'Tuổi của bạn hợp lệ' })
                    setColorInput({ ...colorInput, ['birthday']: 'border-green-300' })
                }
            }
        }
    }
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try {
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (e) {
            console.log("Message" + e.message);
        }
    }
    useEffect(() =>{
        getScienceBratch();
    },[])

    const [isClass, setIsClass] = useState([]);
    const getClass = async () => {
        const data = await ClassDataService.getAllClass();
        setIsClass(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    }
    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputFormEditUser
    });
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="m-auto w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full h-full">
                    <div className="cardHeader p-3">
                        <h1 className="font-bold text-black text-center text-2xl">Đăng ký tài khoản giáo viên</h1>
                    </div>
                    <div className="cardBody p-0 m-0">
                        <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} onBlur={handleChange}>
                            
                                <div className="mb-10 xl">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="birthday">Ngày sinh giáo viên</label>
                                    <input required value={isInputFormEditUser.birthday} type="date" onChange={handleChangeAge} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="birthday" name="birthday" />
                                    <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>
                                </div>
                                <div className="mb-10 xl">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
                                    <select name="gender" id="gender" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="gender">
                                        <option name="gender" selected value="Nam">Nam</option>
                                        <option name="gender" value="Nữ">Nữ</option>
                                    </select>

                                </div>
                                <div className="mb-10 xl">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
                                    <select name="nameScienceBranch" id="scienceBranch" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Khoa nganh">
                                        {isScienceBranch.map((item, i) => {
                                            if (i === 0) {
                                                return (
                                                    <>
                                                        <option name="nameScienceBranch" key={item.id} selected value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                                    </>
                                                );
                                            } else {
                                                return (
                                                    <>
                                                        <option name="scienceBranch" key={item.id} value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                                    </>
                                                );
                                            }
                                        })}
                                    </select>
                                </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={prevStep} className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Trước</button>
                                <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default EditUserPage3;