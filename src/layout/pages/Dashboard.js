// import '../css/dashboard.css';
import Header from './Header';
import Footer from './Footer';
import SidebarNavigationMenu from './SidebarNavigationMenu';
import MainContainer from './MainContainer';
import { useState, useEffect} from 'react';
import '../css/dashboard.css';
export default function Dashboard(){
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
    const [ isCheckMenu, setIsCheckMenu ] = useState();
    const callbackFunction = (childData) => {
        setIsCheckMenu(childData);
    }
    // console.log("isCheckMenu",isCheckMenu);
    return (
        <>
            <Header />
            <div className={isMobile ? "maincontainer block" :"maincontainer flex"}>
                <div className="sidebar">
                {(() => { 
                    if(isMobile){
                        return;
                    }else{
                        return <SidebarNavigationMenu isMobile={isTable} isShowSidebar="" parentCallback={callbackFunction} />
                    }
                })()}
                </div>
                <div className={isMobile ? "mainContainer block" : (isCheckMenu ? "container sm w-11/12 ease-in" :"container sm w-10/12 ease")}>
                    <MainContainer />
                </div>
                
            </div>
            <Footer />
        </>

    );
}; 
