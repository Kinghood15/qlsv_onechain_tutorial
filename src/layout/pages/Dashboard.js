// import '../css/dashboard.css';
import Header from './Header';
import Footer from './Footer';
import SidebarNavigationMenu from './SidebarNavigationMenu';
import MainContainer from './MainContainer';
import { useState, useEffect} from 'react';
import '../css/dashboard.css';
export default function Dashboard(){
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 1000) {
            setIsMobile(true)
           
        } else {
            setIsMobile(false)
        }
    }
    // console.log(isMobile);

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
    return (
        <>
            <Header />
            <div className="maincontainer flex">
                <div className="sidebar">
                    <SidebarNavigationMenu isMobile={isMobile}/>
                </div>
                <div className="container xl">
                    <MainContainer />
                </div>
                
            </div>
            <Footer />
        </>

    );
};
