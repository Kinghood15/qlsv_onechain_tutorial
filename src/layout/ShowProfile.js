import "./css/showprofile.css";
import { UserAuth } from './Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
const ShowProfile = (userTeacher) => {
  useEffect(() => {
    // console.log("userTeacher in ShowProfile", userTeacher); 
  })
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
  return (
    <main>
      <div className="container bg-white flex-1 rounded-lg">
        <div className="boxheaderProfile flex h-40 rounded-lg justify-space-between">
          <div className="BoxAvatarProfile relative h-full w-[30%] shadow-inner	">
            <div className="absolute w-56 h-56 bg-white rounded-full inset-1/3 flex items-center justify-center">
              <img className="w-52 h-52  bg-red rounded-full" src={Object(userTeacher).userTeacher.avatar} />
            </div>
          </div>
          <div className="BoxName w-[50%] flex justify-start items-end py-5">
            <p className="text-white font-bold text-3xl">{Object(userTeacher).userTeacher.firstName + " " + Object(userTeacher).userTeacher.lastName}</p>
          </div>
          <div className="BoxSettings w-[20%]">
            <button type="button" className="px-6 py-2.5 bg-white text-blue font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white-300 hover:shadow-lg focus:bg-black focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Chỉnh sửa thông tin cá nhân</button>
          </div>
        </div>
        <div className="boxcontainer mt-32 p-5">
          <div className="flex justify-space-between p-2">
            <h5 className="text-black font-bold px-5">Ngày sinh :</h5>
            <p className="text-black">{Object(userTeacher).userTeacher.birthday}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className="text-black font-bold px-5">Email :</h5>
            <p className="text-black">{Object(userTeacher).userTeacher.email}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className="text-black font-bold px-5">Giới tính:</h5>
            <p className="text-black">{Object(userTeacher).userTeacher.gender}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className="text-black font-bold px-5">Khoa ngành:</h5>
            <p className="text-black">{Object(userTeacher).userTeacher.nameScienceBranch}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className="text-black font-bold px-5">Chức vụ:</h5>
            <p className="text-black">{Object(userTeacher).userTeacher.position}</p>
          </div>
        </div>
        <div className="boxfooter flex items-end justify-end p-5">
          <button onClick={Logout} type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Đăng xuất</button>
        </div>
      </div>
    </main>
  );
}
export default ShowProfile;