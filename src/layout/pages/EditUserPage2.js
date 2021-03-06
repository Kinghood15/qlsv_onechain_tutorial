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
const EditUserPage2 = ({ nextStep, prevStep, handleChange, isInputFormPassword }) => {
    const [colorInput, setColorInput] = useState({
        'password': 'border-gray-300',
        'confirmPassword': 'border-gray-300',
        'email': 'border-gray-300',
    })
    const [validateInput, setValidateInput] = useState({
        'password': '',
        'confirmPassword': '',
        'email': '',
    })

    const [isInputForm, setIsInputForm] = useState({
        'password': '',
        'confirmPassword': '',
        'email': '',
    });
    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputFormPassword
    });
    const onSubmit = () => {
        try {
            // if(colorInput.password === 'border-green-300' && colorInput.confirmPassword === 'border-green-300' && colorInput.email === 'border-green-300'){
            if(isInputFormPassword.password.length > 0 && isInputFormPassword.email.length > 0 && isInputFormPassword.confirmPassword.length > 0){
                nextStep();
            }
        } catch (error) {
            
        }
    }
    function handleChangeForm(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setIsInputForm({ ...isInputForm, [name]: value });
        if(name === 'password') {
            handleChangePassword();
        } else if(name === 'confirmPassword') {
            handleChangeConfirmPassword();
        }else if (name === 'email') {
            // console.log("onChange name Email")
            handleChangeEmail();
        }
    }
    function handleChangePassword() {
        if (isInputFormPassword.password) {
            console.log("isInputFormPassword.password.length", isInputFormPassword.password.length);
            if (isInputFormPassword.password.length > 6) {
                setValidateInput({ ...validateInput, ['password']: '' });
                setColorInput({ ...colorInput, ['password']: 'border-green-300' });
            } else if(isInputFormPassword.password.length <6){
                setValidateInput({ ...validateInput, ['password']: 'M???t kh???u ph???i tr??n 6 k?? t??? tr??? l??n ' });
                setColorInput({ ...colorInput, ['password']: 'border-red-300' });
            }
              
        } else {
            setValidateInput({ ...validateInput, ['password']: 'B???n ph???i nh???p m???t kh???u !' });
            setColorInput({ ...colorInput, ['password']: 'border-red-300' });
        }
    }
    function handleChangeConfirmPassword() {
        if (isInputFormPassword.confirmPassword) {
            // console.log("isInputFormPassword.password.length", isInputFormPassword.password.length);
            if (isInputFormPassword.confirmPassword.length > 6) {

                if(isInputFormPassword.password.trim() === isInputFormPassword.confirmPassword.trim() && isInputFormPassword.password.trim().length === isInputFormPassword.confirmPassword.trim().length){
                    setValidateInput({ ...validateInput, ['confirmPassword']: 'X??c nh???t m???t kh???u tr??ng v???i m???t kh???u tr??n !' });
                    setColorInput({ ...colorInput, ['confirmPassword']: 'border-green-300' });
                }else{
                    setValidateInput({ ...validateInput, ['confirmPassword']: 'X??c nh???n m???t kh???u kh??ng tr??ng v???i m???t kh???u tr??n!. Y??u c???u ki???m tra l???i !' });
                    setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
                }

            } else if(isInputFormPassword.confirmPassword.length <6){
                setValidateInput({ ...validateInput, ['confirmPassword']: 'X??c nh???t m???t kh???u ph???i tr??n 6 k?? t??? tr??? l??n ' });
                setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
            }
              
        } else {
            setValidateInput({ ...validateInput, ['confirmPassword']: 'B???n ph???i nh???p x??c nh???n m???t kh???u !' });
            setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
        }
    }
    function handleChangeEmail() {
        if (isInputFormPassword.email) {
            if (isInputFormPassword.email.length < 5) {
                setValidateInput({ ...validateInput, ['email']: 'Y??u c???u b???n nh???p ????ng ?????a ch??? email!' })
                setColorInput({ ...colorInput, ['email']: 'border-red-300' })
            } 
            else if (isEmail(isInputFormPassword.email) && isInputFormPassword.email.length > 9) {
                setValidateInput({ ...validateInput, ['email']: 'Email c???a b???n h???p l???' })
                setColorInput({ ...colorInput, ['email']: 'border-green-300' })
            } else if (!isEmail(isInputFormPassword.email)) {
                setValidateInput({ ...validateInput, ['email']: 'Email c???a b???n kh??ng h???p l???' })
                setColorInput({ ...colorInput, ['email']: 'border-red-300' })
            }
        }else{
            setValidateInput({ ...validateInput, ['email']: 'B???n ph???i nh???p ?????a ch??? email sinh vi??n !' });
            setColorInput({ ...colorInput, ['email']: 'border-red-300' });
        }
    }

    return (
        <div className="flex items-center">
            <div className="w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full">
                    <h1>????ng k?? t??i kho???n Gi??o Vi??n</h1>
                    <div className="cardBody p-0 m-0 w-full">
                        <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} onBlur={handleChange}>

                            <div className="mb-10 w-full">
                                <input name="email" onChange={handleChangeEmail} value={isInputFormPassword.email} type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                    placeholder="?????a ch??? email c???a gi??o vi??n"
                                />
                                <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                            </div>
                            <div className="mb-10 w-full">
                                <input name="password" onChange={handleChangePassword} value={isInputFormPassword.password} type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                    placeholder="M???t kh???u"
                                />
                                <span className={`${colorInput.password}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.password}</span>
                            </div>
                            <div className="mb-10 w-full">
                                <input name="confirmPassword" onChange={handleChangeConfirmPassword} value={isInputFormPassword.confirmPassword} type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput127"
                                    placeholder="X??c nh???n m???t kh???u" />
                                <span className={`${colorInput.confirmPassword}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.confirmPassword}</span>
                            </div>
                            {/* <Link href="/forgot-password">Qu??n m???t kh???u ?</Link> */}
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={prevStep} className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Tr?????c</button>
                                <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Ti???p theo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditUserPage2;