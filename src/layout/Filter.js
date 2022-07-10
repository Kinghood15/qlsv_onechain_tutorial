import { AiOutlineArrowLeft } from "react-icons/ai";
import UsersServices from "./services/Users.services";
import ClassDataService from './services/Class.services';
import ScienceBratchServices from './services/ScienceBratch.services';
import { useState, useEffect } from 'react';

const Filter = ({ isOpenFilter, handleClickOpenFilter }) => {
    const titleSoft = [{
        'name': 'Giới tính'
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
        "gender": [],
        "nameClass": [],
        "scienceBranch": [],
    })
    const handleChange = (e) => {
        const target = e.target;
        const checked = e.target.checked;
        if(checked) {
            const value = target.value;
            const name = target.name;
            if(name === 'gender'){
                
            }
            setIsInputForm({...isInputForm,[name]: value});
        }

        console.log("isInputForm", isInputForm);
    }
    const handleOnClick = async () => {
        try {
            await UsersServices.getUsersByFilter("", "", "", "");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getClass();
        getScienceBratch();
    }, [])
    return (
        <div className={`filter w-96 h-full rounded-lg p-8 absolute bg-neutral-200 right-0 top-0 z-20 max-w-[calc(100vw-32px-32px)] ${isOpenFilter ? 'block' : 'hidden'}`}>
            <div className="filter-header flex justify-between">
                <div className="filter-header-left">
                    <h1 className="text-black font-bold">Lọc</h1>
                </div>
                <div className="filter-header-right">
                    <button onClick={handleClickOpenFilter} className="bg-sky-400 w-10 h-10 text-white justify-center font-bold text-2xl text-center flex items-center rounded-full hover:rotate-180 transition ease-in-out delay-150">{<AiOutlineArrowLeft />}</button>
                </div>
            </div>
            <div className="filter-container">
                <div className="filter-list-items">
                    {titleSoft.map((item, index) => {
                        return (
                            <div className="itemsFilter w-full my-3" key={index}>
                                <h5>{item.name}</h5>
                                {(() => {
                                    if (item.name === 'Giới tính') {
                                        return (
                                            <div className="group grid gap-2 grid-cols-2">
                                                <div className="wrap flex items-center">
                                                    <input type="checkbox" onChange={handleChange} className="w-6 h-6" name="gender" value="Nam" />
                                                    <labal className="p-3" htmlFor="gender">Nam</labal>
                                                </div>
                                                <div className="wrap flex items-center">
                                                    <input type="checkbox" onChange={handleChange} className="w-6 h-6" name="gender" value="Nữ" />
                                                    <labal htmlFor="gender" className="p-3">Nữ</labal>
                                                </div>
                                            </div>

                                        );
                                    }
                                })()}
                                {(() => {
                                    if (item.name === 'Khoa ngành') {
                                        return (
                                            <div className="grid gap-2 grid-cols-2">
                                                {isScienceBranch.map((item, i) => {
                                                    return (
                                                        <div className="wrap flex items-center">
                                                            <input type="checkbox" className="w-6 h-6" name="scienceBranch" onChange={handleChange} value={item.nameScienceBranch} />
                                                            <labal className="p-3" htmlFor="scienceBranch">{item.nameScienceBranch}</labal>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (item.name === 'Lớp') {
                                        return (
                                            <div className="grid gap-2 grid-cols-2">
                                                    {isClass.map((item, i) => {
                                                        return (
                                                            <div className="wrap flex items-center">
                                                                <input type="checkbox" className="w-6 h-6" name="nameClass" value={item.nameClass} />
                                                                <labal className="p-3" htmlFor="scienceBranch">{item.nameClass}</labal>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        );
                    })}

                </div>
            </div>
            <div className="filter-footer">
                <button onClick={handleOnClick} className="rounded-lg float-right bg-sky-300 px-6 py-3">Lưu lại</button>
            </div>
        </div>
    );
}
export default Filter;