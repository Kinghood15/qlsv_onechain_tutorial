// import '../css/dashboard.css';
import Header from './Header';
import FooterAdmin from './FooterAdmin';
import SidebarNavigationMenu from './SidebarNavigationMenu';
// import MainContainer from './MainContainerDashboard';
import List from './List';
import { useState, useEffect } from 'react';
import '../css/dashboard.css';
export default function MainPages(accesstoken,page) {
    const [isTable, setIsTable] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 1200) {
            setIsTable(true)

        } else {
            setIsTable(false)
        }
    }
    // console.log(isTable);

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
    // console.log(isTable);

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
    // console.log("isCheckMenu",isCheckMenu);
    return (
        <>
            {(() => {
                if (Object(accesstoken).accesstoken === true) {
                    return (
                        <>
                            <Header accesstoken={true} />
                            <div className={isMobile ? "maincontainer block pt-20 pb-10 h-[80%]" : "maincontainer flex pt-20 pb-10"}>
                                <div className="sidebar">
                                    {(() => {
                                        if (isMobile) {
                                            return;
                                        } else {
                                            return <SidebarNavigationMenu isMobile={isTable} isShowSidebar="" parentCallback={callbackFunction} />
                                        }
                                    })()}
                                </div>
                                <div className={isMobile ? "mainContainer block" : (isCheckMenu ? "container sm w-11/12 ease-in" : "container sm w-10/12 ease")}>
                                    {/* <MainContainer /> */}
                                    {(() => {
                                        console.log("page loaded", Object(page));
                                        if(Object(page).page==='List'){
                                            return(
                                                <>
                                                    <List />
                                                </>
                                            );
                                        }
                                    })()}
                                </div>
                            </div>
                            <FooterAdmin />
                        </>
                    );
                }
            })()}
        </>
    );
}; 
