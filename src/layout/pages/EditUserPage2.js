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
                setValidateInput({ ...validateInput, ['password']: 'Mật khẩu phải trên 6 ký tự trở lên ' });
                setColorInput({ ...colorInput, ['password']: 'border-red-300' });
            }
              
        } else {
            setValidateInput({ ...validateInput, ['password']: 'Bạn phải nhập mật khẩu !' });
            setColorInput({ ...colorInput, ['password']: 'border-red-300' });
        }
    }
    function handleChangeConfirmPassword() {
        if (isInputFormPassword.confirmPassword) {
            // console.log("isInputFormPassword.password.length", isInputFormPassword.password.length);
            if (isInputFormPassword.confirmPassword.length > 6) {

                if(isInputFormPassword.password.trim() === isInputFormPassword.confirmPassword.trim() && isInputFormPassword.password.trim().length === isInputFormPassword.confirmPassword.trim().length){
                    setValidateInput({ ...validateInput, ['confirmPassword']: 'Xác nhật mật khẩu trùng với mật khẩu trên !' });
                    setColorInput({ ...colorInput, ['confirmPassword']: 'border-green-300' });
                }else{
                    setValidateInput({ ...validateInput, ['confirmPassword']: 'Xác nhận mật khẩu không trùng với mật khẩu trên!. Yêu cầu kiểm tra lại !' });
                    setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
                }

            } else if(isInputFormPassword.confirmPassword.length <6){
                setValidateInput({ ...validateInput, ['confirmPassword']: 'Xác nhật mật khẩu phải trên 6 ký tự trở lên ' });
                setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
            }
              
        } else {
            setValidateInput({ ...validateInput, ['confirmPassword']: 'Bạn phải nhập xác nhận mật khẩu !' });
            setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
        }
    }
    function handleChangeEmail() {
        if (isInputFormPassword.email) {
            if (isInputFormPassword.email.length < 5) {
                setValidateInput({ ...validateInput, ['email']: 'Yêu cầu bạn nhập đúng địa chỉ email!' })
                setColorInput({ ...colorInput, ['email']: 'border-red-300' })
            } 
            else if (isEmail(isInputFormPassword.email) && isInputFormPassword.email.length > 9) {
                setValidateInput({ ...validateInput, ['email']: 'Email của bạn hợp lệ' })
                setColorInput({ ...colorInput, ['email']: 'border-green-300' })
            } else if (!isEmail(isInputFormPassword.email)) {
                setValidateInput({ ...validateInput, ['email']: 'Email của bạn không hợp lệ' })
                setColorInput({ ...colorInput, ['email']: 'border-red-300' })
            }
        }else{
            setValidateInput({ ...validateInput, ['email']: 'Bạn phải nhập địa chỉ email sinh viên !' });
            setColorInput({ ...colorInput, ['email']: 'border-red-300' });
        }
    }

    return (
        <div className="flex items-center">
            <div className="w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full">
                    <h1>Đăng ký tài khoản Giáo Viên</h1>
                    <div className="cardBody p-0 m-0 w-full">
                        <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} onBlur={handleChange}>

                            <div className="mb-10 w-full">
                                <input name="email" onChange={handleChangeEmail} value={isInputFormPassword.email} type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                    placeholder="Địa chỉ email của giáo viên"
                                />
                                <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                            </div>
                            <div className="mb-10 w-full">
                                <input name="password" onChange={handleChangePassword} value={isInputFormPassword.password} type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                    placeholder="Mật khẩu"
                                />
                                <span className={`${colorInput.password}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.password}</span>
                            </div>
                            <div className="mb-10 w-full">
                                <input name="confirmPassword" onChange={handleChangeConfirmPassword} value={isInputFormPassword.confirmPassword} type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput127"
                                    placeholder="Xác nhận mật khẩu" />
                                <span className={`${colorInput.confirmPassword}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.confirmPassword}</span>
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