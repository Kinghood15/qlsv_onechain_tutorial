import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UnLockIcon } from "./js/UnLockIcon.js";
import { LockIcon } from "./js/LockIcon.js";
import { onSnapshot, getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
export default function SignUpTeacher() {
    const auth = getAuth();
    const [inputForm, setInputForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        position:"",
        birthday: "",
        nameScienceBranch:"",
        gender: "",
    });
    const SignUp = () => {
        createUserWithEmailAndPassword(auth, "annguuyen8278163@gmail.com", "123455678")
        .then((userCredential) => {
            // Signed in 
            // const user = ;
            console.log("User",userCredential);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }
    return (
        <>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <h1>Đăng ký tài khoản Giáo Viên</h1>
                            <form onSubmit={SignUp}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group mb-6">
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                                            aria-describedby="emailHelp123" placeholder="Họ" />
                                    </div>
                                    <div className="form-group mb-6">
                                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
                                            aria-describedby="emailHelp124" placeholder="Tên" />
                                    </div>
                                </div>
                                <div className="form-group mb-6">
                                    <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                        placeholder="Địa chỉ email của giáo viên" />
                                </div>
                                <div className="form-group mb-6">
                                    <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                        placeholder="Mật khẩu" />
                                </div>
                                <div className="form-group mb-6">
                                    <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput127"
                                        placeholder="Xác nhận mật khẩu" />
                                </div>
                                <div className="form-group mb-6">
                                    <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                        placeholder="Mã đăng ký" />
                                </div>
                                <div className="form-group form-check text-center mb-6">
                                    <input type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                        id="exampleCheck25" checked />
                                    <label className="form-check-label inline-block text-gray-800" for="exampleCheck25">Tôi đồng ý với điều khoản và chính sách của nhà trường</label>
                                </div>
                                <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}