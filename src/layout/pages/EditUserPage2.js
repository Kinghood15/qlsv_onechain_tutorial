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
const EditUserPage2 = ({ nextStep, prevStep, handleChange, isInputFormEditUser }) => {
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
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="email">Email</label>
                                <input value={isInputForm.email} placeholder="Email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" name="email" />
                                <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="address">Địa chỉ</label>
                                <input value={isInputForm.address} placeholder="Địa chỉ" required type="text" className={`${colorInput.address} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="address" name="address" />
                                <span className={`${colorInput.address}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.address}</span>
                            </div>                         
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="birthday">Ngày sinh sinh viên</label>
                                <input value={isInputForm.birthday} required type="date" className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" name="birthday" />
                                <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>
                            </div>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={prevStep} className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Trước</button>
                                <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Tiếp theo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditUserPage2;