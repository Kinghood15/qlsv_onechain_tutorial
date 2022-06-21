import { MdNotifications } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import an from '../../img/an.jpg'
export default function Header() {
    return (
        <div className="header 2xl h-20 bg-sky-500 flex justify-between block">
            <div className="boxLogo w-80 h-full flex items-center justify-start">
                <a className="text-white w-full text-center text-2xl font-bold" href="/">Quản lý sinh viên </a>
            </div>
            <div className="boxNotification w-65 flex justify-end mr-5 items-center">
                {/* <button href="/login" className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Đăng nhập</button> */}
                {/* <button href="/contract" className="w-40 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">Liên hệ</button> */}
                <button href="/notification" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><MdNotifications size={28} /></button>
                {/* <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><MdPerson size={28} /></button> */}
                <button href="/profile" className="w-12 h-12 flex m-2 items-center justify-center bg-white rounded-full hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 drop-shadow-md"><img className="rounded-full w-11 h-11" src={an} alt="user" /></button>
            </div>
        </div>
    )
};