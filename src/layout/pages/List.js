import { doc, setDoc, addDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase";
// import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './layout/env';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import UserDataService from '../services/Users.services'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NewUser from './NewUser';
import Dropdown from '../js/Dropdown';
import Filter from "../Filter";
import "../css/List.css";
import { AiOutlineFilter } from "react-icons/ai";

export default function List() {
    const [isActive, setIsActive] = useState(false);
    const [isData, setIsData] = useState([]);
    const [isOpenModalView, setIsOpenModalView] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        getUsers();
        getUsersStudent();
        RefeshStudent();
    }, []);

    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        setIsData(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    const getUserId = async (id) => {
        try {
            const docSnap = await UserDataService.getUser(id);
            if (docSnap.exists()) {
                setIsModalData({ ...docSnap.data(), "id": id });
                setIsOpenModalEdit(true);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }
    const deleteHandler = (id) => {
        confirmAlert({
            title: 'X??a',
            message: 'B???n c?? ch???c ch???n mu???n x??a ng?????i d??ng n??y kh??ng ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await UserDataService.deleteUser(id);
                        getUsers();

                    }
                },
                {
                    label: 'No',
                    onClick: () => true
                }
            ]
        })
    };

    const [isModalData, setIsModalData] = useState();
    // }
    const viewUserId = async (id) => {
        const docSnap = await UserDataService.getUser(id);
        if (docSnap.exists()) {
            setIsModalData(docSnap.data());
            setIsOpenModalView(true);
        } else {
            console.log("No such document!");
        }
    }
    const newHandler = async () => {
        navigate('/giao-vien/sinh-vien/them-sinh-vien')
    }
    const handleChangeInputSearch = (e) => {
        setQuery(e.target.value);
    }

    const search = (data) => {
        return data.filter((user) => {
            if (query === "") {
                return user;
            } else if (user.firstName !== "" || user.lastName !== "" || user.studentId !== "") {
                if (user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query) || user.studentId.includes(query)) {
                    return user;
                }
            } else {
                return user;
            }
        });
    }
    const dataSearch = search(isData);
    //Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;
    const currentPosts = dataSearch.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumbers = [];
    const totalUsers = dataSearch.length;

    for (let i = 0; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    var paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const [pageNumberActive, setPageNumberActive] = useState(1);
    const [isFilter, setIsFilter] = useState('StudentIdAsc');
    const changeFilter = (e) => {
        e.preventDefault();
        setIsFilter(e.target.value)
        // console.log("isFilter", isFilter);
        getUsersStudent();
    }
    const RefeshStudent = () => {
        try {
            getUsersStudent();
        } catch (error) {
            console.log("Error refesh student", error);
        }
    }
    const getUsersStudent = async () => {
        // e.preventDefault();
        // setIsFilter(e.target.value)
        switch (isFilter) {
            case 'StudentIdAsc': {
                const dataList = await UserDataService.getUsersByStudentIdAsc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))

            }
            case 'StudentIdDesc': {
                const dataList = await UserDataService.getUsersByStudentIdDesc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'EmailAsc': {
                const dataList = await UserDataService.getUsersByEmailAsc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))

            }
            case 'EmailDesc': {
                const dataList = await UserDataService.getUsersByEmailDesc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'AddressAsc': {
                const dataList = await UserDataService.getUsersByAddressAsc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'AddressDesc': {
                const dataList = await UserDataService.getUsersByAddressDesc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'ScienceBranchAsc': {
                const dataList = await UserDataService.getUsersByScienceBranchAsc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'ScienceBranchDesc': {
                const dataList = await UserDataService.getUsersByScienceBranchDesc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'NameClassAsc': {
                const dataList = await UserDataService.getUsersByNameClassAsc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'NameClassDesc': {
                const dataList = await UserDataService.getUsersByNameClassDesc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'GenderMale': {
                const dataList = await UserDataService.getUsersByGenderMale();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            case 'GenderFemale': {
                const dataList = await UserDataService.getUsersByGenderFemale();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
            }
            default: {
                const dataList = await UserDataService.getUsersByStudentIdAsc();
                return setIsData(dataList.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
            }
        }

    }
    useEffect(() => {
        getUsersStudent();
    },[]);
    const [toggleState, setToggleState] = useState(1);
    const handleClickOpenFilter = () => {
        try {
            setIsOpenFilter(!isOpenFilter);
        } catch (error) {
            console.log(error);
        }
    }
    const callbackFunction = (childData) => {
        // console.log("childData === {}",childData === {})
        // if (childData) {
            
            setIsData(childData);
            // console.log("isUserTeacher in main profile",isUserTeacher); 
        // }
    }
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

    useEffect(() => {
        // window.addEventListener("reload",handleResize());
        handleResize();
        window.addEventListener("resize",handleResize());
        // handleResizeWindowInnerWidth();
    },[isMobile320,isMobile480,isMobile860,isMobile1025,isTable])
    return (
        <main className="relative">
            {/* <pre>{JSON.stringify(isData,undefined,2)}</pre> */}
            <div className={`bg-white flex-1 rounded-xl ${isTable ? (isMobile860 ? "w-[calc(100vw-32px-32px)] " :"w-[calc(100vw-80px-32px-32px)] ") : "w-[calc(100vw-240px-32px-32px)] "}`} >
                <div className="headertable p-5 flex justify-between">
                    <div className="headertable-left">
                        <h1 className={`text-black font-bold ${isMobile320 ? 'text-lg' : 'text-xl'}`}>Sinh vi??n</h1>
                    </div>
                    {/* Button create new user */}
                    <div className="headertable-right">
                        <button onClick={newHandler} className={`rounded-full bg-sky-300  ${isMobile320 ? 'px-4  py-2' : 'px-6 py-3'}`}><AiOutlinePlusCircle size={`${isMobile320 ? 15 : 24}`} /></button>
                    </div>
                </div>
                <div className="bodytable">
                    <div className={`functiontable px-5 ${isMobile860 ? '' :'flex justify-between'}`}>
                        <div className={`functiontable-left flex`}>
                            <label className={`relative block ${isMobile860 ? 'w-full py-3 ' : 'w-56'}  z-0`} >
                                <span className="sr-only">Search</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    {/* <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg> */}
                                    <AiOutlineSearch size={24} />
                                </span>
                                <input onChange={handleChangeInputSearch} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" />
                            </label>
                            {/* <button className="rounded-full h-10 text-center text-white bg-sky-300 w-36 mx-5 font-bold">T??m ki???m</button> */}
                        </div>

                        <div className={`functiontable-right ${isMobile860 ? '' : 'flex justify-around'}`}>
                            {/* <div className="mb-10 xl:w-96"> */}
                            <div className={` ${isMobile860 ?'w-full text-center my-3' :'mx-5'} `}>
                                <button onClick={handleClickOpenFilter} className={`${isMobile860 ? 'w-full' : 'w-16'}  h-8 flex text-center items-center bg-sky-400 text-white font-bold justify-center p-1 rounded-lg`}><AiOutlineFilter />L???c</button>
                            </div>
                            <label className="w-48 flex text-center items-center form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch"><AiOutlineFilter />S???p x???p :</label>
                            <select name="filter" id="filter" onClick={changeFilter} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Filter">
                                <option name="filter" value='StudentIdAsc'>M?? sinh vi??n t??ng d???n </option>
                                <option name="filter" value='StudentIdDesc'>M?? sinh vi??n gi???m d???n </option>
                                {isTable === false && <option name="filter" value='EmailAsc'>Email sinh vi??n t??ng d???n </option>}
                                {isTable === false && <option name="filter" value='EmailDesc'>Email sinh vi??n gi???m d???n </option>}
                                <option name="filter" value='ScienceBranchAsc'>Khoa sinh vi??n t??ng d???n </option>
                                <option name="filter" value='ScienceBranchDesc'>Khoa sinh vi??n gi???m d???n </option>
                                <option name="filter" value='NameClassAsc'>L???p sinh vi??n t??ng d???n </option>
                                <option name="filter" value='NameClassDesc'>L???p sinh vi??n gi???m d???n </option>
                            </select>
                            {/* </div> */}
                        </div>
                    </div>
                    {(() => {
                        if (isMobile1025) {
                            return (
                                <div className={isTable ? (isMobile1025 ? 'p-3 grid grid-cols-1 gap-3 min-h-[50vh]' : 'p-3 grid grid-cols-2 gap-3 min-h-[50vh]') : `p-3 grid grid-cols-3 gap-3 m-8 min-h-[50vh]`} >
                                    {
                                        currentPosts.length > 0 && currentPosts.map((doc, index) => {
                                            return (
                                                <>
                                                    <div className="card">
                                                        <div className="flex justify-center">
                                                            <div className={`flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg h-auto ${isMobile1025 ? (isMobile480 ? 'w-full items-center' :'w-full ')  : 'w-96'}`} key={index}>
                                                                <img className=" w-28 h-28 object-cover p-3 rounded-lg" src={doc.avatar} alt="" />
                                                                <div className={`${isMobile1025 ? 'w-full' : 'w-72'} p-3 flex flex-col justify-start`}>
                                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{doc.firstName + " " + doc.lastName}</h5>
                                                                    <p className="text-gray-700 text-base mb-2">M?? sinh vi??n: {doc.studentId}</p>
                                                                    <p className="text-gray-700 text-base mb-2">L???p : {doc.nameClass}</p>
                                                                    <p className="text-gray-700 text-base mb-2">Khoa : {doc.scienceBranch}</p>
                                                                    {/* <p className="text-gray-600 text-xs">Last updated 3 mins ago</p> */}
                                                                    {(() => {
                                                                        if (!isMobile1025) {
                                                                            return (
                                                                                <div className="cardFooter">
                                                                                    <div className="content-table flex justify-around items-around">
                                                                                        <button className="p-3 rounded-xl text-center bg-sky-200 flex items-center justify-center" onClick={() => viewUserId(doc.id)}><AiOutlineEye size={20} /></button>
                                                                                        <button className="p-3 rounded-xl text-center bg-sky-200 flex items-center justify-center" onClick={() => getUserId(doc.id)}><AiOutlineEdit size={20} /></button>
                                                                                        <button className="p-3 rounded-xl text-center bg-red-200 flex items-center justify-center" onClick={() => deleteHandler(doc.id)}><AiOutlineDelete size={20} /></button>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })()}
                                                                </div>
                                                                {(() => {
                                                                        if (isMobile1025) {
                                                                            return (
                                                                                <div className={`cardFooter ${isMobile480 ? 'w-full' : ''}`}>
                                                                                    <div className={`content-table flex grid grid-row-1 gap-2 p-3`}>
                                                                                        <button className="p-3 rounded-xl bg-sky-200 text-center flex items-center justify-center" onClick={() => viewUserId(doc.id)}><AiOutlineEye size={20} /></button>
                                                                                        <button className="p-3 rounded-xl bg-sky-200 text-center flex items-center justify-center" onClick={() => getUserId(doc.id)}><AiOutlineEdit size={20} /></button>
                                                                                        <button className="p-3 rounded-xl bg-red-200 text-center flex items-center justify-center" onClick={() => deleteHandler(doc.id)}><AiOutlineDelete size={20} /></button>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        isOpenModalView && <Modal modal={"view"} data={isModalData} closeModal={setIsOpenModalView} />
                                                    }
                                                    {
                                                        isOpenModalEdit && <Modal modal={"edit"} data={isModalData} closeModal={setIsOpenModalEdit} />
                                                    }

                                                </>
                                            );
                                        })

                                    }
                                    {(() => {
                                        if(pageNumbers.length === 2) {
                                            return(
                                                <div className="tab-footer">
                                                    <div className={`${isMobile480 ? 'p-3 ' : 'p-5 '}`}>
                                                        <div className="h-20 mx-auto px-4">
                                                            <nav className="h-20 flex flex-row flex-nowrap justify-center md:justify-center items-center" aria-label="Pagination">
                                                                {pageNumbers.map((number) => {
                                                                    if (number + 1 < pageNumbers.length) {
                                                                        return (
                                                                            <button key={number + 1} onClick={() => { paginate(number + 1); setPageNumberActive(number + 1) }} className={`md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 ${isMobile860 ? 'block' :'hidden'}` + `${pageNumberActive === number + 1 ? " bg-sky-300" : ""}`} title={`Page ${number + 1}`}>
                                                                                {number + 1}
                                                                            </button>
                                                                        );
                                                                    }
                                                                })}
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }else{
                                            return(
                                                <div className="tab-footer">
                                                    <div className={`${isMobile480 ? 'p-3 ' : 'p-5 '}`}>
                                                        <div className="h-20 mx-auto px-4">
                                                            <nav className="h-20 flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
                                                                {pageNumbers.map((number) => {
                                                                    if (number + 1 < pageNumbers.length) {
                                                                        return (
                                                                            <button key={number + 1} onClick={() => { paginate(number + 1); setPageNumberActive(number + 1) }} className={`md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 ${isMobile860 ? 'block' :'hidden'}` + `${pageNumberActive === number + 1 ? " bg-sky-300" : ""}`} title={`Page ${number + 1}`}>
                                                                                {number + 1}
                                                                            </button>
                                                                        );
                                                                    }
                                                                
                                                                })}
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })()}
                                </div>
                            );
                        } else {
                            return (
                                <>
                                    <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none p-3 border-b">
                                        <li className="nav-item" role="presentation">
                                            <button onClick={() => setToggleState(1)} className={"nav-link block text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 rounded-xl border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-sky-500 focus:border-transparent " + `${toggleState === 1 ? "bg-sky-400 text-white" : "bg-white text-sky"}`} >Xem danh s??ch theo ki???u b???ng</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button onClick={() => setToggleState(2)} className={"nav-link block text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 rounded-xl border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-sky-500 focus:border-transparent " + `${toggleState === 2 ? "bg-sky-400 text-white" : "bg-white text-sky"}`} >Xem danh s??ch theo ki???u th???</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content min-h-[30vh]" id="tabs-tabContent">
                                        <div className={"tab-pane fade show active " + `${toggleState === 1 ? 'block' : 'hidden'}`} id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
                                            {/* Tab content table */}
                                            <div className="main-table m-8">
                                                <table className=" w-full rounded-xl " >
                                                    <thead className="bg-gray-50">
                                                        <tr className="bg-gray">
                                                            <th className="p-3 border border-slate-300 w-10 text-sm font-semibold tracking-wide">STT</th>
                                                            <th className="p-3 border border-slate-300 text-sm font-semibold tracking-wide">T??n sinh vi??n</th>
                                                            <th className="p-3 border border-slate-300 text-sm font-semibold tracking-wide">M?? sinh vi??n</th>
                                                            {isTable === false && <th className="p-3 border border-slate-300 text-sm font-semibold tracking-wide">Email</th>}
                                                            <th className="p-3 border border-slate-300 text-sm font-semibold tracking-wide">Gi???i t??nh</th>
                                                            <th className="p-3 border border-slate-300 text-sm font-semibold tracking-wide">Khoa ng??nh</th>
                                                            <th className="p-3 border border-slate-300 text-sm font-semibold tracking-wide">L???p</th>
                                                            <th className="p-3 border border-slate-300 w-52 text-sm font-semibold tracking-wide">H??nh ?????ng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            currentPosts.length > 0 && currentPosts.map((doc, index) => {
                                                                return (
                                                                    <>
                                                                        <tr className={isActive ? "bg-white " : "bg-gray"}>
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{index + 1}</td>
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-left"><div className="content-table flex items-center"><img className="w-10 h-10 rounded-xl mx-3" src={doc.avatar ? doc.avatar : ''} alt={"avatar " + doc.lastName ? doc.lastName : ''} />{(doc.firstName ? doc.firstName : '') + ' ' + (doc.lastName ? doc.lastName : '')}</div></td>
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.studentId}</td>
                                                                            {isTable === false && <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.email}</td>}
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.gender}</td>
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.scienceBranch}</td>
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{doc.nameClass}</td>
                                                                            <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center ">
                                                                                <div className="content-table flex justify-around items-around">
                                                                                    <button className="p-3 rounded-xl bg-sky-200" onClick={() => viewUserId(doc.id)}><AiOutlineEye size={20} /></button>
                                                                                    <button className="p-3 rounded-xl bg-sky-200" onClick={() => getUserId(doc.id)}><AiOutlineEdit size={20} /></button>
                                                                                    <button className="p-3 rounded-xl bg-red-200" onClick={() => deleteHandler(doc.id)}><AiOutlineDelete size={20} /></button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        {/* {isOpenModalView && <Modal modal={"view"} data={doc} closeModal={setIsOpenModalView} key={doc.id} />} */}
                                                                        {/* {isOpenModalEdit && <Modal modal={"edit"} data={doc} closeModal={""} />} */}
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                        {(() => {
                                                            if(currentPosts.length === 0) return <div className="w-full text-center"><p className="p-5">Data kh??ng t???n t???i</p></div>
                                                        })()}
                                                        {
                                                            isOpenModalView && <Modal modal={"view"} data={isModalData} closeModal={setIsOpenModalView} />
                                                        }
                                                        {
                                                            isOpenModalEdit && <Modal modal={"edit"} data={isModalData} closeModal={setIsOpenModalEdit} />
                                                        }
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                        <div className={"tab-pane fade show active " + `${toggleState === 2 ? 'block' : 'hidden'}`} id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
                                            {/* Tab content grid */}
                                            <div className={isTable ? (isMobile1025 ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3') : `grid grid-cols-3 gap-3 m-8`} onMouseEnter={"RefeshStudent"}>
                                                {
                                                    currentPosts.length > 0 && currentPosts.map((doc, index) => {
                                                        return (
                                                            <>
                                                                <div className="card">
                                                                    <div className="flex justify-center">
                                                                        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg w-96 h-auto">
                                                                            <img className=" w-28 h-28 object-cover p-3 rounded-lg" src={doc.avatar} alt="" />
                                                                            <div className="w-72 p-3 flex flex-col justify-start">
                                                                                <h5 className="text-gray-900 text-xl font-medium mb-2">{doc.firstName + " " + doc.lastName}</h5>
                                                                                <p className="text-gray-700 text-base mb-2">M?? sinh vi??n: {doc.studentId}</p>
                                                                                <p className="text-gray-700 text-base mb-2">L???p : {doc.nameClass}</p>
                                                                                <p className="text-gray-700 text-base mb-2">Khoa : {doc.scienceBranch}</p>
                                                                                {/* <p className="text-gray-600 text-xs">Last updated 3 mins ago</p> */}
                                                                                <div className="cardFooter">
                                                                                    <div className="content-table flex justify-around items-around">
                                                                                        <button className="p-3 rounded-xl bg-sky-200 text-center" onClick={() => viewUserId(doc.id)}><AiOutlineEye size={20} /></button>
                                                                                        <button className="p-3 rounded-xl bg-sky-200 text-center" onClick={() => getUserId(doc.id)}><AiOutlineEdit size={20} /></button>
                                                                                        <button className="p-3 rounded-xl bg-red-200 text-center" onClick={() => deleteHandler(doc.id)}><AiOutlineDelete size={20} /></button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    isOpenModalView && <Modal modal={"view"} data={isModalData} closeModal={setIsOpenModalView} />
                                                                }
                                                                {
                                                                    isOpenModalEdit && <Modal modal={"edit"} data={isModalData} closeModal={setIsOpenModalEdit} />
                                                                }
                                                            </>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-footer">
                                            <div className="p-5">
                                                <div className="container mx-auto px-4">
                                                    <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
                                                        {pageNumbers.map((number) => {
                                                            if (number + 1 < pageNumbers.length) {
                                                                return (
                                                                    <button key={number + 1} onClick={() => { paginate(number + 1); setPageNumberActive(number + 1) }} className={`hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 `  + ` ${pageNumberActive === number + 1 ? " bg-sky-300" : ""}`} title={`Page ${number + 1}`}>
                                                                        {number + 1}
                                                                    </button>
                                                                );
                                                            }
                                                        })}
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })()}

                </div>
            </div>
            {isOpenFilter === true && <Filter isOpenFilter={isOpenFilter} handleClickOpenFilter={handleClickOpenFilter} parentCallback={callbackFunction} />}
        </main>
    )

}