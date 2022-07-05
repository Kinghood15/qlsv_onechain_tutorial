// import '../css/dashboard.css';
import Header from './Header';
import FooterAdmin from './FooterAdmin';
import SidebarNavigationMenu from './SidebarNavigationMenu';
// import MainContainer from './MainContainerDashboard';
import List from './List';
import NewUser from './NewUser';
import { useState, useEffect } from 'react';
import '../css/mainpages.css';
export default function MainPages(page) {
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
    const callbackFunction = (childData) => {
        setIsCheckMenu(childData);
    }

    return (
        <>
            <Header accesstoken={true} />
            <div className={isMobile ? "maincontainer w-screen block pt-20 pb-10 h-[calc(100vh-14px-60px)]" : "maincontainer w-screen flex pt-20 pb-10  min-h-[calc(100vh-14px-60px)]"}>
                <div className="sidebar">
                    {(() => {
                        if (isMobile) {
                            return;
                        } else {
                            return <SidebarNavigationMenu isMobile={isTable} isShowSidebar="" parentCallback={callbackFunction} />
                        }
                    })()}
                </div>
                <div className={isMobile ? "mainContainer block" : (isCheckMenu ? "container sm m-8 ease-in" : "container sm m-8 ease")}>
                    {/* <MainContainer /> */}
                    {(() => {
                        if (Object(page).page === 'List'){
                            return (
                                <>
                                    <List />
                                </>
                            );
                        }
                        else if (Object(page).page === 'NewUser') {
                            return (
                                <>
                                    <NewUser />
                                </>
                            )
                        }
                    })()}
                </div>
            </div>
            {/* <FooterAdmin /> */}
        </>
    );
}; 
