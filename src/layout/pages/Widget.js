import { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineFall } from "react-icons/ai";
export default function Widget(){
    // const [isWidget, setIsWidget] = useState(false)
    //     //choose the screen size 
    //     const handleResize = () => {
    //         if (window.innerWidth < 1200) {
    //             setIsWidget(true)
               
    //         } else {
    //             setIsWidget(false)
    //         }
    //     }
    //     // console.log(isMobile);
    
    //     // create an event listener
    //     useEffect(() => {
    //         window.addEventListener("resize", handleResize)
    //     })
    const [ upAndDown, setUpAndDown ] = useState({
        name:'Fail',
        color:'red',
        icon:<AiOutlineFall />
    })
    const handleWidgetUpDown = () => {
        setUpAndDown()
    }
        // name:'Success',
        // color:'green',
        // icon: <AiOutlineRise />
    return(
        <div className={"widget-item flex justify-between flex-1 p-5 shadow-gray-600 rounded-lg h-40 bg-sky-500 m-2"}>
            <div className="widget-item-left flex flex-col justify-between">
                <span className="title text-white font-bold text-xl">Sinh viên</span>                        
                <span className="couter">21312</span>                        
                <span className="link">Xem tất cả sinh viên</span>
            </div>
            <div className="widget-item-right flex flex-col justify-between">
                <span className="percentage">20%<AiOutlineFall /></span>
                <AiOutlineUser />
            </div>
        </div>
    );
}