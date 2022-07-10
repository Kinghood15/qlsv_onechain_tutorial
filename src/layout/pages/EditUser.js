import { useState, useEffect, useRef } from 'react';
import { isEmpty } from "validator";
import ClassDataService from '../services/Class.services';
import ScienceBratchServices from '../services/ScienceBratch.services';
import UserDataService from '../services/Users.services';
import Validator from 'validator.tool';
import { useValidator } from "@validator.tool/hook";
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from '../env';
import { useNavigate } from 'react-router-dom';
// import { isEmpty } from "validator";
import isEmail from 'validator/es/lib/isEmail';
export default function EditUser({id}) {
    const navigate = useNavigate();
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
    const [isStudentId,setIsStudentId] = useState();
    const [colorInput, setColorInput] = useState({
        'studentId': 'border-gray-300',
        'firstName': 'border-gray-300',
        'lastName': 'border-gray-300',
        'nameClass': 'border-gray-300',
        'address': 'border-gray-300',
        'email': 'border-gray-300',
        'birthday': 'border-gray-300',
        'scienceBranch': 'border-gray-300',
        'gender': 'border-gray-300',
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
    const [idUpdate, setIdUpdate] = useState();
    const newHandler = async () => {
        const data = await UserDataService.addStudentId();
        const segments = data._key;
        console.log("segments.segments", segments.path.segments[1]);
        setIdUpdate(segments.path.segments[1]);
        // return <EditUser studentId={segments.path.segments[1]} />
        // navigate('/sinh-vien/them-sinh-vien')

    }
    
    
    const [isInputForm, setIsInputForm] = useState({
        'studentId':'',
        'firstName': '',
        'lastName': '',
        'nameClass': '',
        'address': '',
        'email': '',
        'birthday': '',
        'scienceBranch': '',
        'gender': '',
        'avatar': AVATAR_USER
    });
    const [isData,setIsData] = useState({})
    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        setIsData(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    const GetstudentId = () => {
        // console.log(" UserDataService.addStudentId()", UserDataService.addStudentId())
        // setIsStudentId();
        // setIsInputForm({ ...isInputForm, 'studentId': isStudentId });
        // console.log("isStudentId",isStudentId);
    }
    // console.log("isStudentId in EditUser:",isStudentId);
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
        const data = await ClassDataService.getAllClass();
        setIsClass(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    }
    const [isUser, setIsUser] = useState([]);
    const onSubmit =  async(value) => {
        try {
            console.log("isInputForm.studentId in event on Submit by New User",isInputForm.studentId);
            const checkStudentIds = await UserDataService.checkUserByStudentId(isInputForm.studentId);
            var countCheckStudentId = 0;
            checkStudentIds.forEach((studentId) =>{
                console.log("studentId.data()",studentId.data());
                if(studentId.data()){
                    countCheckStudentId+=1;
                }
            })
            console.log("countCheckStudentId",countCheckStudentId);
            if(countCheckStudentId > 0){
                setValidateInput({...validateInput,'studentId':'Mã sinh viên này đã được sử dụng. Yêu cầu bạn nhập số khác!'})
                setColorInput({...colorInput,'studentId':'border-red-300'});
            }else {
                setValidateInput({...validateInput,'studentId':''})
                setColorInput({...colorInput,'studentId':'border-green-300'});
                try {
                    await UserDataService.updateUser({...isInputForm});
                    alert("User added successfully");
                    setIsInputForm({...value});
                } catch (error) {
                    alert("User added failed")
                }
            }
            // console.log("value in onSubmit", value);
            // UserDataService.addUser({...value});
            
        } catch (error) {
            console.log("onClick submit in add new user ",error);
        }
    };
    const SaveAndGoBack = () => {
        onSubmit();
        navigate(-1);
    }
    const SaveAndModal = () => {
        onSubmit();
        
    }
    const onReset = (value) => {
        setIsInputForm({ ...value });
    }
    
    function handleChange(env) {
        const target = env.target;

        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        console.log("isInputForm.firstName.length",isInputForm.firstName.length)
        setIsInputForm({ ...isInputForm, [name]: value });
        if(isInputForm.studentId.length > 0 && isInputForm.studentId.length < 7){
            setValidateInput({...validateInput,'studentId':''});
            setColorInput({...colorInput,'studentId':'border-green-300'});
        }else if(isInputForm.studentId.length >7){
            setValidateInput({...validateInput,'studentId':'Bạn phải nhập đủ 6 ký tự'});
            setColorInput({...colorInput,'studentId':'border-red-300'});
        }
        if(isInputForm.firstName.length < 2){
           setValidateInput({...validateInput,'firstName':'Bạn phải nhiều hơn 2 ký tự'});
           setColorInput({...colorInput,'firstName':'border-green-300'});
        }else if(isInputForm.firstName.length >=2){
            setValidateInput({...validateInput,'firstName':''});
            setColorInput({...colorInput,'firstName':'border-green-300'});
        }
        if(isInputForm.lastName.length < 2){
            setValidateInput({...validateInput,'lastName':'Bạn phải nhiều hơn 2 ký tự'})
            setColorInput({...colorInput,'lastName':'border-green-300'});
        }else if(isInputForm.lastName.length >1){
            setValidateInput({...validateInput,'lastName':''});
            setColorInput({...colorInput,'lastName':'border-green-300'});
        }
        if(isInputForm.address.length<2){
            setValidateInput({...validateInput,'address':'Bạn phải nhiều hơn 2 ký tự'})
            setColorInput({...colorInput,'address':'border-green-300'})
        }else if(isInputForm.address.length>1){
            setValidateInput({...validateInput,'address':''});
            setColorInput({...colorInput,'address':'border-green-300'});
        }
        if(isInputForm.email.length < 2){
            setValidateInput({...validateInput,'email':'Bạn phải nhiều hơn 2 ký tự'})
            setColorInput({...colorInput,'email':'border-green-300'})
        }else if(isInputForm.email.length > 1){
           setValidateInput({...validateInput,'email':''});
           setColorInput({...colorInput,'email':'border-green-300'});
        }
        if(isEmail(isInputForm.email)){
            setValidateInput({...validateInput,'email':'Email của bạn không hợp lệ'})
            setColorInput({...colorInput,'email':'border-green-300'})
        }else if(!isEmail(isInputForm.email)){
            setValidateInput({...validateInput,'email':''})
            setColorInput({...colorInput,'email':'border-green-300'})
        }
        if(isInputForm.birthday){

        }
        // if(isInputForm.gender.length < 2){
        //     setValidateInput({...validateInput,'gender':'Bạn phải chọn giới tính '})
        //     setColorInput({...colorInput,'gender':'border-green-300'})
        // }

        // if(isInputForm.scienceBranch.length < 2){
        //     setValidateInput({...validateInput,'scienceBranch':'Bạn phải chọn khoa ngành'})
        //     setColorInput({...colorInput,'scienceBranch':'border-green-300'})
        // }
        console.log("isInputForm",isInputForm);
        console.log("validateInput",validateInput);
        console.log("colorInput",colorInput);

    }
    const { validator, handleReset, handleSubmit } = useValidator({
        initValues: isInputForm
    });
    useEffect(() => {
        getScienceBratch();
        getClass();
        GetstudentId();
    }, []);

    return (
        <>
            <main>
                <div className="container bg-white flex-1 rounded-xl w-[calc(100vw-240px-32px-32px)] max-w-[calc(100vw-240px-32px-32px)]" >
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
                                <input name="studentId" required type="text" className={`${colorInput.studentId} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="studentId" placeholder="Mã sinh viên"/>
                                <span className={`${colorInput.studentId}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.studentId}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="firstName">Họ sinh viên</label>
                                    <input placeholder="Họ sinh viên" required type="text" className={`${colorInput.firstName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstName`} name="firstName" />
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="lastName">Tên sinh viên</label>
                                    <input placeholder="Tên sinh viên" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" name="lastName" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="email">Email</label>
                                    <input placeholder="Email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" name="email" />
                                    <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="address">Địa chỉ</label>
                                    <input placeholder="Địa chỉ" required type="text" className={`${colorInput.address} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="address" name="address" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="birthday">Ngày sinh sinh viên</label>
                                    <input required type="date" className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" name="birthday" />
                                </div>
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="gender">Giới tính:</label>
                                    <select name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
                                        <option name="gender" defaultValue="Nam">Nam</option>
                                        <option name="gender" value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-10 xl:w-96">
                                    <label className="form-label inline-block mb-2 text-gray-700" for="scienceBranch">Khoa ngành:</label>
                                    <select name="scienceBranch" id="scienceBranch" className={`${colorInput.scienceBranch} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
                                        {isScienceBranch.map((item, i) => {
                                            if (i === 0) {
                                                i++;
                                                return (
                                                    <>
                                                        <option name="scienceBranch" key={item.id}  defaultValue={item.nameScienceBranch}>{item.nameScienceBranch}</option>
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
                                    <select name="nameClass" id="nameClass" className={`${colorInput.nameClass} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Lop hoc">
                                        {isClass.map((item, i) => {
                                            if (i === 0) {
                                                i++;
                                                return (
                                                    <>
                                                        <option name="nameClass" key={item.id} defaultValue={item.nameClass}>{item.nameClass}</option>
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
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <button type="reset" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Xóa hết</button>
                                <button type="button" onClick={""} className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và quay trở lại!</button>
                                <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Lưu và xem trước thông tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}