import Widget from './Widget';
import { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineFall } from "react-icons/ai";
import Chart from '../js/chart';
export default function MainContainer() {
    const [isWidget, setIsWidget] = useState(false)
        //choose the screen size 
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setIsWidget(true)
               
            } else {
                setIsWidget(false)
            }
        }
        const [isMobile, setIsMobile] = useState(false)
        //choose the screen size 
        const handleResizeMobile = () => {
            if (window.innerWidth < 860) {
                setIsMobile(true)
               
            } else {
                setIsMobile(false)
            }
        }
        useEffect(() => {
            // if (Screen.prototype.availWidth < 1200) {
            //     setIsWidget(true);
            // };
            // window.addEventListener("resize", handleResize);
            // window.addEventListener("resize", handleResizeMobile);
        })
    return (
        <>
            <div className="m-8 rounded-xl ml-10 bg-slate-200 p-2">
                <div className={isWidget ? "flex flex-wrap flex-col justify-between flex-1 p-5 shadow-gray-600" :"widget-lists grid gap-x-8 gap-y-4 grid-cols-4 gap-4"}>
                    <Widget />
                    <Widget />
                    <Widget />
                    {/* <Widget /> */}
                </div>
               
            </div>
            <div className="chart m-8 rounded-xl ml-10 bg-slate-200 p-2">
                <Widget />
                <Chart />
            </div>
        </>
    );
}