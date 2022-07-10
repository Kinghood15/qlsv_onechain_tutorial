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
        if (document.body.clientWidth < 1400) {
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
        if (document.body.clientWidth < 860) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }
    }

    // create an event listener
    useEffect(() => {
        // window.addEventListener("resize", handleResizeMobile);
        // if (Screen.prototype.availWidth < 860) {
        //     setIsMobile(true);
        // };
        handleResize();
        handleResizeMobile();   

    })
    const [isCheckMenu, setIsCheckMenu] = useState();
    const callbackFunction = (childData) => {
        setIsCheckMenu(childData);
    }

    return (
        <>
            <Header />
            <div className={isMobile ? "maincontainer max-w-[100vw] block pb-10" : "maincontainer w-screen flex pb-10  min-h-[calc(100vh-14px-60px)]"}>
                <div className="sidebar">
                    {(() => {
                        if (isMobile) {
                            return;
                        } else {
                            return <SidebarNavigationMenu isMobile={isTable} parentCallback={callbackFunction} />
                        }
                    })()}
                </div>
                <div className={isTable ? "mainContainer block w-screen m-8 ease-in w-[calc(100vw-32px-32px)]" : (isCheckMenu ? "m-8 ease-in" : "m-8 ease")}>
                    {/* <MainContainer /> */}
                    {(() => {
                        if (Object(page).page === 'List'){
                            if(isMobile){
                                return (
                                    <>
                                        <List isMobile={isMobile} />
                                    </>
                                );
                            }else{
                                return (
                                    <>
                                        <List />
                                    </>
                                );
                            }
                            
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
