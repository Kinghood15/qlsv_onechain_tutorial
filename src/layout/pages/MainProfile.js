// import '../css/dashboard.css';
import Header from './Header';
import FooterAdmin from './FooterAdmin';
import SidebarNavigationMenu from './SidebarNavigationMenu';
// import MainContainer from './MainContainerDashboard';
import ShowProfile from '../ShowProfile';
import EditProfile from '../EditProfile';
import { useState, useEffect } from 'react';
import '../css/mainpages.css';
export default function MainProfile(page) {
    const [isTable, setIsTable] = useState(false)
    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 1200) {
            setIsTable(true)

        } else {
            setIsTable(false)
        }
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResizeMobile = () => {
        if (window.innerWidth < 860) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResizeMobile);
        if (Screen.prototype.availWidth < 860) {
            setIsMobile(true);
        };
    })
    const [isCheckMenu, setIsCheckMenu] = useState();
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
    const callbackFunction = (childData) => {
        // console.log("childData === {}",childData === {})
        if (childData.email !== "") {
            console.log("childData", childData);
            setIsUserTeacher(childData);
            console.log("isUserTeacher in main profile",isUserTeacher); 
        }
    }

    return (
        <>
            <Header parentCallback={callbackFunction} />
            <div className={isMobile ? "maincontainer block m-auto pt-20 pb-10 h-[calc(100vh-14px-60px)]" : "maincontainer m-auto flex pt-20 pb-10  h-[calc(100vh-14px-60px)]"}>
                <div className={isMobile ? "mainContainer block" : (isCheckMenu ? "container sm  m-8 mx-auto ease-in" : "container sm m-8 mx-auto ease")}>
                    {/* <MainContainer /> */}
                    {(() => {
                        if (Object(page).page === 'ShowUser') {
                            return (
                                <>
                                    <ShowProfile userTeacher={isUserTeacher} />
                                </>
                            );
                        }
                        else if (Object(page).page === 'EditUser') {
                            return (
                                <>
                                    <EditProfile userTeacher={isUserTeacher} />
                                </>
                            )
                        }
                    })()}
                </div>
            </div>
            <FooterAdmin />
        </>
    );
}; 
