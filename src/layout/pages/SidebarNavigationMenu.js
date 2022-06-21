// import '../css/SidebarNavigationMenu.css';
import { FiMenu, FiHome } from "react-icons/fi";
import { FaNewspaper, FaBookReader } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SidebarNavigationMenu.css';
export default function SidebarNavigationMenu({isMobile}) {
    const menuDefaults = [{
        id: 1,
        name: 'Trang chủ',
        icon: <FiHome size={24} />,
        url: '',
    }, {
        id: 2,
        name: 'Tin tức',
        icon: <FaNewspaper size={24} />,
        url: '',
    }, {
        id: 3,
        name: 'Sinh viên',
        icon: <AiOutlineTeam size={24} />,
        url: '',    
    }, {
        id: 4,
        name: 'Môn học',
        icon: <FaBookReader size={24} />,
        url: '',
    }, {
        id: 5,
        name: 'Khoa ngành',
        icon: <MdMeetingRoom size={24} />,
        url: '',
    }, {
        id: 6,
        name: 'Lớp',
        icon: <MdMeetingRoom size={24} />,
        url: '',
    }, {
        id: 7,
        name: 'Điểm',
        icon: <GrScorecard size={24} />,
        url: '',
    }]
    const [slidebar, setSlidebar] = useState(false);
    const onClickSlidebar = () => {
        setSlidebar(!slidebar);
    }
    return (
        <>
            <div className={isMobile ? 'slidebar active w-60 mt-8 ease-in-out': ( slidebar ? 'slidebar active w-60 mt-8 ease-in-out' : 'slidebar w-60 mt-8 ease-in-out')}>
                <ul className={isMobile ? 'list-items-menu active w-full rounded-r-2xl bg-sky-300 py-2 ease-in-out' : (slidebar ? 'list-items-menu active w-full rounded-r-2xl bg-sky-300 py-2 ease-in-out' : 'list-items-menu w-full rounded-r-2xl bg-sky-300 py-2 ease-in-out')}>
                    <Tippy content='Menu' placement="right" theme="translucent">
                        <li onClick={onClickSlidebar} className={"item-menu ease-in-out active w-11/12 flex items-center justify-between h-20 my-5 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl"}>
                            <div className="icon ml-5">
                                <FiMenu size={24} />
                            </div>
                            <div className="title mr-5">Menu</div>
                        </li>
                    </Tippy>
                    {menuDefaults.map((item) => {
                        return (
                            <Link to={item.url}>
                                <Tippy content={`${item.name}`} placement="right" theme="translucent">
                                    <li className={"item-menu w-11/12 flex items-center justify-between h-20 my-5 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl"} key={item.id}>
                                        <div className="icon ml-5">
                                            {item.icon}
                                        </div>
                                        <div className="title mr-5">{item.name}</div>
                                    </li>
                                </Tippy>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};
