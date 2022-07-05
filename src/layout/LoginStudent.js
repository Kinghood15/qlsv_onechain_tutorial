import './css/login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CryptoJS from 'crypto-js';
import { ACCESS_TOKEN_SECRET, AVATAR_USER } from './env';
import { formatDate } from './js/FormatDate';
import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import {Link } from 'react-router-dom';
export default function Login() {
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const navigate = useNavigate();
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
        var checkQuery = 0;
        let docHashUser;
        var idLogError='';
        console.log(idLogError);
        querySnapshot.forEach((doc) => {
            if (Object(doc.data()).studentId === studentId) {
                checkQuery += 1;
                docHashUser = {
                    studentId: Object(doc.data()).studentId,
                    firstName: Object(doc.data()).firstName,
                    lastName: Object(doc.data()).lastName,
                    email: Object(doc.data()).email,
                    avatar: Object(doc.data()).avatar,
                };
                idLogError += Object(doc.data()).studentId;
            }
        });
        console.log(checkQuery,"checkQuery")
        if (checkQuery === 1) {
            
            //Create token user
            let stringDataOld = JSON.stringify(docHashUser);
            let token = CryptoJS.AES.encrypt(stringDataOld, ACCESS_TOKEN_SECRET).toString();
            localStorage.setItem("Authorization", ` Bearer ${token}`);
            navigate('/');
        } else {
            await addDoc(collection(db, "logs"), {
                // "filename": 'LoginStudent.js' ,
                "idError": idLogError,
                "message": "Xuất hiện data bị trùng ! ",
                "time": formatDate(new Date()),
            });

        }
    }
    const LoginPost = async () => {
        validateInput();
        console.log(errorMessage);
        // if(errorMessage.)
        if (localStorage.getItem('Authorization')) {
            console.log("localStorage.getItem('Authorization') success");
            // Get data by token 
            let token = localStorage.getItem('Authorization').split(' ')[1];
            // console.log(token);
            let data = CryptoJS.AES.decrypt(token, ACCESS_TOKEN_SECRET);
            // const checkQuery = 0;
            let docHashUser;
            let idLogError;
            data = data.toString(CryptoJS.enc.Utf8);
            let dataJSON = JSON.parse(data);
            
            //Get document query parameters
            if (Object(dataJSON).studentId === studentId) {
                console.log("Object(dataJSON).studentId === studentId");
                const q = query(collection(db, "users"), where("studentId", "==", Object(dataJSON).studentId), where("firstName", "==", Object(dataJSON).firstName), where("lastName", "==", Object(dataJSON).lastName), where("email", "==", Object(dataJSON).email));

                const querySnapshot = await getDocs(q);
                let checkQuery = 0;
                // console.log("querySnapshot",querySnapshot);
                querySnapshot.forEach((doc) => {
                    checkQuery+=1;
                    docHashUser += doc.data();
                    idLogError += doc.data();
                    console.log("doc.data() in localStorage",doc.data())
                });
                // console.log("Check query",checkQuery);
                if(checkQuery === 1){
                    navigate("/");
                }else{
                    console.log("await addDoc localStorage.getItem")
                    await addDoc(collection(db, "logs"), {
                        // "filename": 'LoginStudent.js' ,
                        "idError": idLogError,
                        "message": "Xuất hiện data bị trùng ! ",
                        "time": new Date().getTime(),
                    });
                }
            }else{
                console.log("data.studentId !== studentId");
                localStorage.removeItem('Authorization');
                LoginNotFoundToken();
            }
        } else {
            LoginNotFoundToken();
        }

    }

    return (
        <div className="container" xs>
            <div css={{ mw: "600px", w: "80%", p: "$6" }}>
                <div css={{ mw: "550px", w: "90%", p: "$6" }} className="cardHeader">
                    {/* <Text h1>Đăng nhập</Text> */}
                </div>
                {/* <Spacer y={2.5} /> */}
                <div css={{ mw: "550px", w: "90%", p: "$6" }} className="cardBody">
                    <input rounded bordered color={colorInput.studentId} css={{ w: "95%" }} labelPlaceholder="Tên đăng nhập" className="studentid" onChange={handleStudentIdChange} initialValue="" type="text" required />
                    
                    <p color="error"> {errorMessage.studentId}</p>
                    
                    {/* <Input.Password rounded bordered color={colorInput.password} css={{ w: "95%" }} labelPlaceholder="Mật khẩu" onChange={handlePasswordChange} initialValue="" type="password" required /> */}
                    
                    {/* <Text color="error"> {errorMessage.password} </Text> */}
                    
                    <Link href="/forgot-password">Quên mật khẩu ?</Link>
                    
                    <button color="primary" onClick={LoginPost} css={{ w: "95%" }} >Đăng nhập</button>
                    
         
                    <p >Bạn chưa có tài khoản ? <Link href="/signup">Đăng ký tại đây </Link></p>
                </div>
            </div>
        </div>
    );
}