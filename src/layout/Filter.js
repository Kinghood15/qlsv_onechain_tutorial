import { AiOutlineArrowLeft } from "react-icons/ai";
import UsersServices from "./services/Users.services";
import ClassDataService from './services/Class.services';
import ScienceBratchServices from './services/ScienceBratch.services';
import { useState, useEffect } from 'react';

const Filter = ({ isOpenFilter, handleClickOpenFilter }) => {
    const titleSoft = [{
        'name': 'Giới tính'
    }, {
        'name': 'Địa chỉ '
    }, {
        'name': 'Khoa ngành'
    }, {
        'name': 'Lớp'
    }];
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try {
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (e) {
            console.log("Message" + e.message);
        }
    }
    const [isClass, setIsClass] = useState([]);
    const getClass = async () => {
        try {
            const data = await ClassDataService.getAllClass();
            setIsClass(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (error) {
            console.log("Error", error);
        }
    }
    const [isInputForm, setIsInputForm] = useState({
        "gender": "",
        "address": "",
        "nameClass": "",
        "scienceBranch": ""
    })
    const handleOnClick = async () => {
        try {
            await UsersServices.getUsersByFilter("", "", "", "");
            // console.log("user",user);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getClass();
        getScienceBratch();
        console.log("UserEffects in filter");
    },[])
    return (
        <div className={`filter w-96 h-full rounded-lg p-8 absolute bg-neutral-200 right-0 top-0 z-50 ${isOpenFilter ? 'block' : 'hidden'}`}>
            <div className="filter-header flex justify-between">
                <div className="filter-header-left">
                    <h1 className="text-black font-bold">Lọc</h1>
                </div>
                <div className="filter-header-right">
                    <button onClick={handleOnClick} className="bg-sky-400 w-10 h-10 text-white justify-center font-bold text-2xl text-center flex items-center rounded-full hover:rotate-180 transition ease-in-out delay-150">{<AiOutlineArrowLeft />}</button>
                </div>
            </div>
            <div className="filter-container">
                <div className="filter-list-items">
                    {titleSoft.map((item, index) => {
                        return (
                            <div className="itemsFilter" key={index}>
                                <h5>{item.name}</h5>
                                {(() => {
                                    console.log("name: " + item.name);
                                    if (item.name === 'Khoa ngành') {
                                        console.log("item.name", item.name)
                                        return (
                                            <div className="mb-10 xl:w-96">
                                                {/* <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch">Khoa ngành:</label> */}
                                                <select name="scienceBranch" id="scienceBranch" className={`form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
                                                    {isScienceBranch.map((item, i) => {
                                                        if (i === 0) {
                                                            i++;
                                                            return (
                                                                <>
                                                                    <option name="scienceBranch" key={item.id} value={item.nameScienceBranch} selected>{item.nameScienceBranch}</option>
                                                                </>
                                                            );
                                                        } else {
                                                            i++;
                                                            return (
                                                                <>
                                                                    <option name="scienceBranch" key={item.id} value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                                                </>
                                                            );
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                        )
                                    }
                                })}
                                {(() => {
                                    if (item.name === 'Lớp') {
                                        console.log("item.name", item.name)
                                        return (
                                            <div className="mb-10 xl:w-96">
                                                {/* <label className="form-label inline-block mb-2 text-gray-700" for="class">Lớp:</label> */}
                                                <select name="nameClass" id="nameClass" className={`form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Lop hoc">
                                                    {isClass.map((item, i) => {
                                                        if (i === 0) {
                                                            i++;
                                                            return (
                                                                <>
                                                                    <option name="nameClass" key={item.id} value={item.nameClass} selected>{item.nameClass}</option>
                                                                </>
                                                            );
                                                        } else {
                                                            return (
                                                                <>
                                                                    <option name="nameClass" key={item.id} value={item.nameClass}>{item.nameClass}</option>
                                                                </>
                                                            );
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        );
                    })}

                </div>
            </div>
            <div className="filter-footer">

            </div>
        </div>
    );
}
export default Filter;