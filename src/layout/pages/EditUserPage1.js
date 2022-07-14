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
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
export default function EditUserPage1({ nextStep, prevStep, handleChange, isInputFormName }) {
    // console.log("isInputFormName",isInputFormName);
    const [idUpdate, setIdUpdate] = useState();
    // const newHandler = async () => {
    //     const data = await UserDataService.addStudentId();
    //     const segments = data._key;
    //     console.log("segments.segments", segments.path.segments[1]);
    //     setIdUpdate(segments.path.segments[1]);
    //     // return <EditUser studentId={segments.path.segments[1]} />
    //     // navigate('/sinh-vien/them-sinh-vien')

    // }
    const [colorInput, setColorInput] = useState({
        'firstName': 'border-gray-300',
        'lastName': 'border-gray-300',
    })
    const [validateInput, setValidateInput] = useState({
        'firstName': '',
        'lastName': '',
    })
    const [isInputForm, setIsInputForm] = useState({
        'firstName': '',
        'lastName': '',
    });
    function handleChangeFirstName() {
        if (isInputFormName.firstName) {
            if (isInputFormName.firstName.length < 1) {
                setValidateInput({ ...validateInput, ['firstName']: 'Bạn phải nhiều hơn 1 ký tự' });
                setColorInput({ ...colorInput, ['firstName']: 'border-red-300' });
            } else if (isInputFormName.firstName.length > 1) {
                setValidateInput({ ...validateInput, ['firstName']: '' });
                setColorInput({ ...colorInput, ['firstName']: 'border-green-300' });
            }
        } else {
            setValidateInput({ ...validateInput, ['firstName']: 'Bạn phải nhập họ sinh viên!' });
            setColorInput({ ...colorInput, ['firstName']: 'border-red-300' });
        }
    }

    function handleChangeLastName() {
        if (isInputFormName.lastName) {
            if (isInputFormName.lastName.length < 1) {
                setValidateInput({ ...validateInput, ['lastName']: 'Bạn phải nhiều hơn 1 ký tự' })
                setColorInput({ ...colorInput, ['lastName']: 'border-red-300' });
            } else if (isInputFormName.lastName.length > 1) {
                setValidateInput({ ...validateInput, ['lastName']: '' });
                setColorInput({ ...colorInput, ['lastName']: 'border-green-300' });
            }
        } else {
            setValidateInput({ ...validateInput, ['lastName']: 'Bạn phải nhập tên sinh viên !' });
            setColorInput({ ...colorInput, ['lastName']: 'border-red-300' });
        }
    }
    const onSubmit = async (value) => {
        try {
            if(isInputFormName.firstName.length > 0 && isInputFormName.lastName.length > 0) {
                nextStep();
            }
        } catch (error) {
            console.log("onClick submit in add new user ", error);
        }
    };


    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputForm
    });
    const [isTable, setIsTable] = useState(false)
    const [isMobile1025, setIsMobile1025] = useState(false)
    const [isMobile860, setIsMobile860] = useState(false);
    const [isMobile480, setIsMobile480] = useState(false);
    const [isMobile320, setIsMobile320] = useState(false);

    //choose the screen size 
    const handleResize = () => {
        if (document.body.clientWidth < 1400) {
            setIsTable(true)
            if (document.body.clientWidth < 1025) {
                setIsMobile1025(true)
                if (document.body.clientWidth < 860) {
                    setIsMobile860(true);
                    if (document.body.clientWidth < 480) {
                        setIsMobile480(true);
                        if (document.body.clientWidth < 320) {
                            setIsMobile320(true);
                        } else {
                            setIsMobile320(false);
                        }
                    } else {
                        setIsMobile480(false);
                    }
                } else {
                    setIsMobile860(false);
                }
            } else {
                setIsMobile1025(false)
            }
        } else {
            setIsTable(false)
        }
    }
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize());
        // window.addEventListener("onload", getScienceBranch());
    }, [isTable,isMobile1025,isMobile860,isMobile480,isMobile320]);
    return (
        <div className="flex items-center">
            <div className="w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full">
                    <h1>Đăng ký tài khoản Giáo Viên</h1>
                    <div className="cardBody p-0 m-0 w-full">
                        <form onSubmit = { handleSubmit(onSubmit) } onChange={handleChange} onBlur={handleChange}>
                            <div className="mb-10 w-full">
                                <input name="firstName" value={isInputFormName.firstName} onChange={handleChangeFirstName} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstName"
                                    aria-describedby="emailHelp123" placeholder="Họ" />
                                <span className={`${colorInput.firstName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.firstName}</span>

                            </div>
                            <div className="mb-10 w-full">
                                <input name="lastName" value={isInputFormName.lastName} onChange={handleChangeLastName} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="lastName"
                                    aria-describedby="emailHelp124" placeholder="Tên" />
                                <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
                            </div>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Tiếp</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}