import React, { useState, useEffect } from 'react';
import { UserAuth } from './Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import ScienceBratchServices from './services/ScienceBratch.services';
import UsersTeacherService from './services/UsersTeacher.services';
import "./css/editprofile.css";
import { useValidator } from "@validator.tool/hook";
import { confirmAlert } from 'react-confirm-alert';
const EditProfile = (userTeacher) => {
    useEffect(() => {
        getScienceBratch();
        if (Object(userTeacher).userTeacher.email !== '') {
            setIsUserTeacher(Object(userTeacher).userTeacher)
        }
    }, [])
    const [colorInput, setColorInput] = useState({
        "email": "border-gray-300",
        "birthday": "border-gray-300",
        "firstName": "border-gray-300",
        "lastName": "border-gray-300",
        "gender": "border-gray-300",
        "avatar": "border-gray-300",
        "nameScienceBranch": "border-gray-300",
        "position": "border-gray-300",
    })
    const [validateInput, setValidateInput] = useState({
        "email": "",
        "birthday": "",
        "firstName": "",
        "lastName": "",
        "gender": "",
        "avatar": "",
        "nameScienceBranch": "",
        "position": "",
    })
    const [confirmEmail, setConfirmEmail] = useState();
    const { logout } = UserAuth();
    const Save = async () => {
        confirmAlert({
            title: 'Cảnh báo',
            message: 'Bạn có chắc chắn muốn sửa người dùng này không ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            if (isUserTeacher.email.trim() === confirmEmail.trim()) {
                                await UsersTeacherService.updateUserTeacher(isUserTeacher.id, isUserTeacher);
                                navigate('/giao-vien/thong-tin-ca-nhan');
                            }
                        } catch (error) {
                            console.log("Error edit user teacher failed", error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => true
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => {},
            afterClose: () => {},
            onClickOutside: () => {},
            onKeypress: () => {},
            onKeypressEscape: () => {},
            overlayClassName: "overlay-custom-class-name"
        })
    }
    const navigate = useNavigate();
    const [isUserTeacher, setIsUserTeacher] = useState({
        "email": Object(userTeacher).userTeacher.email,
        "birthday": Object(userTeacher).userTeacher.birthday,
        "firstName": Object(userTeacher).userTeacher.firstName,
        "lastName": Object(userTeacher).userTeacher.lastName,
        "gender": Object(userTeacher).userTeacher.gender,
        "avatar": Object(userTeacher).userTeacher.avatar,
        "nameScienceBranch": Object(userTeacher).userTeacher.nameScienceBranch,
        "position": Object(userTeacher).userTeacher.position,
    });
    const getEmergencyFoundImg = (urlImg) => {
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            setIsUserTeacher({ ...isUserTeacher, ['avatar']: baseString });
        };
        reader.readAsDataURL(urlImg.target.files[0]);
    };
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
        setIsUserTeacher({ ...isUserTeacher, [name]: value });
        if (name === "confirmEmail") {
            setConfirmEmail(value);
        }
    }
    const { validator, handleSubmit } = useValidator({
        initValues: isUserTeacher
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
        window.addEventListener('resize', handleResize);
    }, [isMobile320, isMobile480, isMobile860, isMobile1025, isTable])
    return (
        <main className={`w-full`}>
            <div className="bg-white w-full m-auto flex-1 rounded-lg">
                <form onChange={handleChange} onSubmit={handleSubmit(Save)}>
                    <div className={`boxheaderProfile ${isMobile1025 ? '' : 'flex justify-space-between relative'} h-40 rounded-lg `}>
                        <div className={`BoxAvatarProfile relative h-full ${isMobile1025 ? 'w-full' : 'w-[30%]'} shadow-inner`}>
                            <div className={`boxAvatarProfileWhite ${isMobile480 ? 'w-28 h-28' : 'w-56 h-56'} bg-white rounded-full  ${isMobile1025 ? 'mx-auto' : 'top-1/3 absolute right-1'} flex items-center justify-center`}>
                                <div className="profile-pic">
                                    <label className="-label" htmlFor="file">
                                        <span className="glyphicon glyphicon-camera"></span>
                                        <span>Change Image</span>
                                    </label>
                                    <input id="file" type="file" onChange={getEmergencyFoundImg} />
                                    <img src={isUserTeacher.avatar} id="output" className={`${isMobile480 ? 'w-24 h-24' : 'w-56 h-56'}  rounded-full m-auto`} />
                                </div>
                                {/* <img className="w-48 h-48  bg-red rounded-full" src={Object(isUserTeacher).isUserTeacher.avatar} /> */}
                            </div>
                        </div>
                        <div className={`BoxName ${isMobile1025 ? (isMobile480 ? 'w-full my-1 mt-1' : 'w-full my-5 mt-12') : 'w-[50%]'} flex justify-start items-end py-5`}>
                            <p className={`${isMobile1025 ? 'text-black w-full text-center' : 'text-white'} font-bold ${isMobile480 ? 'text-xl' : 'text-3xl'}`}>{Object(userTeacher).userTeacher.firstName + " " + Object(userTeacher).userTeacher.lastName}</p>
                        </div>
                        <div className={`BoxSettings w-[20%] ${isMobile1025 ? 'hidden' : 'block'}`}>
                            <button type="submit" className="px-6 py-2.5 bg-white text-blue font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white-300 hover:shadow-lg focus:bg-black focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Lưu thông tin cá nhân</button>
                        </div>
                    </div>
                    <div className={`boxcontainer ${isMobile480 ? 'mt-14 p-2' : 'mt-32 p-5'} `}>
                        <div className={`${isMobile1025 ? '' : 'grid grid-cols-2 gaps-2'}`}>
                            <div className={`mb-10 xl:w-96`}>
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Họ:</label>
                                <input value={isUserTeacher.firstName} name="firstName" required type="text" className={`${colorInput.firstName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="firstName" placeholder="Họ" />
                                <span className={`${colorInput.firstName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.firstName}</span>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Tên:</label>
                                <input value={isUserTeacher.lastName} name="lastName" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" placeholder="Tên" />
                                <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
                            </div>
                        </div>
                        <div className={`${isMobile1025 ? '' : 'grid grid-cols-2 gaps-2'}`}>
                            <div className="mb-10 xl:w-96">
                                {/* <h5 className="text-black font-bold px-5">Email :</h5> */}
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Email:</label>
                                <input value={isUserTeacher.email} name="email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" placeholder="Email" />
                                <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                                {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.email}</p> */}
                            </div>
                            <div className="mb-10 xl:w-96">
                                {/* <h5 className="text-black font-bold px-5">Email :</h5> */}
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Xác nhận Email:</label>
                                <input value={confirmEmail} name="confirmEmail" required type="email" className={`${colorInput.confirmEmail} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="confirmEmail" placeholder="Xác nhận lại email" />
                                <span className={`${colorInput.confirmEmail}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.confirmEmail}</span>
                                {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.email}</p> */}
                            </div>
                        </div>

                        <div className={`${isMobile1025 ? '' : 'grid grid-cols-2 gaps-2'}`}>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
                                <select value={isUserTeacher.gender} name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
                                    <option name="gender" value="Nam" selected>Nam</option>
                                    <option name="gender" value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Ngày sinh:</label>
                                <input value={isUserTeacher.birthday} name="birthday" required type="date" className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" placeholder="Ngày sinh" />
                                <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>
                                {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.birthday}</p> */}
                            </div>
                        </div>
                        <div className={`${isMobile1025 ? '' : 'grid grid-cols-2 gaps-2'}`}>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
                                <select value={isUserTeacher.scienceBranch} name="scienceBranch" id="scienceBranch" className={`${colorInput.scienceBranch} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
                                    {isScienceBranch.map((item) => {
                                        if (isUserTeacher.scienceBranch === item.nameScienceBranch) {
                                            return (
                                                <>
                                                    <option name="scienceBranch" key={item.id} selected value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
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
                            {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.nameScienceBranch}</p> */}
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Chức vụ:</label>
                                {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.position}</p> */}
                                <input value={isUserTeacher.position} name="position" required type="text" className={`${colorInput.position} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="position" placeholder="Chức vụ" />
                                <span className={`${colorInput.position}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.position}</span>
                            </div>
                        </div>
                    </div>
                    <div className="boxfooter flex items-end justify-end p-5">
                        {(() => {
                            if (isMobile1025) {
                                return (
                                    <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Lưu thông tin cá nhân</button>
                                );
                            }
                        })()}
                    </div>
                </form>
            </div>
        </main >
    );
}
export default EditProfile;