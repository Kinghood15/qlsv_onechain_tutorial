// import { Container, Card, Input, Spacer, Button, Text, Link, Grid, Checkbox } from '@nextui-org/react';
import './css/signup.css';
import { React, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnLockIcon } from "./js/UnLockIcon.js";
import { LockIcon } from "./js/LockIcon.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import NotificationMessageProvider from './Provider/NotificationMessageProvider';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import isEmail from 'validator/es/lib/isEmail';
import { useNotification } from './Provider/NotificationMessageProvider';
import { ACCESS_TOKEN_SECRET,AVATAR_USER } from './env';
import { AuthContext } from './context/AuthContext';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import {Link} from 'react-router-dom';
const SignUpStudent= () => {
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");
    const [studentId, setstudentId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [registerUser] = useState(AuthContext);
    const navigate = useNavigate();
    // const [ alert, setAlert] = useState(null);

    const dispatch = useNotification();
    const [colorInput, setColorInput] = useState({
        studentId: 'default',
        password: 'default',
        confirmPassword: 'default',
        firstName: 'default',
        lastName: 'default',
        email: 'default',
        checkbox: 'default'
    });
    const [errorMessage, setErrorMessage] = useState({
        studentId: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        checkbox: false
    });
    const handleNewNotification = () => {
        dispatch({
            type: "ERROR",
            message: inputVal,
            // title: "Successfull Request"
        })
    }
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    const handleConfirmPassword = (e) => {
        if (isEmpty(confirmPassword.trim())) {
            setConfirmPassword(e.target.value.trim());
            setErrorMessage({ confirmPassword: "Hãy nhập xác nhận mật khẩu" })
            setColorInput({ confirmPassword: 'error' });
        } else {
            if (password.trim() === e.target.value.trim()) {
                setErrorMessage({ password: "" });
                setColorInput({ password: 'default' });
            } else {

                setErrorMessage({ confirmPassword: "Mật khẩu xác nhận của bạn không khớp với mật khẩu bạn nhập ở mục trên!" })
                setColorInput({ confirmPassword: 'error' });
            }
        }
    }
    const handlestudentIdChange = (e) => {
        setstudentId(e.target.value.trim());
        if (isEmpty(studentId.trim())) {
            setErrorMessage({ studentId: "Hãy nhập tên đăng nhập vào đây!" })
            setColorInput({ studentId: 'error' });
        } else {
            setErrorMessage({ studentId: "" });
            setColorInput({ studentId: 'default' });
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
        if (isEmpty(password.trim())) {
            setErrorMessage({ password: "Hãy nhập mật khẩu vào đây!" })
            setColorInput({ password: 'error' });
        } else {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
        if (isEmpty(email.trim())) {
            setErrorMessage({ email: "Hãy nhập email vào đây!" })
            setColorInput({ email: 'error' });
        } else {
            if (isEmail(email.trim())) {
                setErrorMessage({ email: "" });
                setColorInput({ email: 'default' });
            } else {
                setErrorMessage({ email: "Email của bạn không hợp lệ!. Vui lòng nhập lại email của bạn." });
                setColorInput({ email: 'error' });
            }

        }
    }
    const handleFirstName = (e) => {

        if (isEmpty(e.target.value.trim())) {
            setErrorMessage({ firstName: "Hãy nhập họ của bạn vào đây!" })
            setColorInput({ firstName: 'error' });
        } else {
            setFirstName(e.target.value.trim());
            setErrorMessage({ firstName: "" });
            setColorInput({ firstName: 'default' });
        }
    }
    const handleLastName = (e) => {

        if (isEmpty(e.target.value.trim())) {
            setErrorMessage({ lastName: "Hãy nhập tên của bạn vào đây!" })
            setColorInput({ lastName: 'error' });
        } else {
            setLastName(e.target.value.trim());
            setErrorMessage({ lastName: "" });
            setColorInput({ lastName: 'default' });
        }
    }
    const handleCheckBox = (e) => {
        if (checkBox === false) {
            setCheckBox(true);
        } else {
            setCheckBox(false);
        }
    }
    const validateInput = () => {
        handleConfirmPassword();
        handlestudentIdChange();
        handleFirstName();
        handleLastName();
        handlePasswordChange();
        handleEmailChange();
        handleCheckBox();

    };
    return (
        <div>
            {/* <NotificationMessageProvider /> */}
            <div className="">
                <div >
                    <div className="">
                        <h1>Đăng Ký</h1>
                        {/* <img src={AVATAR_USER} /> */}
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="">
                                    <input placeholder="Họ" className="firstname" onChange={handleFirstName} />
                                    <p> {errorMessage.firstName} </p>
                                </div>
                            </div>

                            <div className="">
                                <div className="">
                                    <input placeholder="Tên" className="lastname" onChange={handleLastName} />
                                    <p> {errorMessage.lastName} </p>
                                </div>
                            </div>
                        </div>
                        <input placeholder="Tên đăng nhập" name="studentId" className="studentId" onChange={handlestudentIdChange} type="text" />
                        <p> {errorMessage.studentId} </p>
                        <input placeholder="Email" name="email" className="email" onChange={handleEmailChange} type="email" />
                        <p> {errorMessage.email} </p>
                        <input placeholder="Mật khẩu" name="password" onChange={handlePasswordChange} />
                        <p> {errorMessage.password} </p>
                        <input placeholder="Xác nhận mật khẩu" name="confirmpassword" onChange={handleConfirmPassword} />
                        <p> {errorMessage.confirmPassword}</p>
                        <input type="checkbox" onChange={handleCheckBox} /><p>Tôi đồng ý với điều khoản và chính sách của chúng tôi</p> 
                        <p> {errorMessage.checkbox}</p>
                        <button onClick={"SignUpPost"}>Đăng ký</button>
                        {/* <p >Bạn đã có tài khoản ? <Link href="/login">Đăng nhập ngay </Link></p> */}
                    </div>
                </div>

            </div>
        </div>
    );
}
export default SignUpStudent;