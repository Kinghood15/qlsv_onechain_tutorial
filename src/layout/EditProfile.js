import React, { useState, useEffect } from 'react';
import { UserAuth } from './Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import ScienceBratchServices from './services/ScienceBratch.services';
import "./css/editprofile.css";
const EditProfile = (userTeacher) => {
    useEffect(() => {
        console.log("userTeacher in EditProfile", Object(userTeacher).userTeacher)
        getScienceBratch();
    },[])
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
    const { logout } = UserAuth();
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
    console.log("isUserTeacher in edit profile",isUserTeacher);
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try {
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (e) {
            console.log("Message" + e.message);
        }
    }
    return (
        <main>
            <div className="container bg-white flex-1 rounded-lg">
                <div className="boxheaderProfile flex h-40 rounded-lg justify-space-between">
                    <div className="BoxAvatarProfile relative h-full w-[30%] shadow-inner	">
                        <div className="absolute w-56 h-56 bg-white rounded-full inset-1/3 flex items-center justify-center">
                            <div class="profile-pic">
                                <label class="-label" for="file">
                                    <span class="glyphicon glyphicon-camera"></span>
                                    <span>Change Image</span>
                                </label>
                                <input id="file" type="file" onChange={"getEmergencyFoundImg"} />
                                <img src={"isUserTeacher"} id="output" className="w-54 h-54  rounded-full m-auto" />
                            </div>
                            {/* <img className="w-48 h-48  bg-red rounded-full" src={Object(isUserTeacher).isUserTeacher.avatar} /> */}
                        </div>
                    </div>
                    <div className="BoxName w-[50%] flex justify-start items-end py-5">
                        <p className="text-white font-bold text-3xl">{isUserTeacher.firstName + " " + isUserTeacher.lastName}</p>
                    </div>
                    <div className="BoxSettings w-[20%]">
                        <button type="button" className="px-6 py-2.5 bg-white text-blue font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white-300 hover:shadow-lg focus:bg-black focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Lưu thông tin cá nhân</button>
                    </div>
                </div>
                <div className="boxcontainer mt-32 p-5">
                    <div className="grid grid-cols-2 gaps-2">
                        <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" for="gender">Họ:</label>
                            <input value={isUserTeacher.fistName} name="fistName" required type="text" className={`${colorInput.fistName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="fistName" placeholder="Họ" />
                            <span className={`${colorInput.fistName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.fistName}</span>
                        </div>
                        <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" for="gender">Tên:</label>
                            <input value={isUserTeacher.lastName} name="lastName" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" placeholder="Tên" />
                            <span className={`${colorInput.lastName}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.lastName}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gaps-2">
                        <div className="mb-10 xl:w-96">
                            {/* <h5 className="text-black font-bold px-5">Email :</h5> */}
                            <label className="form-label inline-block mb-2 text-gray-700" for="gender">Email:</label>
                            <input value={isUserTeacher.email} name="email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" placeholder="Email" />
                            <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                            {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.email}</p> */}
                        </div>
                        <div className="mb-10 xl:w-96">
                            {/* <h5 className="text-black font-bold px-5">Email :</h5> */}
                            <label className="form-label inline-block mb-2 text-gray-700" for="gender">Xác nhận Email:</label>
                            <input value={isUserTeacher.confirmEmail} name="confirmEmail" required type="email" className={`${colorInput.confirmEmail} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="confirmEmail" placeholder="Xác nhận lại email" />
                            <span className={`${colorInput.confirmEmail}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.confirmEmail}</span>
                            {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.email}</p> */}
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" for="gender">Giới tính:</label>
                            <select value={isUserTeacher.gender} name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
                                <option name="gender" value="Nam" selected>Nam</option>
                                <option name="gender" value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" for="gender">Ngày sinh:</label>
                            <input value={isUserTeacher.birthday} name="birthday" required type="date" className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" placeholder="Ngày sinh" />
                            <span className={`${colorInput.birthday}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.birthday}</span>
                            {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.birthday}</p> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gaps-2">
                        <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch">Khoa ngành:</label>
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
                            <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch">Chức vụ:</label>
                            {/* <p className="text-black">{Object(isUserTeacher).isUserTeacher.position}</p> */}
                            <input value={isUserTeacher.position} name="position" required type="text" className={`${colorInput.position} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="position" placeholder="Chức vụ" />
                            <span className={`${colorInput.position}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.position}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
export default EditProfile;