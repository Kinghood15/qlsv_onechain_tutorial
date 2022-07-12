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
        const value = target.value;
        const name = target.name;
        if(checked) {
            console.log("checked", checked)
            console.log("isInputForm.gender.length", isInputForm.gender.length)
            if(name === 'gender'){
                if(isInputForm.gender.length > 0) {
                    console.log("if isInputForm.gender")
                    setIsInputForm({...isInputForm,[name]: isInputForm.gender + value});
                }else{
                    console.log("else isInputForm.gender")
                    setIsInputForm({...isInputForm,[name]: value + ','});
                }
            }
            if(name === 'nameClass'){
                if(isInputForm.nameClass.length > 0) {
                    console.log("if isInputForm.nameClass")
                    setIsInputForm({...isInputForm,[name]: isInputForm.nameClass + value});
                }else{
                    console.log("else isInputForm.nameClass")
                    setIsInputForm({...isInputForm,[name]: value + ','});
                }
            }
            if(name === 'scienceBranch'){
                if(isInputForm.scienceBranch.length > 0) {
                    console.log("if isInputForm.scienceBranch")
                    setIsInputForm({...isInputForm,[name]: isInputForm.scienceBranch + value});
                }else{
                    console.log("else isInputForm.scienceBranch")
                    setIsInputForm({...isInputForm,[name]: value + ','});
                }
            }
            
        }else{
            if(name === 'gender'){
                if(isInputForm.gender){
                    console.log("if isInputForm.gender else")
                    console.log("if isInputForm.gender.split",isInputForm.gender.split(','))
                    var itemcheck;
                    isInputForm.gender.split(',').forEach((item) => {
                        if(item !== value) {
                            setIsInputForm({...isInputForm,[name]: item});
                        }else if(item === value) {
                            itemcheck = item;
                        }
                    })
                    if(isInputForm.gender === itemcheck){
                        setIsInputForm({...isInputForm,[name]:''});
                    }
                }else{
                    console.log("else isInputForm.gender else")
                    setIsInputForm({...isInputForm,[name]: ''});
                }
            }
            if(name === 'nameClass'){
                if(isInputForm.nameClass){
                    console.log("if isInputForm.nameClass else")
                    console.log("if isInputForm.nameClass.split",isInputForm.nameClass.split(','))
                    var itemcheck;
                    isInputForm.nameClass.split(',').forEach((item) => {
                        if(item !== value) {
                            setIsInputForm({...isInputForm,[name]: item});
                        }else if(item === value) {
                            itemcheck = item;
                        }
                    })
                    if(isInputForm.nameClass === itemcheck){
                        setIsInputForm({...isInputForm,[name]:''});
                    }
                }else{
                    console.log("else isInputForm.nameClass else")
                    setIsInputForm({...isInputForm,[name]: ''});
                }
            }
            if(name === 'scienceBranch'){
                if(isInputForm.scienceBranch){
                    console.log("if isInputForm.scienceBranch else")
                    console.log("if isInputForm.scienceBranch.split",isInputForm.scienceBranch.split(','))
                    var itemcheck;
                    isInputForm.scienceBranch.split(',').forEach((item) => {
                        if(item !== value) {
                            setIsInputForm({...isInputForm,[name]: item});
                        }else if(item === value) {
                            itemcheck = item;
                        }
                    })
                    if(isInputForm.scienceBranch === itemcheck){
                        setIsInputForm({...isInputForm,[name]:''});
                    }
                }else{
                    console.log("else isInputForm.scienceBranch else")
                    setIsInputForm({...isInputForm,[name]: ''});
                }
            }
        }

        console.log("isInputForm", isInputForm);
    }
    const handleOnClick = async () => {
        try {
            console.log("isInputForm",isInputForm)
            await UsersServices.getUsersByFilter(isInputForm.gender, isInputForm.scienceBranch, isInputForm.nameClass);
        } catch (error) {
            console.log(error);
        }
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
    useEffect(() =>{
      handleResize();
      window.addEventListener("resize", handleResize);
    },[])
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
                                            <div className={`${isMobile480 ? 'group' : 'group grid gap-2 grid-cols-2'}`}>
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
                                            <div className={`${isMobile480 ? 'group' : 'group grid gap-2 grid-cols-2'}`}>
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
                                            <div className={`${isMobile480 ? 'group' : 'group grid gap-2 grid-cols-2'}`}>
                                                    {isClass.map((item, i) => {
                                                        return (
                                                            <div className="wrap flex items-center">
                                                                <input type="checkbox" className="w-6 h-6" name="nameClass"  onChange={handleChange} value={item.nameClass} />
                                                                <labal className="p-3" htmlFor="nameClass">{item.nameClass}</labal>
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