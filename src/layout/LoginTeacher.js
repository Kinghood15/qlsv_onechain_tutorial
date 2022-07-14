import { Container, Card, Input, Spacer, Button, Text, Link } from '@nextui-org/react';
import './css/login.css';
import { UnLockIcon } from "./js/UnLockIcon.js";
import { LockIcon } from "./js/LockIcon.js";
import { onSnapshot, getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, auth } from "./Firebase";
import { isEmpty } from "validator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from './Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
export default function LoginTeacher() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const userCollectionRef = collection(db, "users");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const { signIn } = UserAuth();
    const [inputForm, setInputForm] = useState({
        'email':'',
        'password':'',
    });
    const [colorInput, setColorInput] = useState({
        email: 'default',
        password: 'default',
    });
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        password: '',
    });
    useEffect(() => {
        // const getUsers = async () => {
        //     const data = await getDocs(userCollectionRef);
        //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // };
        // getUsers();
    }, []);
    // Event on change in input username
    const handleUserNameChange = (e) => {
        if (e.target.value.split(' ').length > 1) {
            setErrorMessage({ email: "Tên đăng nhập không được có khoảng cách!" })
            setColorInput({ email: 'error' });
        } else {
            setEmail(e.target.value.trim());
            validateInput();
        }
        // console.log("email",email);
    }
    // Event on change in password 
    const handlePasswordChange = (e) => {
        const checkPassword = '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
        setPassword(e.target.value.trim());
        validateInput();
    }
    const validateInput = () => {
        if (!isEmpty(email.trim())) {
            setErrorMessage({ email: "" });
            setColorInput({ email: 'default' });
        } else {
            setErrorMessage({ email: "Hãy nhập tên đăng nhập" })
            setColorInput({ email: 'error' });
        }

        if (!isEmpty(password.trim())) {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        } else {
            setErrorMessage({ password: "Hãy nhập mật khẩu" })
            setColorInput({ password: 'error' });
        }

    };

    function handleChange(env) {
        const target = env.target;
        // console.log("target",target);
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        // console.log("name: " + name, target.name);
        setInputForm({ ...inputForm, [name]: value });
        // console.log("isInputForm", inputForm);
    }
    const onReset = (value) => {
        setInputForm({ ...value });
    }
    const LoginPost = async(e) => {
        // validateInput();
        // console.log(errorMessage);
        e.preventDefault();
        try {
            if(await signIn(inputForm.email, inputForm.password)){
                alert("Đăng nhập thành công !")
                // setTimeout( Navigate('/giao-vien/sinh-vien'),5000);
                navigate('/giao-vien/sinh-vien');
            }else alert("Đăng nhập thất bại!")
            // }
        } catch (error) {
            alert("Đăng nhập không thành công") 
        }
        // setErrorMessage({""})
        // if(errorMessage.)

    }
    return (
        // <Container className="containerLogin" xs>
        //     <Card css={{ mw: "600px", w:"80%", p: "$6" }}>
        //         <Card.Header css={{ mw: "550px",w:"90%", p: "$6" }} className="cardHeader">
        //             <Text h1>Đăng nhập</Text>
        //         </Card.Header>
        //         {/* <Spacer y={2.5} /> */}
        //         <Card.Body css={{ mw: "550px",w:"90%",p: "$6" }} className="cardBody">
        //             {/* <form className="formLogin" justify="center" align="center"> */}
        //             <Spacer y={2.5} />
        //             <Input rounded bordered color={colorInput.email} css={{ w: "95%" }} labelPlaceholder="Tên đăng nhập" className="username" onChange={handleUserNameChange} initialValue="" type="text" required />
        //             <Spacer y={0.5} />
        //             <Text color="error"> {errorMessage.email}</Text>
        //             <Spacer y={2.0} />
        //             <Input.Password rounded bordered color={colorInput.password} css={{ w: "95%" }} labelPlaceholder="Mật khẩu" onChange={handlePasswordChange} initialValue="" type="password" required />
        //             <Spacer y={0.5} />
        //             <Text color="error"> {errorMessage.password} </Text>
        //             <Spacer y={2.0} />
        //             <Link href="/forgot-password">Quên mật khẩu ?</Link>
        //             <Spacer y={0.5} />
        //             <Button color="primary" onClick={LoginPost}  css={{ w: "95%" }} >Đăng nhập</Button>
        //             <Spacer y={1.5} />
        //             <Card.Divider />
        //             <Text >Bạn chưa có tài khoản ? <Link href="/signup">Đăng ký tại đây </Link></Text>
        //         </Card.Body>
        //     </Card>
        // </Container>
        <>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form onChange={handleChange} onSubmit={LoginPost}>
                                {/* <!-- Email input --> */}
                                <div className="mb-6">
                                    <h1>Đăng nhập tài khoản giáo viên</h1>
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput1"
                                        name="email"
                                        placeholder="Email address"
                                    />
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    {/* <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                                        >Nhớ mật khẩu</label
                                        >
                                    </div> */}
                                    <a href="#!" className="text-gray-800">Quên mật khẩu?</a>
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Đăng nhập
                                    </button>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Bạn chưa có tài khoản ? 
                                        <a
                                            href="/giao-vien/dang-ky"
                                            className="px-2 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        >Đăng ký tài khoản tại đây</a
                                        >
                                    </p>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Bạn chưa có tài khoản ? (Giao diện Multiple page) 
                                        <a
                                            href="/giao-vien/dang-ky"
                                            className="px-2 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        >Đăng ký tài khoản tại đây</a
                                        >
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}