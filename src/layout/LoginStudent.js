import { Container, Card, Input, Spacer, Button, Text, Link } from '@nextui-org/react';
import './css/login.css';
import { UnLockIcon } from "./js/UnLockIcon.js";
import { LockIcon } from "./js/LockIcon.js";
import { onSnapshot, getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db,auth } from "./Firebase";
import { isEmpty } from "validator";
import { signInWithEmailAndPassword  } from "firebase/auth";
export default function Login() {
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const [colorInput, setColorInput] = useState({
        userName: 'default',
        password: 'default',
    });
    const [errorMessage, setErrorMessage] = useState({
        userName: '',
        password: '',
    });
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    // Event on change in input username
    const handleUserNameChange = (e) => {
        if(e.target.value.split(' ').length > 1){
            setErrorMessage({ userName: "Tên đăng nhập không được có khoảng cách!" })
            setColorInput({ userName: 'error' });
        }else{
            setUserName(e.target.value.trim());
            validateInput();
        }
        // console.log("userName",userName);
    }
    // Event on change in password 
    const handlePasswordChange = (e) => {
        const checkPassword = '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
        setPassword(e.target.value.trim());
        validateInput();
    }
    const validateInput = () => {
        // console.log(userName.trim().length);
        console.log(userName);
        console.log(password);
        if (!isEmpty(userName.trim())) {
            setErrorMessage({ userName: "" });
            setColorInput({ userName: 'default' });
        } else {
            setErrorMessage({ userName: "Hãy nhập tên đăng nhập" })
            setColorInput({ userName: 'error' });
        }
       
        if (!isEmpty(password.trim())) {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        } else {
            setErrorMessage({ password: "Hãy nhập mật khẩu" })
            setColorInput({ password: 'error' });
        }
        
    };
    const LoginPost = () => {
        validateInput();
        console.log(errorMessage);
        // if(errorMessage.)

    }
    return (
        <Container className="container" xs>
            <Card css={{ mw: "600px", w:"80%", p: "$6" }}>
                <Card.Header css={{ mw: "550px",w:"90%", p: "$6" }} className="cardHeader">
                    <Text h1>Đăng nhập</Text>
                </Card.Header>
                {/* <Spacer y={2.5} /> */}
                <Card.Body css={{ mw: "550px",w:"90%",p: "$6" }} className="cardBody">
                    {/* <form className="formLogin" justify="center" align="center"> */}
                    <Spacer y={2.5} />
                    <Input rounded bordered color={colorInput.userName} css={{ w: "95%" }} labelPlaceholder="Tên đăng nhập" className="username" onChange={handleUserNameChange} initialValue="" type="text" required />
                    <Spacer y={0.5} />
                    <Text color="error"> {errorMessage.userName}</Text>
                    <Spacer y={2.0} />
                    <Input.Password rounded bordered color={colorInput.password} css={{ w: "95%" }} labelPlaceholder="Mật khẩu" onChange={handlePasswordChange} initialValue="" type="password" required />
                    <Spacer y={0.5} />
                    <Text color="error"> {errorMessage.password} </Text>
                    <Spacer y={2.0} />
                    <Link href="/forgot-password">Quên mật khẩu ?</Link>
                    <Spacer y={0.5} />
                    <Button color="primary" onClick={LoginPost}  css={{ w: "95%" }} >Đăng nhập</Button>
                    <Spacer y={1.5} />
                    <Card.Divider />
                    <Text >Bạn chưa có tài khoản ? <Link href="/signup">Đăng ký tại đây </Link></Text>
                </Card.Body>
            </Card>
        </Container>
    );
}