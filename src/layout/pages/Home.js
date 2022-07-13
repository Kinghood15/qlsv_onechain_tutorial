import '../css/home.css';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCopyright } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';
import {useState,useEffect} from 'react';
export default function Home(accesstoken) {
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
        <>
            {(() => {
                if (Object(accesstoken).accesstoken === true) {
                    return (
                        <main>
                            <Header />
                            <div className="max-w-[100vw] max-h-[90vh] mt-8">
                                <div className={`${isMobile860 ? 'w-[90vw] h-[60vh]' : 'h-[70vh]'} banner my-5 relative`}>
                                    {/* <img src={"../../img/college_student.png"} alt="" /> */}
                                    <h1 className={`w-3/4 bg-white p-3 rounded-lg font-bold text-black-400 drop-shadow-2xl absolute left-10 bottom-10 text-justify ${isMobile860 ? (isMobile480 ? 'text-base' : 'text-xl') : 'text-3xl'}`}>Chào mừng bạn đến với trường đại học Acodern. Dành cho những học sinh, sinh viên mọi nơi trên thế giới có niềm đam mê với lập trình</h1>
                                </div>
                            </div>
                            <Footer />
                        </main>
                    );
                } else {
                    return (
                        <main>
                            <Header />
                            <div className=" m-auto my-24">
                                <div className="banner my-5 relative">
                                    <img src="../../img/college_student.png" alt="Student" />
                                    <h1 className="w-3/4 font-bold text-3xl text-black-400 drop-shadow-2xl absolute left-10 bottom-10 text-justify ">Chào mừng bạn đến với trường đại học Acodern. Dành cho những học sinh, sinh viên mọi nơi trên thế giới có niềm đam mê với lập trình</h1>
                                </div>
                            </div>
                            <Footer />
                        </main>
                    );
                }
            })()}
        </>
    )
}