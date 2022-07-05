import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { useState, useEffect } from 'react';
import '../css/footer.css';
export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);
    const [ isResizeHeight, setIsResizeHeight ] = useState(false);
    //choose the screen size 
    const handleResizeMobile = () => {
        if (window.innerWidth < 860) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }

    }
    //choose the screen size 
    const handleResizeHeight = () => {
        const pageHeight = document.documentElement.scrollHeight;
        // console.log("pageHeight",pageHeight);
        // console.log("window.innerHeight",window.innerHeight);
        // console.log("Screen.prototype.availHeight",Screen.prototype.availHeight);
        if (window.innerHeight < pageHeight) {
            setIsResizeHeight(true)
        } else {
            setIsResizeHeight(false)
        }

    }
    // create an event listener
    useEffect(() => {
        // window.addEventListener("resize", handleResizeMobile);
        // window.addEventListener("resize", handleResizeHeight);
        // // handleResizeHeight();
        // // console.log("handleResizeHeight",handleResizeHeight);
        // if (Screen.prototype.availWidth < 860) {
        //     setIsMobile(true);
        // };
        // if(Screen.prototype.availHeight < 900){
        //     setIsResizeHeight(true);
        // };
    })
    return (
        // <div className="footer xl bg-gray-900 w-full h-58 fixed bottom-0 left-0">
        //     <div className="footerFooter w-3/4 mx-auto p-5 text-center border-top-1">
        //         <span className="text-white text-sm flex justify-center">Copyright <AiOutlineCopyrightCircle size={10} /> An Alex Nguyễn </span>
        //     </div>
        // </div>
        <div className={isResizeHeight ?  "footer bg-gray-900 xl max-w-[100vw] mt-3 relative " : "footer bg-gray-900 xl max-w-[100vw] mt-3 relative bottom-0 "}>
            <div className="footerFooter w-3/4 mx-auto p-5 text-center border-top-1 text-white">
                <span className="text-white text-sm flex justify-center">Copyright <AiOutlineCopyrightCircle size={10} /> An Alex Nguyễn </span>
            </div>
        </div>
    );
};