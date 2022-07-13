import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { useState, useEffect } from 'react';
export default function Footer() {
    const [isTable, setIsTable] = useState(false)
    const [isMobile1025, setIsMobile1025] = useState(false)
    const [isMobile860, setIsMobile860] = useState(false);
    const [isMobile480, setIsMobile480] = useState(false);
    const [isMobile320, setIsMobile320] = useState(false);
    
    //choose the screen size 
    const handleResize = () => {
        if (document.body.clientWidth < 1400) {
            setIsTable(true)
            if (document.body.clientWidth < 1025) {
                setIsMobile1025(true)
                if (document.body.clientWidth < 860) {
                    setIsMobile860(true);
                    if(document.body.clientWidth < 480){
                        setIsMobile480(true);
                        if(document.body.clientWidth < 320) {
                            setIsMobile320(true);
                        }else{
                            setIsMobile320(false);
                        }
                    }else{
                        setIsMobile480(false);
                    }
                } else {
                    setIsMobile860(false);
                }
            } else {
                setIsMobile1025(false)
            }
        } else {
            setIsTable(false)
        }
    }
    useEffect(() =>{
      handleResize();
      window.addEventListener("resize", handleResize);
    },[isTable,isMobile1025,isMobile860,isMobile480,isMobile320])
    return (
        <div className="footer xl bg-gray-900 w-screen absolute bottom-0">
            <div className={`footerHeader ${isMobile480 ? 'my-2 p-2' : 'my-5 p-4'}`}>
                <h1 className={`w-3/4 m-auto text-white font-bold ${isTable ? (isMobile480 ? 'text-sm' : 'text-base') : 'text-3xl'}`}>Acodern University</h1>
                <div className="w-3/4 h-15 m-auto grid grid-rows-2 grid-flow-col gap-2">
                    <p className={isTable ? (isMobile480 ? (isMobile320 ? 'text-white text-[8px]' : "text-white text-[9px]") : 'text-white text-[10px]' ) :"text-white text-base"}>Chi nhánh Hà Nội</p>
                    <p className={isTable ? (isMobile480 ? (isMobile320 ? 'text-white text-[8px]' : "text-white text-[9px]") : 'text-white text-[10px]' ) :"text-white text-base"}>SĐT :01234567809</p>
                    <p className={isTable ? (isMobile480 ? (isMobile320 ? 'text-white text-[8px]' : "text-white text-[9px]") : 'text-white text-[10px]' ) :"text-white text-base"}>Chi nhánh Đà Nẵng</p>
                    <p className={isTable ? (isMobile480 ? (isMobile320 ? 'text-white text-[8px]' : "text-white text-[9px]") : 'text-white text-[10px]' ) :"text-white text-base"}>SĐT: 023456666666</p>
                    <p className={isTable ? (isMobile480 ? (isMobile320 ? 'text-white text-[8px]' : "text-white text-[9px]") : 'text-white text-[10px]' ) :"text-white text-base"}>Chi nhánh Hà Nội</p>
                    <p className={isTable ? (isMobile480 ? (isMobile320 ? 'text-white text-[8px]' : "text-white text-[9px]") : 'text-white text-[10px]' ) :"text-white text-base"}>SDT 0355560928</p>
                </div>
            </div>
        </div>
    );
};