import { Container, Card, Input, Spacer, Button, Text, Link } from '@nextui-org/react';
import './css/login.css';
import { UnLockIcon } from "./js/UnLockIcon.js";
import { LockIcon } from "./js/LockIcon.js";
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CryptoJS from 'crypto-js';
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './env';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
export default function Login() {
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const [colorInput, setColorInput] = useState({
        studentId: 'default',
        password: 'default',
    });
    const [errorMessage, setErrorMessage] = useState({
        studentId: '',
        password: '',
    });
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    // Event on change in input studentId
    const handleStudentIdChange = (e) => {
        if (e.target.value.split(' ').length > 1) {
            setErrorMessage({ studentId: "Tên đăng nhập không được có khoảng cách!" })
            setColorInput({ studentId: 'error' });
        } else {
            setStudentId(e.target.value.trim());
            validateInput();
        }
    }
    // Event on change in password 
    const handlePasswordChange = (e) => {
        const checkPassword = '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
        setPassword(e.target.value.trim());
        validateInput();
    }
    const validateInput = () => {
        if (!isEmpty(studentId.trim())) {
            setErrorMessage({ studentId: "" });
            setColorInput({ studentId: 'default' });
        } else {
            setErrorMessage({ studentId: "Hãy nhập tên đăng nhập" })
            setColorInput({ studentId: 'error' });
        }

        if (!isEmpty(password.trim())) {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        } else {
            setErrorMessage({ password: "Hãy nhập mật khẩu" })
            setColorInput({ password: 'error' });
        }

    };
    const LoginNotFoundToken = async() => {
        //Get document query parameters
        const q = query(collection(db, "users"), where("studentId", "==", studentId), where("password", "==", password));

        const querySnapshot = await getDocs(q);
        let checkQuery;
        let docHashUser;
        let idLogError;
        // console.log("querySnapshot",querySnapshot);
        querySnapshot.forEach((doc) => {
            if (doc.data().studentId === studentId) {
                checkQuery += 1;
                docHashUser += doc.data();
                idLogError += doc.data();
            }
            // console.log(doc.data())
        });
        if (checkQuery === 1) {
            //Create token user
            let stringDataOld = JSON.stringify(docHashUser);
            let token = CryptoJS.AES.encrypt(stringDataOld, ACCESS_TOKEN_SECRET).toString();
            localStorage.setItem("Authorization", `Bearer ${token}`);
            Navigate('/');
        } else {
            await addDoc(collection(db, "logs"), {
                // "filename": 'LoginStudent.js' ,
                "idError": idLogError,
                "message": "Xuất hiện data bị trùng ! ",
                "time": new Date().getTime(),
            });

        }
    }
    const LoginPost = async () => {
        validateInput();
        console.log(errorMessage);
        // if(errorMessage.)
        if (localStorage.getItem('Authorization')) {
            // Get data by token 
            let token = localStorage.getItem('Authorization').split(' ')[1];
            // console.log(token);
            let data = CryptoJS.AES.decrypt(token, ACCESS_TOKEN_SECRET);
            let checkQuery;
            let docHashUser;
            let idLogError;
            data = data.toString(CryptoJS.enc.Utf8);
            //Get document query parameters
            if (data.studentId === studentId) {
                const q = query(collection(db, "users"), where("studentId", "==", data.studentId), where("firstName", "==", data.firstName), where("lastName", "==", data.lastName), where("email", "==", data.email));

                const querySnapshot = await getDocs(q);

                // console.log("querySnapshot",querySnapshot);
                querySnapshot.forEach((doc) => {
                    checkQuery += 1;
                    docHashUser += doc.data();
                    idLogError += doc.data();
                    console.log("doc.data()",doc.data())
                });
            }else{
                localStorage.removeItem('Authorization');
                LoginNotFoundToken();
            }
        } else {
            LoginNotFoundToken();
        }

    }

    return (
        <Container className="container" xs>
            <Card css={{ mw: "600px", w: "80%", p: "$6" }}>
                <Card.Header css={{ mw: "550px", w: "90%", p: "$6" }} className="cardHeader">
                    <Text h1>Đăng nhập</Text>
                </Card.Header>
                {/* <Spacer y={2.5} /> */}
                <Card.Body css={{ mw: "550px", w: "90%", p: "$6" }} className="cardBody">
                    {/* <form className="formLogin" justify="center" align="center"> */}
                    <Spacer y={2.5} />
                    <Input rounded bordered color={colorInput.studentId} css={{ w: "95%" }} labelPlaceholder="Tên đăng nhập" className="studentid" onChange={handleStudentIdChange} initialValue="" type="text" required />
                    <Spacer y={0.5} />
                    <Text color="error"> {errorMessage.studentId}</Text>
                    <Spacer y={2.0} />
                    <Input.Password rounded bordered color={colorInput.password} css={{ w: "95%" }} labelPlaceholder="Mật khẩu" onChange={handlePasswordChange} initialValue="" type="password" required />
                    <Spacer y={0.5} />
                    <Text color="error"> {errorMessage.password} </Text>
                    <Spacer y={2.0} />
                    <Link href="/forgot-password">Quên mật khẩu ?</Link>
                    <Spacer y={0.5} />
                    <Button color="primary" onClick={LoginPost} css={{ w: "95%" }} >Đăng nhập</Button>
                    <Spacer y={1.5} />
                    <Card.Divider />
                    <Text >Bạn chưa có tài khoản ? <Link href="/signup">Đăng ký tại đây </Link></Text>
                </Card.Body>
            </Card>
        </Container>
    );
}