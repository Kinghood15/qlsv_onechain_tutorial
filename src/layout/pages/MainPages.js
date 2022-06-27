// import '../css/dashboard.css';
import Header from './Header';
import FooterAdmin from './FooterAdmin';
import SidebarNavigationMenu from './SidebarNavigationMenu';
// import MainContainer from './MainContainerDashboard';
import List from './List';
import NewUser from './NewUser';
import { useState, useEffect } from 'react';
import '../css/mainpages.css';
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
    // console.log("Object(accesstoken)",Object(accesstoken));
    // console.log("Object(page)",Object(page));
    return (
        <>
            {(() => {
                if (Object(accesstoken).accesstoken === true) {
                    return (
                        <>
                            <Header accesstoken={true} />
                            <div className={isMobile ? "maincontainer block w-11/12 pt-20 pb-10 h-[80%]" : "maincontainer w-11/12 flex pt-20 pb-10"}>
                                <div className="sidebar">
                                    {(() => {
                                        if (isMobile) {
                                            return;
                                        } else {
                                            return <SidebarNavigationMenu isMobile={isTable} isShowSidebar="" parentCallback={callbackFunction} />
                                        }
                                    })()}
                                </div>
                                <div className={isMobile ? "mainContainer block" : (isCheckMenu ? "container sm w-11/12 m-8 ease-in" : "container sm w-10/12 m-8 ease")}>
                                    {/* <MainContainer /> */}
                                    {(() => {
                                        // console.log("page loaded", page);
                                        if(Object(accesstoken).page==='List'){
                                            return(
                                                <>
                                                    <List />
                                                </>
                                            );
                                        }
                                        else if(Object(accesstoken).page==='NewUser'){
                                            return (
                                                <>
                                                    <NewUser />
                                                </>
                                            )
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
