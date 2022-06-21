import { useState,useEffect } from "react";
// import "./App.css";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { UserData } from "./data";

function Chart() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 1200) {
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
        <div className="App">
            <div className={isMobile ? "md max-w-2xl" : " md"}>
                <BarChart chartData={userData} />
            </div>
            <div className={isMobile ? "md max-w-2xl" : " md"}>
                <LineChart chartData={userData} />
            </div>
            <div className={isMobile ? "md max-w-2xl" : " md"}>
                <PieChart chartData={userData} />
            </div>
        </div>
    );
}

export default Chart;