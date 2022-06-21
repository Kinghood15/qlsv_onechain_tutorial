import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { useState, useEffect } from 'react';
export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);
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
    return (
        <div className="footer xl bg-gray-900 w-full h-58">
            <div className="footerHeader mt-5 p-4">
                <h1 className="w-3/4 m-auto text-white font-bold text-3xl">Acodern University</h1>
                <div className="w-3/4 h-15 m-auto grid grid-rows-2 grid-flow-col gap-2">
                    <p className={isMobile ? "text-white text-xs" :"text-white"}>Chi nhánh Hà Nội</p>
                    <p className={isMobile ? "text-white text-xs" :"text-white"}>SĐT :01234567809</p>
                    <p className={isMobile ? "text-white text-xs" :"text-white"}>Chi nhánh Đà Nẵng</p>
                    <p className={isMobile ? "text-white text-xs" :"text-white"}>SĐT: 023456666666</p>
                    <p className={isMobile ? "text-white text-xs" :"text-white"}>Chi nhánh Hà Nội</p>
                    <p className={isMobile ? "text-white text-xs" :"text-white"}>SDT 0355560928</p>
                </div>
            </div>
            <div className="footerFooter w-3/4 mx-auto p-5 text-center border-top-1">
                <span className="text-white text-sm flex justify-center">Copyright <AiOutlineCopyrightCircle size={10} /> An Alex Nguyễn </span>
            </div>
        </div>
    );
};