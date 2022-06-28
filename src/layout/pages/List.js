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
import { AiOutlineFilter } from "react-icons/ai";

export default function List() {
    const [isActive, setIsActive] = useState(false);
    const [isData, setIsData] = useState([]);
    const [isOpenModalView, setIsOpenModalView] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        getUsers();
        
    }, []);

    // const [isNameCollection, setIsNameCollection] = useState([]);

    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        setIsData(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    const getUserId = async (id) => {
        setIsOpenModalEdit(true);
        const data = await UserDataService.getUser(id);

    }
    const deleteHandler = (id) => {
        confirmAlert({
            title: 'Xóa',
            message: 'Bạn có chắc chắn muốn xóa người dùng này không ?',
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

    // const deleteHandler = async (id) => {
    // setIsOpenModalDelete(true);
    // const confirmCheck = confirm("Bạn có chắc chắn muốn xóa sinh viên này không ?" ? "Yes" : "No")



    // }
    const viewUserId = async (id) => {
        // setIsOpenModalView(true);

    }
    const newHandler = async () => {
        const data = await UserDataService.addStudentId();
        const segments = data._key;
        console.log("segments.segments", segments.path.segments[1]);
        // return <NewUser studentId={segments.path.segments[1]} />
        // navigate('/sinh-vien/them-sinh-vien')

    }
    const handleChangeInputSearch = (e) => {
        setQuery(e.target.value);
        // console.log("query",query)
    }

    const search = (data) => {
        return data.filter((user) => {

            if (query === "") {
                return user;
                // }else if(user.firstName !== "" || user.lastName !== "" || user.studentId !== ""){
                // if(user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query) || user.studentId.includes(query)){
                // return user;
                // }
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
    return (
        <main>
            {/* <pre>{JSON.stringify(isData,undefined,2)}</pre> */}
            <div className="container bg-white flex-1 rounded-xl" >
                <div className="headertable p-5 flex justify-between">
                    <div className="headertable-left">
                        <h1 className="text-black font-bold">Sinh viên</h1>
                    </div>
                    {/* Button create new user */}
                    <div className="headertable-right">
                        <button onClick={newHandler} className="rounded-full bg-sky-300 px-6 py-3"><AiOutlinePlusCircle /></button>
                    </div>
                </div>
                <div className="bodytable">
                    <div className="functiontable px-5 flex justify-between">
                        <div className="functiontable-left flex">
                            <label className="relative block w-56 z-0" >
                                <span className="sr-only">Search</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    {/* <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg> */}
                                    <AiOutlineSearch size={24} />
                                </span>
                                <input onChange={handleChangeInputSearch} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" />
                            </label>
                            {/* <button className="rounded-full h-10 text-center text-white bg-sky-300 w-36 mx-5 font-bold">Tìm kiếm</button> */}
                        </div>
                        <div className="functiontable-right">
                            {/* <div className="mb-10 xl:w-96"> */}
                            {/* <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch"><AiOutlineFilter />Lọc :</label> */}
                            <select name="filter" id="filter" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Filter">
                                <option name="" value="">Mã sinh viên tăng dần </option>
                                <option name="" value="">Mã sinh viên giảm dần </option>
                            </select>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="main-table m-8 p-5 ">
                        <table className=" w-full rounded-xl ">
                            <thead className="bg-gray-50">
                                <tr className="bg-gray">
                                    <th className="p-3 border border-slate-600 w-10 text-sm font-semibold tracking-wide">STT</th>
                                    <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Tên sinh viên</th>
                                    <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Mã sinh viên</th>
                                    <th className="p-3 border border-slate-600 w-52 text-sm font-semibold tracking-wide">Hành động</th>
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
                                                    <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center ">
                                                        <div className="content-table flex justify-around items-around">
                                                            <button className="p-3 rounded-xl bg-sky-200" onClick={() => viewUserId(doc.id)}><AiOutlineEye size={20} /></button>
                                                            <button className="p-3 rounded-xl bg-sky-200" onClick={() => getUserId(doc.id)}><AiOutlineEdit size={20} /></button>
                                                            <button className="p-3 rounded-xl bg-red-200" onClick={() => deleteHandler(doc.id)}><AiOutlineDelete size={20} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {isOpenModalView && <Modal modal={"view"} data={doc} closeModal={setIsOpenModalView} key={doc.id} />}
                                                {isOpenModalEdit && <Modal modal={"edit"} data={doc} />}
                                                {/* {isOpenModalDelete && submit} */}
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="p-5">
                            <div className="container mx-auto px-4">
                                <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
                                    <button className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" title="Previous Page">
                                        <span className="sr-only">Previous Page</span>
                                        <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
                                            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
                                        </svg>
                                    </button>
                                    {pageNumbers.map((number) => {
                                        return (
                                            <button key={number+1} onClick={() => paginate(number)} className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" title={`Page +${number+1}`}>
                                                {number+1}
                                            </button>
                                        );
                                    })}
                                    <button className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" title="Next Page">
                                        <span className="sr-only">Next Page</span>
                                        <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
                                            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}