import "./css/showprofile.css";
import { UserAuth } from './Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from "react";
import { AiFillSetting } from "react-icons/ai";
const ShowProfile = (userTeacher) => {
  useEffect(() => {
  },[])
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
  const EditProfile  = () => {
    try {
        navigate('/giao-vien/thong-tin-ca-nhan/chinh-sua-thong-tin-ca-nhan')
    } catch (error) {
      console.log("Error navigate to edit failed",error.message)
    }
  }
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
                  if(document.body.clientWidth < 480){
                      setIsMobile480(true);
                      if(document.body.clientWidth < 320) {
                          setIsMobile320(true);
                      }else{
                          setIsMobile320(false);
                      }
                  }else{
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
  useEffect(() =>{
    handleResize();
    window.addEventListener("resize", handleResize);
  },[])
  return (
    <main className={`w-full`}>
      <div className="bg-white w-full m-auto flex-1 rounded-lg">
        <div className={`boxheaderProfile ${isMobile1025 ? '' :'flex justify-space-between relative'} h-40 rounded-lg `}>
          <div className={`BoxAvatarProfile relative h-full ${isMobile1025 ? 'w-full' : 'w-[30%]'} shadow-inner`}>
            <div className={`${isMobile480 ? 'w-28 h-28':  'w-56 h-56'} bg-white rounded-full  ${isMobile1025 ? 'mx-auto' : 'top-1/3 absolute right-1'} flex items-center justify-center`}>
              <img className={`${isMobile480 ? 'w-24 h-24':  'w-56 h-56'}  bg-red rounded-full`} src={Object(userTeacher).userTeacher.avatar} />
            </div>
          </div>
          <div className={`BoxName ${isMobile1025 ? (isMobile480 ? 'w-full my-1 mt-1' :  'w-full my-5 mt-12') : 'w-[50%]'} flex justify-start items-end py-5`}>
            <p className={`${isMobile1025 ? 'text-black w-full text-center' : 'text-white'} font-bold ${isMobile480 ? 'text-xl' :'text-3xl'}`}>{Object(userTeacher).userTeacher.firstName + " " + Object(userTeacher).userTeacher.lastName}</p>
          </div>
          <div className={`BoxSettings w-[20%] ${isMobile1025 ? 'hidden' : 'block'}`}>
            <button onClick={EditProfile} type="button" className="px-6 py-2.5 bg-white text-blue font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white-300 hover:shadow-lg focus:bg-black focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Chỉnh sửa thông tin cá nhân</button>
          </div>
        </div>
        <div className={`boxcontainer ${isMobile480 ? 'mt-14 p-2' : 'mt-32 p-5'} `}>
          <div className={`flex justify-space-between p-2`}>
            <h5 className={`${isMobile480 ? 'px-3 text-sm' : 'px-5 text-xl'} text-black font-bold `}>Ngày sinh :</h5>
            <p className={`${isMobile480 ? 'text-sm' :'' } 'text-black'`}>{Object(userTeacher).userTeacher.birthday}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className={`${isMobile480 ? 'px-3 text-sm' : 'px-5 text-xl'} text-black font-bold `}>Email:</h5>
            <p className={`${isMobile480 ? 'text-sm' :'' } 'text-black'`}>{Object(userTeacher).userTeacher.email}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className={`${isMobile480 ? 'px-3 text-sm' : 'px-5 text-xl'} text-black font-bold `}>Giới tính:</h5>
            <p className={`${isMobile480 ? 'text-sm' :'' } 'text-black'`}>{Object(userTeacher).userTeacher.gender}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className={`${isMobile480 ? 'px-3 text-sm' : 'px-5 text-xl'} text-black font-bold `}>Khoa ngành:</h5>
            <p className={`${isMobile480 ? 'text-sm' :'' } 'text-black'`}>{Object(userTeacher).userTeacher.nameScienceBranch}</p>
          </div>
          <div className="flex justify-space-between p-2">
            <h5 className={`${isMobile480 ? 'px-3 text-sm' : 'px-5 text-xl'} text-black font-bold `}>Chức vụ:</h5>
            <p className={`${isMobile480 ? 'text-sm' :'' } 'text-black'`}>{Object(userTeacher).userTeacher.position}</p>
          </div>
        </div>
        <div className="boxfooter flex items-end justify-end p-5">
          {(() => {
            if(isMobile1025){
              return(
                <button onClick={EditProfile} type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">{isMobile480 ? <AiFillSetting size={15} /> : 'Chỉnh sửa thông tin cá nhân'}</button>
              );
            }
          })()}
          <button onClick={Logout} type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Đăng xuất</button>
        </div>
      </div>
    </main>
  );
}
export default ShowProfile;