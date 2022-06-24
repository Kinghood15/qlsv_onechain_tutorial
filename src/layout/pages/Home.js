import '../css/home.css';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCopyright } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';
export default function Home(accesstoken) {
    // const [Foutt]
    console.log("accesstoken Home :",accesstoken);
    return (
        <>
            {(() => {
                console.log("accesstoken home before if:",accesstoken);
                if (accesstoken === true) {
                    console.log("accesstoken home after if check");
                    return (
                        <main>
                            <Header accesstoken={true}/>
                            <div className="container m-auto my-5">
                                <div className="banner my-5 relative">
                                    <img src="../../img/college_student.png" alt="Student" />
                                    <h1 className="w-3/4 font-bold text-3xl text-black-400 drop-shadow-2xl absolute left-10 bottom-10 text-justify ">Chào mừng bạn đến với trường đại học Acodern. Dành cho những học sinh, sinh viên mọi nơi trên thế giới có niềm đam mê với lập trình</h1>
                                </div>
                            </div>
                            <Footer />
                        </main>
                    );
                    
                } else {
                    return (
                        <main>
                            <Header accesstoken={false} />
                            <div className="container m-auto my-5">
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