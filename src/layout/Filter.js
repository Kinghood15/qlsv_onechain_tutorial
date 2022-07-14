import { AiOutlineArrowLeft } from "react-icons/ai";
import UsersServices from "./services/Users.services";
import ClassDataService from './services/Class.services';
import ScienceBratchServices from './services/ScienceBratch.services';
import { useState, useEffect } from 'react';

const Filter = (props, isOpenFilter, handleClickOpenFilter ) => {
    const titleSoft = [{
        'name': 'Giới tính'
    }, {
        'name': 'Khoa ngành'
    }, {
        'name': 'Lớp'
    }];
    const [isData, setIsData] = useState([]);
    const [isDataGender, setIsDataGender] = useState([]);
    const [isDataNameClass, setIsDataNameClass] = useState([]);
    const [isDataScienceBranch, setIsDataScienceBranch] = useState([]);
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    props.parentCallback(isData);
    useEffect(() =>{
        
    },[isData])
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
        if (checked) {
            if (name === 'gender') {
                if (isInputForm.gender.length > 0) {
                    setIsInputForm({ ...isInputForm, [name]: isInputForm.gender + value });
                } else {
                    setIsInputForm({ ...isInputForm, [name]: value + ',' });
                }
            }
            if (name === 'nameClass') {
                if (isInputForm.nameClass.length > 0) {
                    // if(isInputForm.nameClass)
                    if (isInputForm.nameClass.split(',').length < 2) {
                        setIsInputForm({ ...isInputForm, [name]: isInputForm.nameClass + value });
                    } else {
                        setIsInputForm({ ...isInputForm, [name]: isInputForm.nameClass + value + ',' });
                    }

                } else {
                    setIsInputForm({ ...isInputForm, [name]: value + ',' });
                }
            }
            if (name === 'scienceBranch') {
                if (isInputForm.scienceBranch.length > 0) {
                    if (isInputForm.scienceBranch.split(',').length < 2) {
                        setIsInputForm({ ...isInputForm, [name]: isInputForm.scienceBranch + value });
                    } else {
                        setIsInputForm({ ...isInputForm, [name]: isInputForm.scienceBranch + value + ',' });
                    }
                    // setIsInputForm({...isInputForm,[name]: isInputForm.scienceBranch + value});
                } else {
                    setIsInputForm({ ...isInputForm, [name]: value + ',' });
                }
            }

        } else {
            if (name === 'gender') {
                if (isInputForm.gender) {
                    var itemcheck;
                    isInputForm.gender.split(',').forEach((item) => {
                        if (item !== value) {
                            setIsInputForm({ ...isInputForm, [name]: item });
                        } else if (item === value) {
                            itemcheck = item;
                        }
                    })
                    if (isInputForm.gender === itemcheck) {
                        setIsInputForm({ ...isInputForm, [name]: '' });
                    }
                } else {
                    setIsInputForm({ ...isInputForm, [name]: '' });
                }
            }
            if (name === 'nameClass') {
                if (isInputForm.nameClass) {
                    var itemcheck;
                    isInputForm.nameClass.split(',').forEach((item) => {
                        if (item !== value) {
                            setIsInputForm({ ...isInputForm, [name]: item });
                        } else if (item === value) {
                            itemcheck = item;
                        }
                    })
                    if (isInputForm.nameClass === itemcheck) {
                        setIsInputForm({ ...isInputForm, [name]: '' });
                    }
                } else {
                    setIsInputForm({ ...isInputForm, [name]: '' });
                }
            }
            if (name === 'scienceBranch') {
                if (isInputForm.scienceBranch) {
                    var itemcheck;
                    isInputForm.scienceBranch.split(',').forEach((item) => {
                        if (item !== value) {
                            setIsInputForm({ ...isInputForm, [name]: item });
                        } else if (item === value) {
                            itemcheck = item;
                        }
                    })
                    if (isInputForm.scienceBranch === itemcheck) {
                        setIsInputForm({ ...isInputForm, [name]: '' });
                    }
                } else {
                    setIsInputForm({ ...isInputForm, [name]: '' });
                }
            }
        }
    }
    function getUnique(arr, comp) {

        const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }
    var genderArrcheck = false;
    var nameClassArrcheck = false;
    var scienceBranchArrcheck = false;
    var getDocument;
    const handleOnClick = async () => {
        try {
            if (isInputForm.gender.length > 0 || isInputForm.nameClass.length > 0 || isInputForm.scienceBranch.length > 0) {
                const dataArr = new Array();
                if (Array.isArray(isInputForm.gender) === false) {
                    const genderArr = isInputForm.gender.split(",");
                    function isEmptyArr(value) {
                        if (value !== '') {
                            return value;
                        }
                    }
                    const genderArrNew = genderArr.filter(isEmptyArr);
                    if (genderArrNew.length > 0) {
                        genderArrcheck = true;
                        const getDocumentGender = await UsersServices.getUsersByGender(genderArrNew);
                        // setIsData(getDocumentGender.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
                        setIsDataGender(getDocumentGender.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
                        getDocumentGender.forEach((item) => {
                            dataArr.push({...item.data(),['id']:item.id});
                        })
                    }
                }
                if (Array.isArray(isInputForm.nameClass) === false) {
                    const nameClassArr = isInputForm.nameClass.split(",");
                    function isEmptyArr(value) {
                        if (value !== '') {
                            return value;
                        }
                    }
                    const nameClassArrNew = nameClassArr.filter(isEmptyArr);
                    if (nameClassArrNew.length > 0) {
                        nameClassArrcheck = true;
                        const getDocumentNameClass = await UsersServices.getUsersByNameClass(nameClassArrNew);
                        // setIsData({...getDocumentNameClass.docs.map((docs) => ({ ...docs.data(), id: docs.id }))});
                        setIsDataNameClass(getDocumentNameClass.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
                        getDocumentNameClass.forEach((item) => {
                            dataArr.push({...item.data(),['id']:item.id});
                        })
                    }
                }
                if (Array.isArray(isInputForm.scienceBranch) === false) {
                    const scienceBranchArr = isInputForm.scienceBranch.split(",");
                    function isEmptyArr(value) {
                        if (value !== '') {
                            return value;
                        }
                    }
                    const scienceBranchArrNew = scienceBranchArr.filter(isEmptyArr);
                    if (scienceBranchArrNew.length > 0) {
                        scienceBranchArrcheck = true;
                        const getDocumentScienceBranch = await UsersServices.getUsersByScienceBranch(scienceBranchArrNew);
                        setIsDataScienceBranch(getDocumentScienceBranch.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
                        getDocumentScienceBranch.forEach((item) => {
                            dataArr.push({...item.data(),['id']:item.id});
                        })
                    }

                }
                let newArray = [];
                // Declare an empty object
                let uniqueObject = {};
                // Loop for the array elements
                for (let i in dataArr) {
                    // Extract the title
                    let objStudentId = dataArr[i]['studentId'];
                    // Use the title as the index
                    uniqueObject[objStudentId] = dataArr[i];
                }

                // Loop to push unique object into array
                for (let i in uniqueObject) {
                    newArray.push(uniqueObject[i]);
                }

                // Display the unique objects
                setIsData(newArray);
            }
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
                    if (document.body.clientWidth < 480) {
                        setIsMobile480(true);
                        if (document.body.clientWidth < 320) {
                            setIsMobile320(true);
                        } else {
                            setIsMobile320(false);
                        }
                    } else {
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
        handleResize();
        window.addEventListener("resize", handleResize);
    }, [isMobile320, isMobile480, isMobile860, isMobile1025, isTable]);
    useEffect(() => {
        getClass();
        getScienceBratch();
    }, [])
    return (
        <div className={`filter w-96 h-full rounded-lg p-8 absolute bg-neutral-200 right-0 top-0 z-10 max-w-[calc(100vw-32px-32px)] ${isOpenFilter ? 'block' : 'hidden'}`}>
            <div className="filter-header flex justify-between">
                <div className="filter-header-left">
                    <h1 className="text-black font-bold">Lọc</h1>
                </div>
                <div className="filter-header-right">
                    <button onClick={props.handleClickOpenFilter} className="bg-sky-400 w-10 h-10 text-white justify-center font-bold text-2xl text-center flex items-center rounded-full hover:rotate-180 transition ease-in-out delay-150">{<AiOutlineArrowLeft />}</button>
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
                                                            <input type="checkbox" className="w-6 h-6" name="nameClass" onChange={handleChange} value={item.nameClass} />
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