import { useState, useEffect, useRef } from 'react';
import { isEmpty } from "validator";
import ClassDataService from '../services/Class.services';
import ScienceBratchServices from '../services/ScienceBratch.services';
import UserDataService from '../services/Users.services';
import Validator from 'validator.tool';
import { useValidator } from "@validator.tool/hook";
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from '../env';
import { useNavigate } from 'react-router-dom';
// import { isEmpty } from "validator";
import isEmail from 'validator/es/lib/isEmail';
const EditUserPage3 = ({ nextStep, prevStep, handleChange, isInputFormEditUser }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState({
        'studentId': '',
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'scienceBranch': '',
        'gender': '',
    })
    const [colorInput, setColorInput] = useState({
        'studentId': 'border-gray-300',
        'firstName': 'border-gray-300',
        'lastName': 'border-gray-300',
        'nameClass': 'border-gray-300',
        'address': 'border-gray-300',
        'email': 'border-gray-300',
        'birthday': 'border-gray-300',
        'scienceBranch': 'border-gray-300',
        'gender': 'border-gray-300',
    })
    const [validateInput, setValidateInput] = useState({
        'studentId': '',
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'scienceBranch': '',
        'gender': '',
    })
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try {
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (e) {
            console.log("Message" + e.message);
        }
    }
    const [isClass, setIsClass] = useState([]);
    const getClass = async () => {
        const data = await ClassDataService.getAllClass();
        setIsClass(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    }
    const [isInputForm, setIsInputForm] = useState({
        // 'studentId':isInputFormEditUser.studentId,
        // 'firstName': isInputFormEditUser.firstName,
        // 'lastName': isInputFormEditUser.lastName,
        // 'nameClass': isInputFormEditUser.nameClass,
        // 'address': isInputFormEditUser.address,
        // 'email': isInputFormEditUser.email,
        // 'birthday': isInputFormEditUser.birthday,
        // 'password':isInputFormEditUser.password,
        // 'scienceBranch': isInputFormEditUser.scienceBranch,
        // 'gender': isInputFormEditUser.gender,
        // 'avatar': isInputFormEditUser.avatar
    });
    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputForm
    });
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="m-auto w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full h-full">
                    <div className="cardHeader p-3">
                        <h1 className="font-bold text-black text-2xl">Cập nhật sinh viên</h1>
                    </div>
                    <div className="cardBody p-0 m-0">
                        <form onReset={handleReset("onReset")} onSubmit={handleSubmit(nextStep)} onChange={handleChange} onBlur={handleChange}>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
                                <select name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
                                    {(() => {
                                        if (isInputForm.gender === 'Nam') {
                                            return (
                                                <option name="gender" defaultValue="Nam">Nam</option>
                                            );
                                        } else {
                                            return (
                                                <option name="gender" defaultValue="Nữ">Nữ</option>
                                            );
                                        }
                                    })()}
                                </select>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
                                <select name="scienceBranch" id="scienceBranch" className={`${colorInput.scienceBranch} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
                                    {isScienceBranch.map((item, i) => {
                                        if (isInputForm.scienceBranch === item.nameScienceBranch) {
                                            return (
                                                <>
                                                    <option name="scienceBranch" key={item.id} defaultValue={item.nameScienceBranch}>{item.nameScienceBranch}</option>
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
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="class">Lớp:</label>
                                <select name="nameClass" id="nameClass" className={`${colorInput.nameClass} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Lop hoc">
                                    {isClass.map((item, i) => {
                                        if (isInputForm.nameClass === item.nameClass) {
                                            return (
                                                <>
                                                    <option name="nameClass" key={item.id} defaultValue={item.nameClass}>{item.nameClass}</option>
                                                </>
                                            );
                                        } else {
                                            return (
                                                <>
                                                    <option name="nameClass" key={item.id} value={item.nameClass}>{item.nameClass}</option>
                                                </>
                                            );
                                        }
                                    })}
                                </select>
                            </div>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={prevStep} className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Trước</button>
                                <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Tiếp theo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default EditUserPage3;