import { doc, setDoc, addDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase";
// import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './layout/env';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import UserDataService from '../services/Users.services'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import Modal from '../components/Modal';
import {useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
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

    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        // console.log(data.docs);
        
        setIsData(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    const getUserId = async (id) => {
        setIsOpenModalEdit(true);
        const data = await UserDataService.getUser(id);

    }
    const deleteHandler = async(id) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: async()=> {await UserDataService.deleteUser(id);  getUsers();}
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
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
        navigate('/sinh-vien/them-sinh-vien')
    }
    const handleChangeInputSearch = (e) => {
        setQuery(e.target.value);
        console.log("query",query)
    }
    const keys = ["firstName","lastName"]
    const search = (data) => {
        return data.filter((user) =>  user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query));
    }
    // console.log("search",search(isData));
    const dataSearch = search(isData);
    return (
        <main>
            
            {/* <pre>{JSON.stringify(isData,undefined,2)}</pre> */}
            <div className="container bg-white flex-1 rounded-xl" >
                <div className="headertable p-5 flex justify-between">
                    <div className="headertable-left">
                        <h1 className="text-black font-bold">Sinh viên</h1>
                    </div>
                    <div className="headertable-right">
                        <button className="rounded-full bg-sky-300 px-6 py-3"><AiOutlinePlusCircle /></button>
                    </div>
                </div>
                <div className="bodytable">
                    <div className="functiontable px-5">
                        <div className="functiontable-left flex">
                            <label class="relative block w-56 z-0" >
                                <span class="sr-only">Search</span>
                                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                    {/* <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg> */}
                                    <AiOutlineSearch size={24} />
                                </span>
                                <input onChange={handleChangeInputSearch} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" />
                            </label>
                            {/* <button className="rounded-full h-10 text-center text-white bg-sky-300 w-36 mx-5 font-bold">Tìm kiếm</button> */}
                        </div>
                        <div className="functiontable-right">

                        </div>
                    </div>
                    <div className="main-table m-8 p-5 ">
                        <table className=" w-full rounded-xl ">
                            <thead className="bg-gray-50">
                                <tr className="bg-gray">
                                    <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">STT</th>
                                    <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Tên sinh viên</th>
                                    <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Mã sinh viên</th>
                                    <th className="p-3 border border-slate-600 text-sm font-semibold tracking-wide">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // console.log("dataSearch",dataSearch);
                                    dataSearch.map((doc, index) => {
                                        
                                        return (
                                            <>
                                                <tr className={isActive ? "bg-white " : "bg-gray"}>
                                                    <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-center">{index + 1}</td>
                                                    <td className="p-3 h-full text-sm border border-slate-200 italic tracking-wide text-left"><div className="content-table flex items-center"><img className="w-10 h-10 rounded-xl mx-3" src={doc.avatar} alt={"avatar " + doc.lastName} />{doc.firstName + ' ' + doc.lastName}</div></td>
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
                    </div>
                </div>
            </div>
        </main>
    )

}