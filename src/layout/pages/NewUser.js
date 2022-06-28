import { useState, useEffect, useRef } from 'react';
import { isEmpty } from "validator";
import ClassDataService from '../services/Class.services';
import ScienceBratchServices from '../services/ScienceBratch.services';
import UserDataService from '../services/Users.services';
import Validator from 'validator.tool';
import { useValidator } from "@validator.tool/hook";

export default function NewUser({studentIdNew}) {
    const [errorMessage, setErrorMessage] = useState({
        'studentId': '',
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'scienceBranch': '',
        'gender': '',
    })
    const [colorInput, setColorInput] = useState({
        'studentId': 'default',
        'firstName': 'default',
        'lastName': 'default',
        'nameClass': 'default',
        'address': '',
        'email': 'default',
        'birthday': 'default',
        'scienceBranch': 'default',
        'gender': 'default',
    })
    const [validateInput, setValidateInput] = useState({
        'studentId': '',
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'scienceBranch': '',
        'gender': '',
    })
    const [isInputForm, setIsInputForm] = useState({
        'studentId': studentIdNew,
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'scienceBranch': '',
        'gender': '',
    })
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try{
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        }catch(e){
            console.log("Message"+e.message);
        }
    }
    const [isClass, setIsClass] = useState([]);
    const getClass = async () => {
        const data = await ClassDataService.getAllClass();
        setIsClass(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    }
    const [isUser,setIsUser] = useState([]);
    const onSubmit = async(value) => {
        // console.log("value", value);
   
        // setIsUser(data.docs.map((docs) => ({ ...docs.data(), id:docs.id })));
        console.log("isUser", isUser);
    };
    const onReset = (value) => {
        setIsInputForm({...value});
    }
    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputForm
      });
      function handleChange(env) {
        const target = env.target;
        // console.log("target",target);
        const value =target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        // console.log("name: " + name, target.name);
        setIsInputForm({ ...isInputForm, [name]: value });
        console.log("isInputForm",isInputForm);
      }
    
    useEffect(() => {
        getScienceBratch();
        getClass();
    }, []);

    return (
        <>
            <main>
                <div className="container bg-white flex-1 rounded-xl" >
                    <div className="headerForm p-5 flex justify-between">
                        <div className="headerForm-left">
                            <h1 className="text-black font-bold">Thêm sinh viên</h1>
                        </div>
                        <div className="headerForm-right">
                            
                        </div>
                    </div>
                    <div className="containerForm block p-6 rounded-lg bg-white w-xl m-w-xl">
                        <form onReset={handleReset(onReset)} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" for="studentId">Mã sinh viên</label>
                                <input name="studentId" required type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="studentId" value={isInputForm.studentId} readOnly disabled />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="firstName">Họ sinh viên</label>
                                    <input required type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstName" name="firstName" />
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="lastName">Tên sinh viên</label>
                                    <input required type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="lastName" name="lastName" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="email">Email</label>
                                    <input required type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email" name="email" />
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="address">Địa chỉ</label>
                                    <input required type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="address" name="address" />
                                </div>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" for="birthday">Ngày sinh sinh viên</label>
                                <input required type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="birthday" name="birthday" />
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" for="gender">Giới tính:</label>
                                <select name="gender" id="gender" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="gender">
                                    <option name="gender" selected value="male">Nam</option>
                                    <option name="gender" value="female">Nữ</option>
                                </select>
                            </div>
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch">Khoa ngành:</label>
                                <select name="scienceBranch" id="scienceBranch" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Khoa nganh">
                                    {isScienceBranch.map((item, i) => {
                                        if (i === 0) {
                                            i++;
                                            // setIsInputForm( isInputForm.scienceBranch:e.target.value );
                                            return (
                                                <>
                                                    <option name="scienceBranch" key={item.id} selected value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
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
                            <div className="mb-10 xl:w-96">
                                <label className="form-label inline-block mb-2 text-gray-700" for="class">Lớp:</label>
                                <select name="nameClass" id="nameClass" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Lop hoc">
                                    {isClass.map((item, i) => {
                                        if (i === 0) {
                                            i++;
                                            return (
                                                <>
                                                    <option name="nameClass" key={item.id} selected value={item.nameClass}>{item.nameClass}</option>
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
                            <div class="grid grid-cols-3 gap-4">
                                <button type="reset" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Xóa hết</button>
                                <button type="button" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và quay trở lại!</button>
                                <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và xem trước thông tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}