import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onSnapshot, getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect,useCallback } from "react";
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import ScienceBratchServices from "./services/ScienceBratch.services";
import UsersTeacherServices from "./services/UsersTeacher.services";
import { UserAuth } from "./Provider/AuthContextProvider";
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './env';
const SignUpTeacher = ({history}) => {
    const navigate = useNavigate();
    // const auth = getAuth();
    const [isInputForm, setIsInputForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        position: "Giáo viên",
        birthday: "",
        nameScienceBranch: "",
        gender: "Nam",
        avatar: AVATAR_USER,
    });
    const [colorInput, setColorInput] = useState({
        'firstName': 'border-gray-300',
        'lastName': 'border-gray-300',
        'password': 'border-gray-300',
        'email': 'border-gray-300',
        'birthday': 'border-gray-300',
        'nameScienceBranch': 'border-gray-300',
        'gender': 'border-gray-300',
    })
    const [validateInput, setValidateInput] = useState({
        'firstName': '',
        'lastName': '',
        'password': '',
        'email': '',
        'birthday': '',
        'nameScienceBranch': '',
        'gender': '',
    })
    const { createUser } = UserAuth();
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try {
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (e) {
            console.log("Message" + e.message);
        }
    }
    function handleChange(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setIsInputForm({ ...isInputForm, [name]: value });
    }
    const onReset = (value) => {
        setIsInputForm({ ...value });
    }
    useEffect(() => {
        if (isScienceBranch && isScienceBranch.length > 0) {
            isScienceBranch.map((item, index) => {
                if (index === 0) {
                    setIsInputForm({ ...isInputForm, ['nameScienceBranch']: item.nameScienceBranch });
                }
            })
        }
    }, [isScienceBranch]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInputForm.email && isInputForm.password && isInputForm.password.trim() === isInputForm.confirmPassword.trim() && isInputForm.firstName && isInputForm.lastName && isInputForm.gender && isInputForm.position && isInputForm.birthday && isInputForm.nameScienceBranch) {
            try{
                await createUser(isInputForm.email, isInputForm.password);
                try{
                    if(await UsersTeacherServices.addUserTeacher(isInputForm)){
                        alert("Đăng ký tài khoản thành công !")
                        navigate("/giao-vien/dang-nhap")
                    }else return alert("Đăng ký tài khoản không thành công !")
                    
                }catch(err){
                    console.log("Save data user teacher failed", err);
                }
            }catch(e){
                console.log("Create user teacher authtication failed",e);
            }
        }

    }
    function handleChange(env) {
        const target = env.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setIsInputForm({ ...isInputForm, [name]: value });
        if (name === 'firstName') {
            handleChangeFirstName();
        } else if (name === 'lastName') {
            handleChangeLastName();
        } else if (name === 'email') {
            handleChangeEmail();
        } else if(name === 'password') {
            handleChangePassword();
        } else if(name === 'confirmPassword') {
            handleChangeConfirmPassword();
        } else if (name === 'address') {
            handleChangeAddresses();
        } else if (name === 'birthday') {
            handleChangeAge();
        } else{
            handleChangeAge();
            handleChangeConfirmPassword();
        }
    }
    function handleChangePassword() {
        if (isInputForm.password) {
            if (isInputForm.password.length > 6) {
                setValidateInput({ ...validateInput, ['password']: '' });
                setColorInput({ ...colorInput, ['password']: 'border-green-300' });
            } else if(isInputForm.password.length <6){
                setValidateInput({ ...validateInput, ['password']: 'Mật khẩu phải trên 6 ký tự trở lên ' });
                setColorInput({ ...colorInput, ['password']: 'border-red-300' });
            }
              
        } else {
            setValidateInput({ ...validateInput, ['password']: 'Bạn phải nhập mật khẩu !' });
            setColorInput({ ...colorInput, ['password']: 'border-red-300' });
        }
    }
    function handleChangeConfirmPassword() {
        if (isInputForm.confirmPassword) {
            if (isInputForm.confirmPassword.length > 6) {

                if(isInputForm.password.trim() === isInputForm.confirmPassword.trim() && isInputForm.password.trim().length === isInputForm.confirmPassword.trim().length){
                    setValidateInput({ ...validateInput, ['confirmPassword']: 'Xác nhật mật khẩu trùng với mật khẩu trên !' });
                    setColorInput({ ...colorInput, ['confirmPassword']: 'border-green-300' });
                }else{
                    setValidateInput({ ...validateInput, ['confirmPassword']: 'Xác nhận mật khẩu không trùng với mật khẩu trên!. Yêu cầu kiểm tra lại !' });
                    setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
                }

            } else if(isInputForm.confirmPassword.length <6){
                setValidateInput({ ...validateInput, ['confirmPassword']: 'Xác nhật mật khẩu phải trên 6 ký tự trở lên ' });
                setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
            }
              
        } else {
            setValidateInput({ ...validateInput, ['confirmPassword']: 'Bạn phải nhập xác nhận mật khẩu !' });
            setColorInput({ ...colorInput, ['confirmPassword']: 'border-red-300' });
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
                const birthdayCheck = new Date(isInputForm.birthday);
                var age_now = date.getFullYear() - birthdayCheck.getFullYear();
                var m = date.getMonth() - birthdayCheck.getMonth();
                if (m < 0 || (m === 0 && date.getDate() < birthdayCheck.getDate())) {
                    age_now--;
                }
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
    useEffect(() => {
        getScienceBratch();
    },[])
    return (
        <>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <h1>Đăng ký tài khoản Giáo Viên</h1>
                            <form classname="xl:ml" onReset={onReset} onChange={handleChange} onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group mb-6">
                                        <input name="firstName" type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                                            aria-describedby="emailHelp123" placeholder="Họ" />
                                        <span className={`${colorInput.firstName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.firstName}</span>

                                    </div>
                                    <div className="form-group mb-6">
                                        <input name="lastName" type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
                                            aria-describedby="emailHelp124" placeholder="Tên" />
                                        <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
                                    </div>
                                </div>
                                <div className="form-group mb-6">
                                    <input name="email" type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                        placeholder="Địa chỉ email của giáo viên"
                                    />
                                    <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                                </div>
                                <div className="form-group mb-6">
                                    <input name="password" type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                        placeholder="Mật khẩu"
                                    />
                                    <span className={`${colorInput.password}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.password}</span>
                                </div>
                                <div className="form-group mb-6">
                                    <input name="confirmPassword" type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput127"
                                        placeholder="Xác nhận mật khẩu" />
                                    <span className={`${colorInput.confirmPassword}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.confirmPassword}</span>
                                </div>
                                <div className="form-group mb-6">
                                    <input name="passwordInput" type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput128"
                                        placeholder="Mã đăng ký (Tính năng chưa phát triển nên có thể nhập linh tinh)" />
                                    {/* <span className={`${colorInput.studentId}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.studentId}</span> */}
                                </div>
                                <div className="form-group mb-6">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="birthday">Ngày sinh giáo viên</label>
                                    <input required type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="birthday" name="birthday" />
                                    <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>
                                </div>
                                <div className="form-group mb-6">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
                                    <select name="gender" id="gender" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="gender">
                                        <option name="gender" selected value="Nam">Nam</option>
                                        <option name="gender" value="Nữ">Nữ</option>
                                    </select>

                                </div>
                                <div className="form-group mb-6">
                                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
                                    <select name="nameScienceBranch" id="scienceBranch" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Khoa nganh">
                                        {isScienceBranch.map((item, i) => {
                                            if (i === 0) {
                                                i++;
                                                // setIsInputForm( isInputForm.scienceBranch:e.target.value );
                                                return (
                                                    <>
                                                        <option name="nameScienceBranch" key={item.id} selected value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                                    </>
                                                );
                                            } else {
                                                i++;
                                                return (
                                                    <>
                                                        <option name="scienceBranch" key={item.id} value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                                    </>
                                                );
                                            }
                                        })}
                                    </select>
                                </div>
                                <div className="form-group form-check text-center mb-6">
                                    {/* <label className="form-check-label inline-block text-gray-800" >Tôi đồng ý với điều khoản và chính sách của nhà trường</label> */}
                                    <button className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Đăng ký</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SignUpTeacher;