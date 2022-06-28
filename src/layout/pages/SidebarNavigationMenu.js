// import '../css/SidebarNavigationMenu.css';
import { FiMenu, FiHome } from "react-icons/fi";
import { FaNewspaper, FaBookReader } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/SidebarNavigationMenu.css';
export default function SidebarNavigationMenu(props, isMobile, isShowSidebar) {
    const menuDefaults = [{
        id: 1,
        name: 'Trang chủ',
        icon: <FiHome size={24} />,
        url: 'tong-quan',
    }, {
        id: 2,
        name: 'Tin tức',
        icon: <FaNewspaper size={24} />,
        url: 'tin-tuc',
    }, {
        id: 3,
        name: 'Sinh viên',
        icon: <AiOutlineTeam size={24} />,
        url: 'sinh-vien',
    }, {
        id: 4,
        name: 'Môn học',
        icon: <FaBookReader size={24} />,
        url: 'mon',
    }, {
        id: 5,
        name: 'Khoa ngành',
        icon: <MdMeetingRoom size={24} />,
        url: 'khoa',
    }, {
        id: 6,
        name: 'Lớp',
        icon: <MdMeetingRoom size={24} />,
        url: 'lop',
    }, {
        id: 7,
        name: 'Điểm',
        icon: <GrScorecard size={24} />,
        url: 'diem',
    }]
    const [slidebar, setSlidebar] = useState(false);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(1);

    const onClickSlidebar = () => {
        setSlidebar(!slidebar);
    }
    props.parentCallback(slidebar);
    // console.log("slidebar",slidebar)
    useEffect(() => {
        menuDefaults.map((item) => {
            const linkLocation = location.pathname.split('/')[1];
            // console.log("linkLocation",linkLocation);
            if (linkLocation === item.url) {
                setActiveTab(item.id);
            }
        });
    })
    return (
        <>
            {(() => {
                if (props.isShowSidebar === true && props.isMobile === true) {
                    return (
                        <>
                            <div className="slidebar absolute top-20 left-0">
                                <ul className="list-items-menu bg-sky-300 rounded-r-2xl py-1">
                                    {menuDefaults.map((item) => {
                                        console.log()
                                        return (
                                            <Link to={item.url}>
                                                {/* <Tippy content={`${item.name}`} placement="right" theme="translucent"> */}
                                                <li className={(activeTab === item.id) ? "item-menu active w-11/12 flex items-center justify-between h-16 my-2 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl" : "item-menu w-11/12 flex items-center justify-between h-16 my-2 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl"} key={item.id}>
                                                    <div className="icon mx-5">
                                                        {item.icon}
                                                    </div>
                                                    <div className="title mr-5 w-20">{item.name}</div>
                                                </li>
                                                {/* </Tippy> */}
                                            </Link>
                                        )
                                    })}
                                </ul>
                            </div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <div className={props.isMobile ? 'slidebar active w-60 mt-8 ease-in-out' : (slidebar ? 'slidebar active w-60 mt-8 ease-in-out' : 'slidebar w-60 mt-8 ease-in-out')}>
                                <ul className={props.isMobile ? 'list-items-menu active w-full rounded-r-2xl bg-sky-300 py-2 ease-in-out' : (slidebar ? 'list-items-menu active w-full rounded-r-2xl bg-sky-300 py-2 ease-in-out' : 'list-items-menu w-full rounded-r-2xl bg-sky-300 py-2 ease-in-out')}>
                                    <Tippy content='Menu' placement="right" theme="translucent">
                                        <li onClick={onClickSlidebar} className={"item-menu ease-in-out active w-11/12 flex items-center justify-between h-16 my-5 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl"}>
                                            <div className="icon ml-5 ">
                                                <FiMenu size={24} />
                                            </div>
                                            <div className="title mr-5">Menu</div>
                                        </li>
                                    </Tippy>
                                    {menuDefaults.map((item) => {
                                        return (
                                            <Link to={item.url}>
                                                <Tippy content={`${item.name}`} placement="right" theme="translucent">
                                                    <li className={(activeTab === item.id) ? "item-menu active w-11/12 flex items-center justify-between h-16 my-2 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl" : "item-menu w-11/12 flex items-center justify-between h-16 my-2 transition duration-150 ease-out md:ease-in  hover:border-white hover:bg-white rounded-r-xl"} key={item.id}>
                                                        <div className="icon mx-5">
                                                            {item.icon}
                                                        </div>
                                                        <div className="title mr-5 w-20">{item.name}</div>
                                                    </li>
                                                </Tippy>
                                            </Link>
                                        )
                                    })}
                                </ul>
                            </div>
                        </>
                    )
                }
            })()}
        </>
    );
};
