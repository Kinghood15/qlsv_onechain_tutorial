import { MdNotifications } from "react-icons/md";
import { FiMenu, FiHome } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import Tippy from '@tippyjs/react';
import React, { useState, useEffect } from "react";
import SidebarNavigationMenu from './SidebarNavigationMenu';
import UsersTeacherServices from '../services/UsersTeacher.services';
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from '../env';
import { UserAuth } from '../Provider/AuthContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import "../css/header.css";
export default function Header(props) {
    const [isMobile, setIsMobile] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const location = useLocation();
    //choose the screen size 
    const handleResizeMobile = () => {
        if (window.innerWidth < 860 || document.body.clientWidth < 860) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }
    }

    // create an event listener
    useEffect(() => {
        // window.addEventListener("resize", handleResizeMobile);
        // if (Screen.prototype.availWidth < 860) {
        // setIsMobile(true);
        // };
        // getAvatar();
        handleResizeMobile();
    })
    useEffect(() => {
        getAvatar();
        if (location.pathname.split('/')[1] === 'giao-vien' && location.pathname.split('/')[2] === 'thong-tin-ca-nhan') {
            if (isUserTeacher.email !== "") {
                props.parentCallback(isUserTeachers[0]);
            }
        }
    }, []);
    const RefeshTeacher = () => {
        try {
            getAvatar();
        } catch (error) {
            console.log("RefeshTeacher", error);
        }
    }
    const onHandleClickMenu = () => {
        if (isMobile) {
            setIsShowSidebar(!isShowSidebar);
        } else {
            setIsShowSidebar(false);
        }
    }
    const callbackFunction = () => {

    }
    const [isUserTeacher, setIsUserTeacher] = useState({
        "email": "",
        "birthday": "",
        "firstName": "",
        "lastName": "",
        "gender": "",
        "avatar": "",
        "nameScienceBranch": "",
        "position": "",
    })
    const [isUserTeachers, setIsUserTeachers] = useState({
        "id": "",
        "email": "",
        "birthday": "",
        "firstName": "",
        "lastName": "",
        "gender": "",
        "avatar": "",
        "nameScienceBranch": "",
        "position": "",
    })
    const getAvatar = async () => {
        try {
            let token = localStorage.getItem('Authorization');
            // console.log("token:",token)
            if (token !== null) {
                token = JSON.parse(token)
                let email = token.email;
                try {
                    const userTeacher = await UsersTeacherServices.getUserTeacherByEmail(email);
                    setIsUserTeachers(userTeacher.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
                    // console.log("IsUserTeachers", isUserTeachers)
                    userTeacher.forEach((teacher) => {
                        // console.log("Teacher.data() in header", teacher.data());
                        if (teacher.data()) {
                            setIsUserTeacher(teacher.data())
                        }
                    })

                } catch (error) {
                    console.log("error:", error);
                    setIsUserTeacher(null);
                }
            }else{
                setIsUserTeacher(null);
            }
        } catch (error) {
            setIsUserTeacher(null);
            console.log("Get information about teacher failed: ", error);
        }
    }
    if (location.pathname.split('/')[1] === 'giao-vien' && location.pathname.split('/')[2] === 'thong-tin-ca-nhan') {
        if (isUserTeacher.email !== "") {
            props.parentCallback(isUserTeachers[0]);
        }
    }

    const { logout } = UserAuth();
    const navigate = useNavigate();
    const Logout = async (e) => {
        // e.preventDefault();
        try {
            if (await logout() === undefined) {
                alert("Đăng suất tài khoản thành công !")
                navigate('/giao-vien/dang-nhap');
            } else alert("Đăng xuất tài khoản thất bại!")
        } catch (error) {
            alert("Đăng suất không thành công !")
        }
    }
    const ShowProfile = () => {
        try {
            navigate('/giao-vien/thong-tin-ca-nhan');
        } catch (error) {
            console.log("Show profile teacher error: " + error);
        }
    }
    const [isShowMenuBoxProfile, setIsMenuBoxProfile] = useState(false);
    return (
        <div className="header 2xl w-screen max-w-[100vw] bg-sky-500 flex justify-between block ease-in sticky top-0 z-50" onMouseEnter={RefeshTeacher} onMouseLeave={RefeshTeacher}>
            <div className="boxLogo w-80 h-full flex items-center justify-start ease-in">
                {(() => {
                    if (isMobile) {
                        return (
                            <li onClick={onHandleClickMenu} className={"item-menu ease-in-out active w-10 h-12 flex items-center justify-center m-2 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-xl"}>
                                <div className="icon">
                                    <FiMenu size={15} />
                                </div>
                            </li>
                        );
                    } else return "";
                })()}
                {(() => {
                    if (isShowSidebar === true && isMobile === true) {
                        return (
                            <SidebarNavigationMenu isMobile={isMobile} isShowSidebar={isShowSidebar} parentCallback={callbackFunction} />
                        );
                    }
                })()}

                <a className={isMobile ? "text-white flex justify-center items-center text-center text-xl font-bold ease-in h-20" : "h-20 flex justify-center items-center text-white w-full text-center text-2xl font-bold ease-in"} href="/">Quản lý sinh viên </a>
            </div>
            <div className="boxNotification w-65 flex justify-end mr-5 items-center">

                {/* <button href="/login" className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Đăng nhập</button> */}
                {/* <button href="/contract" className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Liên hệ</button> */}
                {/* <button href="/notification" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><MdNotifications size={28} /></button> */}
                {/* <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><MdPerson size={28} /></button> */}
                {/* <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><img className="rounded-full w-11 h-11" src={an} alt="user" /></button> */}
                {(() => {
                    if (isUserTeacher !== null) {
                        return (
                            <>
                                <button href="/notification" className={`w-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md ${isMobile ? 'hidden' : 'block'}`}><MdNotifications size={28} /></button>
                                {/* <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><MdPerson size={28} /></button> */}
                                <>
                                    <button onMouseEnter={() => setIsMenuBoxProfile(true)} onMouseLeave={() => setIsMenuBoxProfile(false)} className={"buttonBoxAvar relative w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"}><img className="rounded-full w-11 h-11" src={isUserTeacher.avatar} alt="user" /></button>
                                    <div onMouseEnter={() => setIsMenuBoxProfile(true)} onMouseLeave={() => setIsMenuBoxProfile(false)} className={"boxProfile w-96 bg-gray-100 absolute top-16 rounded-lg z-20 drop-shadow-2xl " + `${isShowMenuBoxProfile ? "block" : "hidden"}`}>
                                        <div className="boxProfile-header">
                                            <img className="m-auto rounded-full p-3 w-28 h-28" src={isUserTeacher.avatar} alt="user" />
                                        </div>
                                        <div className="boxProfile-container w-full p-3">
                                            <h5 className="p-1 w-full text-center">{isUserTeacher.firstName + " " + isUserTeacher.lastName}</h5>
                                            <p className="p-1 pb-3 w-full text-center">Email: {isUserTeacher.email}</p>
                                        </div>
                                        <div className="boxProfile-footer p-5">
                                            <button onClick={ShowProfile} type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Xem thông tin cá nhân</button>
                                            <button onClick={Logout} type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Đăng xuất</button>
                                        </div>
                                    </div>
                                </>
                            </>
                        )
                    } else {
                        return (
                            <>
                                {/* <button href="/notification" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><MdNotifications size={28} /></button> */}
                                <button onClick={() => navigate('/dang-nhap')} className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Đăng nhập</button>
                                <button onClick={() => navigate('/giao-vien/dang-nhap')} className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Đăng nhập giáo viên</button>
                            </>
                        )
                    }
                })()}
            </div>
        </div>
    )
};



