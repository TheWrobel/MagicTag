import React, {useState} from 'react'
import axios from 'axios'


import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'



const Login = ({...props}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = async (login, pw) => {
        try{
            props.setLoading(true);
            const data = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/auth', {
                "grantType": "password",
                "password": pw, 
                "username": login,
            })
            console.log(data.data);
            props.setHeaders({
                api_key: data.data.token,
                "accept": "application/json",
                "content-type": "application/json;charset=UTF-8"
              })
            props.setLoading(false);
            props.setLoged(true);
        }
        catch(error) {
            console.log(error)
            alert("Błąd logowania:" + error)
            props.setLoading(false);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await auth(username, password);
    }
    return (
        <div className="LoginForm">
            <Container className="p-10 mt-4" style={{width: "350px"}}>
            <Form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>  
                <FloatingLabel
                    controlId="floatingInput"
                    label="Login"
                    className="mb-3"
                >
                <Form.Control type="Login" placeholder="Login" onChange={e => setUsername(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </FloatingLabel>
                <Button variant="primary" type="submit" style={{minWidth: "150px", alignSelf: "center"}}>
                    Sign In
                </Button>
            </Form>
            </Container>            
        </div>
    )
}

export default Login
