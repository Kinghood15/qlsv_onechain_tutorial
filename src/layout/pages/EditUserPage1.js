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
export default function EditUserPage1({ nextStep, prevStep, handleChange, isInputFormEditUser }) {
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
    const [idUpdate, setIdUpdate] = useState();
    const newHandler = async () => {
        const data = await UserDataService.addStudentId();
        const segments = data._key;
        console.log("segments.segments", segments.path.segments[1]);
        setIdUpdate(segments.path.segments[1]);
        // return <EditUser studentId={segments.path.segments[1]} />
        // navigate('/sinh-vien/them-sinh-vien')

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
    const [isData, setIsData] = useState({})
    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        setIsData(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    const GetstudentId = () => {
        // console.log(" UserDataService.addStudentId()", UserDataService.addStudentId())
        // setIsStudentId();
        // setIsInputForm({ ...isInputForm, 'studentId': isStudentId });
        // console.log("isStudentId",isStudentId);
    }
    // console.log("isStudentId in EditUser:",isStudentId);
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
    const [isUser, setIsUser] = useState([]);
    const onSubmit = async (value) => {
        try {
            nextStep();
            // setValidateInput({ ...validateInput, 'studentId': '' })
            // setColorInput({ ...colorInput, 'studentId': 'border-green-300' });
            // try {
            //     await UserDataService.updateUser({ ...isInputForm });
            //     alert("User added successfully");
            //     setIsInputForm({ ...value });
            // } catch (error) {
            //     alert("User added failed")
            // }
            // console.log("value in onSubmit", value);
            // UserDataService.addUser({...value});

        } catch (error) {
            console.log("onClick submit in add new user ", error);
        }
    };
    const SaveAndGoBack = () => {
        onSubmit();
        navigate(-1);
    }
    const SaveAndModal = () => {
        onSubmit();

    }
    const onReset = (value) => {
        setIsInputForm({ ...value });
    }
    function handleChangeForm(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setIsInputForm({ ...isInputForm, [name]: value });
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
        } else {
            handleChangeAge();
        }
        // console.log("validateInput in onChange", validateInput);
    }
    function handleChangeStudentId() {
        if (isInputForm.studentId) {
            // console.log("isInputForm.studentId.length", isInputForm.studentId.length);
            if (isInputForm.studentId.length > 0 && isInputForm.studentId.length < 12 && parseInt(isInputForm.studentId)) {
                setValidateInput({ ...validateInput, ['studentId']: '' });
                setColorInput({ ...colorInput, ['studentId']: 'border-green-300' });
            } else if (isInputForm.studentId.length > 12) {
                setValidateInput({ ...validateInput, ['studentId']: 'Bạn phải nhập đủ 11 ký tự' });
                // console.log("validateInput in isInputForm.studentId", validateInput);
                setColorInput({ ...colorInput, ['studentId']: 'border-red-300' });
                // console.log("isInputForm.studentId.length > ", isInputForm.studentId.length);
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
                setColorInput({ ...colorInput, ['lastName']: 'border-green-300' });
            } else if (isInputForm.lastName.length > 1) {
                setValidateInput({ ...validateInput, ['lastName']: '' });
                setColorInput({ ...colorInput, ['lastName']: 'border-red-300' });
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
                setColorInput({ ...colorInput, ['address']: 'border-green-300' })
            } else if (isInputForm.address.length > 1) {
                setValidateInput({ ...validateInput, ['address']: '' });
                setColorInput({ ...colorInput, ['address']: 'border-red-300' });
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
        } else {
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
    // function handleChangeForm(env) {
    //     const target = env.target;

    //     const value = target.type === "checkbox" ? target.checked : target.value;
    //     const name = target.name;
    //     console.log("isInputForm.firstName.length",isInputForm.firstName.length)
    //     setIsInputForm({ ...isInputForm, [name]: value });
    //     if(isInputForm.studentId.length > 0 && isInputForm.studentId.length < 7){
    //         setValidateInput({...validateInput,'studentId':''});
    //         setColorInput({...colorInput,'studentId':'border-green-300'});
    //     }else if(isInputForm.studentId.length >7){
    //         setValidateInput({...validateInput,'studentId':'Bạn phải nhập đủ 6 ký tự'});
    //         setColorInput({...colorInput,'studentId':'border-red-300'});
    //     }
    //     if(isInputForm.firstName.length < 2){
    //        setValidateInput({...validateInput,'firstName':'Bạn phải nhiều hơn 2 ký tự'});
    //        setColorInput({...colorInput,'firstName':'border-green-300'});
    //     }else if(isInputForm.firstName.length >=2){
    //         setValidateInput({...validateInput,'firstName':''});
    //         setColorInput({...colorInput,'firstName':'border-green-300'});
    //     }
    //     if(isInputForm.lastName.length < 2){
    //         setValidateInput({...validateInput,'lastName':'Bạn phải nhiều hơn 2 ký tự'})
    //         setColorInput({...colorInput,'lastName':'border-green-300'});
    //     }else if(isInputForm.lastName.length >1){
    //         setValidateInput({...validateInput,'lastName':''});
    //         setColorInput({...colorInput,'lastName':'border-green-300'});
    //     }
    //     if(isInputForm.address.length<2){
    //         setValidateInput({...validateInput,'address':'Bạn phải nhiều hơn 2 ký tự'})
    //         setColorInput({...colorInput,'address':'border-green-300'})
    //     }else if(isInputForm.address.length>1){
    //         setValidateInput({...validateInput,'address':''});
    //         setColorInput({...colorInput,'address':'border-green-300'});
    //     }
    //     if(isInputForm.email.length < 2){
    //         setValidateInput({...validateInput,'email':'Bạn phải nhiều hơn 2 ký tự'})
    //         setColorInput({...colorInput,'email':'border-green-300'})
    //     }else if(isInputForm.email.length > 1){
    //        setValidateInput({...validateInput,'email':''});
    //        setColorInput({...colorInput,'email':'border-green-300'});
    //     }
    //     if(isEmail(isInputForm.email)){
    //         setValidateInput({...validateInput,'email':'Email của bạn không hợp lệ'})
    //         setColorInput({...colorInput,'email':'border-green-300'})
    //     }else if(!isEmail(isInputForm.email)){
    //         setValidateInput({...validateInput,'email':''})
    //         setColorInput({...colorInput,'email':'border-green-300'})
    //     }
    //     if(isInputForm.birthday){

    //     }
    //     console.log("isInputForm",isInputForm);
    //     console.log("validateInput",validateInput);
    //     console.log("colorInput",colorInput);

    // }
    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputForm
    });
    useEffect(() => {
        getScienceBratch();
        getClass();
        GetstudentId();
    }, []);
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
        // window.addEventListener("onload", getClass());
        // window.addEventListener("onload", getScienceBranch());
    }, []);
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="m-auto w-96 h-auto p-5 flex items-center rounded-lg shadow-2xl bg-gray-100">
                <div className="w-full h-full">
                    <div className="cardHeader p-3">
                        <h1 className="font-bold text-black text-2xl">Cập nhật sinh viên</h1>
                    </div>
                    <div className="cardBody p-0 m-0">
                        <form onReset={handleReset(onReset)} onSubmit={handleSubmit(onSubmit)} onChange={handleChange} onBlur={handleChange}>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="firstName">Họ sinh viên</label>
                                <input value={isInputForm.firstName} placeholder="Họ sinh viên" required type="text" className={`${colorInput.firstName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstName`} name="firstName" />
                                <span className={`${colorInput.firstName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.firstName}</span>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="lastName">Tên sinh viên</label>
                                <input value={isInputForm.lastName} placeholder="Tên sinh viên" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" name="lastName" />
                                <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
                            </div>
                            {/* <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
                            <button type="submit" className="my-3 rounded-full w-full h-14 bg-sky-400 text-white font-bold text-xl" >Tiếp</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // <>
        //     <main className="w-full h-full">
        //         <div className="w-[80vw] h-[60vh] m-auto bg-white flex-1 rounded-xl" >
        //             <div className="headerForm p-5 flex justify-between">
        //                 <div className="headerForm-left">
        //                     <button className="btn btn-primary rounded-full w-12 h-12" onClick={prevStep}><AiOutlineArrowLeft size={24} /></button>
        //                 </div>
        //                 <div className="headerForm-center text-center">
        //                     <h1 className="text-black font-bold">Cập nhật thông tin sinh viên</h1>
        //                 </div>
        //                 <div className="headerForm-right">
        //                     <button className="btn btn-primary rounded-full w-12 h-12" onClick={() => {handleSubmit(onSubmit); nextStep();}} ><AiOutlineArrowRight size={24} /></button>
        //                 </div>
        //             </div>
        //             <div className="containerForm block p-6 rounded-lg bg-white w-xl m-w-xl">
        //                 <form onReset={handleReset(onReset)} onSubmit={handleSubmit(onSubmit)} onChange={handleChangeForm}>
        //                     <div className="mb-10 xl:w-96">
        //                         <label className="form-label inline-block mb-2 text-gray-700" htmlFor="studentId">Mã sinh viên</label>
        //                         <input value={isInputForm.studentId} name="studentId" disabled required type="text" className={`${colorInput.studentId} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="studentId" placeholder="Mã sinh viên"/>
        //                         <span className={`${colorInput.studentId}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.studentId}</span>
        //                     </div>
        //                     <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="firstName">Họ sinh viên</label>
        //                             <input value={isInputForm.firstName} placeholder="Họ sinh viên" required type="text" className={`${colorInput.firstName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstName`} name="firstName" />
        //                             <span className={`${colorInput.firstName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.firstName}</span>
        //                         </div>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="lastName">Tên sinh viên</label>
        //                             <input value={isInputForm.lastName} placeholder="Tên sinh viên" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" name="lastName" />
        //                             <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
        //                         </div>
        //                     </div>
        //                     <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="email">Email</label>
        //                             <input value={isInputForm.email} placeholder="Email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" name="email" />
        //                             <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
        //                         </div>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="address">Địa chỉ</label>
        //                             <input value={isInputForm.address} placeholder="Địa chỉ" required type="text" className={`${colorInput.address} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="address" name="address" />
        //                             <span className={`${colorInput.address}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.address}</span>
        //                         </div>
        //                     </div>
        //                     <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="birthday">Ngày sinh sinh viên</label>
        //                             <input value={isInputForm.birthday} required type="date" className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" name="birthday" />
        //                             <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>                                    
        //                         </div>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
        //                             <select name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
        //                                 {(() => {
        //                                     if(isInputForm.gender === 'Nam'){
        //                                         return(
        //                                             <option name="gender" defaultValue="Nam">Nam</option>
        //                                         );
        //                                     }else{
        //                                         return(
        //                                             <option name="gender" defaultValue="Nữ">Nữ</option>
        //                                         );
        //                                     }
        //                                 })()}
        //                             </select>
        //                         </div>
        //                     </div>
        //                     <div className={`${isMobile480 ? '' : `grid grid-cols-2 gap-4`}`}>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
        //                             <select name="scienceBranch" id="scienceBranch" className={`${colorInput.scienceBranch} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
        //                                 {isScienceBranch.map((item, i) => {
        //                                     if (isInputForm.scienceBranch === item.nameScienceBranch) {
        //                                         return (
        //                                             <>
        //                                                 <option name="scienceBranch" key={item.id}  defaultValue={item.nameScienceBranch}>{item.nameScienceBranch}</option>
        //                                             </>
        //                                         );
        //                                     } else {
        //                                         return (
        //                                             <>
        //                                                 <option name="scienceBranch" key={item.id} value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
        //                                             </>
        //                                         );
        //                                     }
        //                                 })}
        //                             </select>
        //                         </div>
        //                         <div className="mb-10 xl:w-96">
        //                             <label className="form-label inline-block mb-2 text-gray-700" htmlFor="class">Lớp:</label>
        //                             <select name="nameClass" id="nameClass" className={`${colorInput.nameClass} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Lop hoc">
        //                                 {isClass.map((item, i) => {
        //                                     if (isInputForm.nameClass === item.nameClass) {

        //                                         return (
        //                                             <>
        //                                                 <option name="nameClass" key={item.id} defaultValue={item.nameClass}>{item.nameClass}</option>
        //                                             </>
        //                                         );
        //                                     } else {
        //                                         return (
        //                                             <>
        //                                                 <option name="nameClass" key={item.id} value={item.nameClass}>{item.nameClass}</option>
        //                                             </>
        //                                         );
        //                                     }
        //                                 })}
        //                             </select>
        //                         </div>
        //                     </div>
        //                     <div className="grid grid-cols-1 gap-4">
        //                         {/* <button type="reset" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Xóa hết</button> */}
        //                         {/* <button type="button" onClick={""} className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và quay trở lại!</button> */}
        //                         <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và xem trước thông tin</button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </main>
        // </>
    );
}