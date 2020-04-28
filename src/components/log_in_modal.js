import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText, Col} from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify'

const LogInModal = (props) => {
    const {modal, setModal} = props
    const [passwordType, setPasswordType] = useState('password')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const validateForm = () =>{
        if(username !== "" && password !== "" ){
            return false
        }else{
            return true
        }
    }
    const toggle = () => {
        // console.log(modal) 
        setModal(!modal);
    }

    const showPasswordFunc = () => {
        console.log('clicked')
        if(passwordType === 'password'){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }

    const submitLogIn = (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        axios({
            url: 'https://padelle.herokuapp.com/api/v1/users/login',
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            data:{
                'username': username,
                'password': password
            }
        })
        .then(success => {
            console.log(success)
            console.log(success.data.auth_token)
            localStorage.setItem("token", success.data.auth_token)
            localStorage.setItem("admin_status", success.data.user.Admin_status )
            toast.info(`Welcome back ${success.data.user.username}!`)
            
            setModal(false)
        })
        .catch(error => {
            console.log(error)
            toast.warning(`Invalid login!`)
        })
        setUsername('')
        setPassword('')
    }

    return(
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Log In</ModalHeader>
            <Form onSubmit={(e)=>submitLogIn(e)}>
                <ModalBody>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value = {username} onInput={(e)=>setUsername(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type={passwordType} name="password" id="password" value = {password} onInput ={(e)=>setPassword(e.target.value)} />
                        <input type="checkbox"  id = "showpassword_check" onClick = {showPasswordFunc}/>
                        <Label for="showpassword_check">Show password</Label>
                    </FormGroup>
                        
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Input disabled={validateForm()} color="primary" type = "submit"  value = "Log In" id = "signUpBtn" ></Input>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default LogInModal