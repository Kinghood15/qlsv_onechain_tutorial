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
import { AiOutlineArrowLeft } from "react-icons/ai";
import Modal from '../components/Modal';
export default function NewUser({ isMobile }) {
    const navigate = useNavigate();
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
        'password': '',
        'scienceBranch': '',
        'gender': '',
    })
    const [idUpdate, setIdUpdate] = useState();
    const newHandler = async () => {
        const data = await UserDataService.addStudentId();
        const segments = data._key;
        setIdUpdate(segments.path.segments[1]);
        // return <NewUser studentId={segments.path.segments[1]} />
        // navigate('/sinh-vien/them-sinh-vien')
    }

    const [isInputForm, setIsInputForm] = useState({
        'studentId': '',
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'password': '',
        'scienceBranch': '',
        'gender': 'Nam',
        'avatar': AVATAR_USER
    });
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBranch = async () => {
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
    // const [isOpenModalView, setIsOpenModalView] = useState(false);
    const onSubmit = async (value) => {
        try {
            setIsInputForm({ ...isInputForm, ["password"]: isInputForm.studentId });
            console.log("isInputForm.studentId in event on Submit by New User", isInputForm);
            if (isInputForm.studentId && isInputForm.firstName && isInputForm.lastName && isInputForm.email && isInputForm.nameClass && isInputForm.address && isInputForm.scienceBranch && isInputForm.gender && isInputForm.birthday && isInputForm.avatar) {
                const checkStudentIds = await UserDataService.checkUserByStudentId(isInputForm.studentId);
                var countCheckStudentId = 0;
                checkStudentIds.forEach((studentId) => {
                    if (studentId.data()) {
                        countCheckStudentId += 1;
                    }
                })
                if (countCheckStudentId > 0) {
                    setValidateInput({ ...validateInput, ['studentId']: 'Mã sinh viên này đã được sử dụng. Yêu cầu bạn nhập số khác!' })
                    setColorInput({ ...colorInput, 'studentId': 'border-red-300' });
                } else if (countCheckStudentId === 0) {
                    const checkStudentIds = await UserDataService.checkUserByEmail(isInputForm.email);
                    countCheckStudentId = 0;
                    checkStudentIds.forEach((studentId) => {
                        if (studentId.data()) {
                            countCheckStudentId += 1;
                        }
                    })
                    if (countCheckStudentId > 0) {
                        setValidateInput({ ...validateInput, ['email']: 'Email này đã được sử dụng. Yêu cầu bạn nhập email khác!' })
                        setColorInput({ ...colorInput, 'email': 'border-red-300' });
                    } else {
                        setValidateInput({ ...validateInput, ['email']: '' })
                        setColorInput({ ...colorInput, 'email': 'border-green-300' });
                        try {
                            if (await UserDataService.addUser({ ...isInputForm })) {
                                alert("Thêm sinh viên thành công !");
                            } else alert("Thêm sinh viên không thành công !");
                            // onReset(true);
                        } catch (error) {
                            return alert("Thêm người dùng thất bại!")
                        }
                    }

                }
            }
            // UserDataService.addUser({...value});

        } catch (error) {
            console.log("onClick submit in add new user ", error);
        }
    };
    const SaveAndGoBack = () => {
        // onSubmit();
        // navigate(-1);
    }
    const SaveAndModal = () => {
        // onSubmit();
        // return {isOpenModalView && <Modal modal={"view"} data={isModalData} closeModal={setIsOpenModalView} />}

    }
    const onReset = (value) => {
        setIsInputForm({ ...value });
    }

    function handleChange(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setIsInputForm({ ...isInputForm, [name]: value });
        // if (name === "studentId") {
        // setIsInputForm({ ...isInputForm, ["studentId"]: value });
        // 
        if (name === "studentId") {
            handleChangeStudentId();
        } else if (name === 'firstName') {
            handleChangeFirstName();
        } else if (name === 'lastName') {
            handleChangeLastName();
        } else if (name === 'email') {
            console.log("onChange name Email")
            handleChangeEmail();
        } else if (name === 'address') {
            handleChangeAddresses();
        } else if (name === 'birthday') {
            handleChangeAge();
        }else{
            handleChangeAge();
        }
        console.log("validateInput in onChange", validateInput);
    }
    function handleChangeStudentId() {
        if (isInputForm.studentId) {
            console.log("isInputForm.studentId.length", isInputForm.studentId.length);
            if (isInputForm.studentId.length > 0 && isInputForm.studentId.length < 12 && parseInt(isInputForm.studentId)) {
                setValidateInput({ ...validateInput, ['studentId']: '' });
                setColorInput({ ...colorInput, ['studentId']: 'border-green-300' });
            } else if (isInputForm.studentId.length > 12) {
                setValidateInput({ ...validateInput, ['studentId']: 'Bạn phải nhập đủ 11 ký tự' });
                console.log("validateInput in isInputForm.studentId", validateInput);
                setColorInput({ ...colorInput, ['studentId']: 'border-red-300' });
                console.log("isInputForm.studentId.length > ", isInputForm.studentId.length);
            } else if (!parseInt(isInputForm.studentId)) {
                setValidateInput({ ...validateInput, ['studentId']: 'Bạn phải nhập mã sinh viên là số nguyên!' });
                setColorInput({ ...colorInput, ['studentId']: 'border-red-300' });
            }
        } else {
            setValidateInput({ ...validateInput, ['studentId']: 'Bạn phải nhập mã sinh viên !' });
            setColorInput({ ...colorInput, ['studentId']: 'border-red-300' });
        }
    }
    function handleChangeFirstName() {
        if (isInputForm.firstName) {
            if (isInputForm.firstName.length < 1) {
                setValidateInput({ ...validateInput, ['firstName']: 'Bạn phải nhiều hơn 1 ký tự' });
                setColorInput({ ...colorInput, ['firstName']: 'border-red-300' });
            } else if (isInputForm.firstName.length > 1) {
                setValidateInput({ ...validateInput, ['firstName']: '' });
                setColorInput({ ...colorInput, ['firstName']: 'border-green-300' });
            }
        } else {
            setValidateInput({ ...validateInput, ['firstName']: 'Bạn phải nhập họ sinh viên!' });
            setColorInput({ ...colorInput, ['firstName']: 'border-red-300' });
        }
    }
    function handleChangeLastName() {
        if (isInputForm.lastName) {
            if (isInputForm.lastName.length < 1) {
                setValidateInput({ ...validateInput, ['lastName']: 'Bạn phải nhiều hơn 1 ký tự' })
                setColorInput({ ...colorInput, ['lastName']: 'border-red-300' });
            } else if (isInputForm.lastName.length > 1) {
                setValidateInput({ ...validateInput, ['lastName']: '' });
                setColorInput({ ...colorInput, ['lastName']: 'border-green-300' });
            }
        } else {
            setValidateInput({ ...validateInput, ['lastName']: 'Bạn phải nhập tên sinh viên !' });
            setColorInput({ ...colorInput, ['lastName']: 'border-red-300' });
        }
    }
    function handleChangeAddresses() {
        if (isInputForm.address) {
            if (isInputForm.address.length < 1) {
                setValidateInput({ ...validateInput, ['address']: 'Bạn phải nhiều hơn 1 ký tự' })
                setColorInput({ ...colorInput, ['address']: 'border-red-300' })
            } else if (isInputForm.address.length > 1) {
                setValidateInput({ ...validateInput, ['address']: '' });
                setColorInput({ ...colorInput, ['address']: 'border-green-300' });
            }
        } else {
            setValidateInput({ ...validateInput, ['address']: 'Bạn phải nhập địa chỉ sinh viên !' });
            setColorInput({ ...colorInput, ['address']: 'border-red-300' });
        }
    }
    function handleChangeEmail() {
        if (isInputForm.email) {
            if (isInputForm.email.length < 5) {
                setValidateInput({ ...validateInput, ['email']: 'Yêu cầu bạn nhập đúng địa chỉ email!' })
                setColorInput({ ...colorInput, ['email']: 'border-red-300' })
            } 
            else if (isEmail(isInputForm.email) && isInputForm.email.length > 9) {
                setValidateInput({ ...validateInput, ['email']: 'Email của bạn hợp lệ' })
                setColorInput({ ...colorInput, ['email']: 'border-green-300' })
            } else if (!isEmail(isInputForm.email)) {
                setValidateInput({ ...validateInput, ['email']: 'Email của bạn không hợp lệ' })
                setColorInput({ ...colorInput, ['email']: 'border-red-300' })
            }
        }else{
            setValidateInput({ ...validateInput, ['email']: 'Bạn phải nhập địa chỉ email sinh viên !' });
            setColorInput({ ...colorInput, ['email']: 'border-red-300' });
        }
    }
    function handleChangeAge() {
        if (isInputForm.birthday) {
            if (isInputForm.birthday.length > 0) {
                const date = new Date();
                console.log("date: " + date);
                const birthdayCheck = new Date(isInputForm.birthday);
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
    // useEffect(() => {

    // },[isInputForm,colorInput,validateInput]);
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
        window.addEventListener("onload", getClass());
        window.addEventListener("onload", getScienceBranch());

    }, []);
    useEffect(() => {
        if (isClass && isClass.length > 0) {
            isClass.map((item, i) => {
                if (i === 0) {
                    setIsInputForm({ ...isInputForm, ['nameClass']: item.nameClass });

                }
            })
        }
    }, [isClass]);
    useEffect(() => {
        if (isScienceBranch && isScienceBranch.length > 0) {
            isScienceBranch.map((item, index) => {
                if (index === 0) {
                    setIsInputForm({ ...isInputForm, ['scienceBranch']: item.nameScienceBranch });
                }
            })
        }
    }, [isScienceBranch]);
    return (
        <>
            <main>
                <div className={`bg-white flex-1 rounded-xl ${isTable ? (isMobile ? "w-[calc(100vw-32px-32px)] " : "w-[calc(100vw-80px-32px-32px)] ") : "w-[calc(100vw-240px-32px-32px)] "}`} >
                    <div className="headerForm p-5 flex justify-between">
                        <div className={`headerForm-left ${isMobile ? 'flex' : ''}`}>
                            <button className="px-3" onClick={() => navigate(-1)}>
                                <AiOutlineArrowLeft size={`${isMobile480 ? 20 : 24}`} />
                            </button>
                            <h1 className={`${isMobile860 ? (isMobile480 ? 'text-black text-lg font-bold' : 'text-black text-lg font-bold') : 'text-black font-bold'}`}>Thêm sinh viên</h1>
                        </div>
                        <div className="headerForm-right">

                        </div>
                    </div>
                    <div className="containerForm block p-6 rounded-lg bg-white w-xl m-w-xl">
                        <form onReset={handleReset(onReset)} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="studentId">Mã sinh viên</label>
                                <input name="studentId" required type="text" className={`${colorInput.studentId} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="studentId" placeholder="Mã sinh viên" />
                                <span className={`${colorInput.studentId}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.studentId}</span>
                            </div>
                            <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="firstName">Họ sinh viên</label>
                                    <input placeholder="Họ sinh viên" required type="text" className={`${colorInput.firstName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="firstName" name="firstName" />
                                    <span className={`${colorInput.firstName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.firstName}</span>
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="lastName">Tên sinh viên</label>
                                    <input placeholder="Tên sinh viên" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" name="lastName" />
                                    <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
                                </div>
                            </div>
                            <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="email">Email</label>
                                    <input placeholder="Email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" name="email" />
                                    <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="address">Địa chỉ</label>
                                    <input placeholder="Địa chỉ" required type="text" className={`${colorInput.address} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="address" name="address" />
                                    <span className={`${colorInput.address}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.address}</span>
                                </div>
                            </div>
                            <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="birthday">Ngày sinh sinh viên</label>
                                    <input required type="date" onClick={handleChangeAge} onKeypress={handleChangeAge} onKeyDown={handleChangeAge} className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" name="birthday" />
                                    <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
                                    <select name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
                                        <option name="gender" value="Nam" selected>Nam</option>
                                        <option name="gender" value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
                                    <select name="scienceBranch" id="scienceBranch" className={`${colorInput.scienceBranch} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
                                        {isScienceBranch.map((item, i) => {
                                            if (i === 0) {
                                                // setIsInputForm({ ...isInputForm, ['scienceBranch']: item.nameScienceBranch });
                                                return (
                                                    <>
                                                        <option name="scienceBranch" key={item.id} value={item.nameScienceBranch} selected>{item.nameScienceBranch}</option>
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
                                            if (i === 0) {

                                                return (
                                                    <>
                                                        <option name="nameClass" key={item.id} value={item.nameClass} selected>{item.nameClass}</option>
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
                            </div>
                            <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
                                <button type="reset" className="my-2 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Xóa hết</button>
                                {/* <button type="button" onClick={""} className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và quay trở lại!</button> */}
                                <button type="submit" className="my-2 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và xem trước thông tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}