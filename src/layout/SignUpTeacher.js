import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onSnapshot, getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect,useCallback } from "react";
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import ScienceBratchServices from "./services/ScienceBratch.services";
import UsersTeacherServices from "./services/UsersTeacher.services";
import { UserAuth } from "./Provider/AuthContextProvider";
import { useNavigate } from 'react-router-dom';
const SignUpTeacher = ({history}) => {
    const navigate = useNavigate();
    // const auth = getAuth();
    const [inputForm, setInputForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        position: "Giáo viên",
        birthday: "",
        nameScienceBranch: "",
        gender: "",
    });
    const { createUser } = UserAuth();
    const [error, setError] = useState(false)
    // const handleSignUp = useCallback(async (e) => {
    //     e.preventDefault();
    //     // const { email}
    // })

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
        // console.log("target",target);
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        // console.log("name: " + name, target.name);
        setInputForm({ ...inputForm, [name]: value });
        // console.log("isInputForm", inputForm);
    }
    const onReset = (value) => {
        setInputForm({ ...value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputForm.email && inputForm.password && inputForm.password.trim() === inputForm.confirmPassword.trim() && inputForm.firstName && inputForm.lastName && inputForm.gender && inputForm.position && inputForm.birthday && inputForm.nameScienceBranch) {
            try{
                await createUser(inputForm.email, inputForm.password);
                try{
                    if(await UsersTeacherServices.addUserTeacher(inputForm)){
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
    useEffect(() => {
        getScienceBratch();
    })
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
                                    </div>
                                    <div className="form-group mb-6">
                                        <input name="lastName" type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
                                            aria-describedby="emailHelp124" placeholder="Tên" />
                                    </div>
                                </div>
                                <div className="form-group mb-6">
                                    <input name="email" type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                        placeholder="Địa chỉ email của giáo viên"
                                    />
                                </div>
                                <div className="form-group mb-6">
                                    <input name="password" type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                        placeholder="Mật khẩu"
                                    />
                                </div>
                                <div className="form-group mb-6">
                                    <input name="confirmPassword" type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput127"
                                        placeholder="Xác nhận mật khẩu" />
                                </div>
                                <div className="form-group mb-6">
                                    <input name="passwordInput" type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput128"
                                        placeholder="Mã đăng ký" />
                                </div>
                                <div className="form-group mb-6">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="birthday">Ngày sinh sinh viên</label>
                                    <input required type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="birthday" name="birthday" />
                                </div>
                                <div className="form-group mb-6">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="gender">Giới tính:</label>
                                    <select name="gender" id="gender" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="gender">
                                        <option name="gender" selected value="male">Nam</option>
                                        <option name="gender" value="female">Nữ</option>
                                    </select>
                                </div>
                                <div className="form-group mb-6">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch">Khoa ngành:</label>
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
                                </div>
                                <button className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SignUpTeacher;