import React, { useState } from 'react';
import { Card, Input, Spacer, Container, Button, Text } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import {auth} from './Firebase'
import { createUserWithEmailAndPassword} from 'firebase/auth';
const Test = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState(false)
  
  const handleSubmit = () => {

    if(email && password && password.trim()  === passwordConfirm.trim())
    {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
       const user = userCredential.user
       alert("Thanh coong")
        // ...
      })
      .catch((error) => {
        setError(true)
        // ..
      })
    }
  
  }
  return (
    <main className="container">
      <Container xs>
        <Card css={{ mw: "500px", p: "$6" }} className="Card">
          <Card.Header css={{ mw: "450px", p: "$6" }} className="cardHeader">
            <Text h1>Đăng ký</Text>
            {error && <span>{error}</span>}
          </Card.Header>
          {/* <Spacer y={2.5} /> */}
          <Card.Body css={{ mw: "450px", p: "$0" }} className="cardBody">
            {/* <form className="formLogin" justify="center" align="center"> */}
            <form className='formLogin' >
              <Spacer y={2.5} />
              <Input css={{ w: "100%" }} labelPlaceholder="Email" type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={1.5} />
              <Input.Password css={{ w: "100%" }} labelPlaceholder="Mật khẩu" initialValue="" type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Spacer y={1.5} />
              <Input.Password css={{ w: "100%" }} labelPlaceholder="Nhập lại mật khẩu" initialValue="" type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {/* <Spacer y={2.5} />
            <Input.Password css={{ w: "100%" }} labelPlaceholder="Nhập lại mật khẩu" initialValue="" type="password"  ref={passswordConfirmRef}/> */}
              {/* </form> */}
              {/* <Spacer y={0.5} />
            <Link href="/forgot-password">Quên mật khẩu ?</Link> */}
              <Spacer y={1} />
              <Button color="gradient" onClick={handleSubmit}><Text h3 color="white">Đăng ký</Text></Button>
            </form>
            <Spacer y={1.5} />
            <Card.Divider />
            <p>Bạn đã có tài khoản ? <Link to="/"> Đăng nhập</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
export default Test;