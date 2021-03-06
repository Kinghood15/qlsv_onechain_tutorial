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
    }, []);
    const handleConfirmPassword = (e) => {
        if (isEmpty(confirmPassword.trim())) {
            setConfirmPassword(e.target.value.trim());
            setErrorMessage({ confirmPassword: "H??y nh???p x??c nh???n m???t kh???u" })
            setColorInput({ confirmPassword: 'error' });
        } else {
            if (password.trim() === e.target.value.trim()) {
                setErrorMessage({ password: "" });
                setColorInput({ password: 'default' });
            } else {

                setErrorMessage({ confirmPassword: "M???t kh???u x??c nh???n c???a b???n kh??ng kh???p v???i m???t kh???u b???n nh???p ??? m???c tr??n!" })
                setColorInput({ confirmPassword: 'error' });
            }
        }
    }
    const handlestudentIdChange = (e) => {
        setstudentId(e.target.value.trim());
        if (isEmpty(studentId.trim())) {
            setErrorMessage({ studentId: "H??y nh???p t??n ????ng nh???p v??o ????y!" })
            setColorInput({ studentId: 'error' });
        } else {
            setErrorMessage({ studentId: "" });
            setColorInput({ studentId: 'default' });
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
        if (isEmpty(password.trim())) {
            setErrorMessage({ password: "H??y nh???p m???t kh???u v??o ????y!" })
            setColorInput({ password: 'error' });
        } else {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
        if (isEmpty(email.trim())) {
            setErrorMessage({ email: "H??y nh???p email v??o ????y!" })
            setColorInput({ email: 'error' });
        } else {
            if (isEmail(email.trim())) {
                setErrorMessage({ email: "" });
                setColorInput({ email: 'default' });
            } else {
                setErrorMessage({ email: "Email c???a b???n kh??ng h???p l???!. Vui l??ng nh???p l???i email c???a b???n." });
                setColorInput({ email: 'error' });
            }

        }
    }
    const handleFirstName = (e) => {

        if (isEmpty(e.target.value.trim())) {
            setErrorMessage({ firstName: "H??y nh???p h??? c???a b???n v??o ????y!" })
            setColorInput({ firstName: 'error' });
        } else {
            setFirstName(e.target.value.trim());
            setErrorMessage({ firstName: "" });
            setColorInput({ firstName: 'default' });
        }
    }
    const handleLastName = (e) => {

        if (isEmpty(e.target.value.trim())) {
            setErrorMessage({ lastName: "H??y nh???p t??n c???a b???n v??o ????y!" })
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
                        <h1>????ng K??</h1>
                        {/* <img src={AVATAR_USER} /> */}
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="">
                                    <input placeholder="H???" className="firstname" onChange={handleFirstName} />
                                    <p> {errorMessage.firstName} </p>
                                </div>
                            </div>

                            <div className="">
                                <div className="">
                                    <input placeholder="T??n" className="lastname" onChange={handleLastName} />
                                    <p> {errorMessage.lastName} </p>
                                </div>
                            </div>
                        </div>
                        <input placeholder="T??n ????ng nh???p" name="studentId" className="studentId" onChange={handlestudentIdChange} type="text" />
                        <p> {errorMessage.studentId} </p>
                        <input placeholder="Email" name="email" className="email" onChange={handleEmailChange} type="email" />
                        <p> {errorMessage.email} </p>
                        <input placeholder="M???t kh???u" name="password" onChange={handlePasswordChange} />
                        <p> {errorMessage.password} </p>
                        <input placeholder="X??c nh???n m???t kh???u" name="confirmpassword" onChange={handleConfirmPassword} />
                        <p> {errorMessage.confirmPassword}</p>
                        <input type="checkbox" onChange={handleCheckBox} /><p>T??i ?????ng ?? v???i ??i???u kho???n v?? ch??nh s??ch c???a ch??ng t??i</p> 
                        <p> {errorMessage.checkbox}</p>
                        <button onClick={"SignUpPost"}>????ng k??</button>
                        {/* <p >B???n ???? c?? t??i kho???n ? <Link href="/login">????ng nh???p ngay </Link></p> */}
                    </div>
                </div>

            </div>
        </div>
    );
}
export default SignUpStudent;