import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, Row, Col} from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from './loading'

const SignUpModal = (props) => {
    const {modal, setModal, logInModal, setLogInModal} = props
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [passwordConstraintMet, setpasswordConstraintMet] = useState(false)
    const [userNameValidity, setUserNameValidity] = useState(false)
    const [userNameLoading, setUserNameLoading] = useState(false)
    
    const checkAllField = () => {
        //set disabled function of submit button to true or false
        if(username === '' || email === '' || password !== confirmPassword || passwordConstraintMet === false || userNameValidity === false){
            return true
        }
        else{
            return false
        }
        
    }
    //toggle log in modal and close sign up modal
    const toggleLogInModal = () => {
        setModal(!modal)
        setLogInModal(!logInModal)
    }

    //toggle sign up modal
    const toggle = () => {
        setModal(!modal);
        setPasswordType('password')
        setUsername('')
        setPassword('')
        setEmail('')
        setConfirmPassword('')
    }

    const userNameCheck = (value) => {
        setUsername(value)
        setUserNameLoading(true)
        axios({
            url:`https://padelle.herokuapp.com/api/v1/users/check_name/${value}`
        })
        .then(success=>{
            console.log(success)
            if(success.data.message === 'This username exists'){
                setUserNameValidity(false)
                setUserNameLoading(false)
            }else{
                setUserNameValidity(true)
                setUserNameLoading(false)
            }
        })
        .catch(
            err=>console.log(err.response)
        )
    }

    const invalidPasswordFunc = () => {
        if(password === confirmPassword){
            return false
        }else{
            return true
        }
        
    }

    const validPasswordFunc = (e) => {
        if(password === confirmPassword){
            return true
            
        }else{
            return false
        }
        
    }
    const showPasswordFunc = () => {
        if(passwordType === 'password'){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }
    const checkPassword = (e)=>{
        let passwordInput = e.target.value 
        setPassword(passwordInput)
        let specialCharRegex = RegExp('[^A-Za-z0-9]')
        let checkSpecialChar = specialCharRegex.test(passwordInput)
        let uppercaseCharRegex = RegExp('[A-Z]')
        let checkUppercaseChar = uppercaseCharRegex.test(passwordInput)
        let lowercaseCharRegex = RegExp('[a-z]')
        let checkLowercaseChar = lowercaseCharRegex.test(passwordInput)

        //check if password constraint is met
        if(checkSpecialChar === true && checkUppercaseChar === true && checkLowercaseChar === true && passwordInput.length > 6){
            setpasswordConstraintMet(true)
        }else{
            setpasswordConstraintMet(false)
        }
        //disable or enable submit button
        
        //check input length
        if(passwordInput.length > 6){
            document.getElementById('charLength').style.color = "green"
            
        }else{
            document.getElementById('charLength').style.color = "red"
            
        }
        //check input special char
        if(checkSpecialChar){
            document.getElementById('specialChar').style.color = "green"
        }else{
            document.getElementById('specialChar').style.color = "red"
        }
        //check input upper char
        if(checkUppercaseChar){
            document.getElementById('upChar').style.color = "green"
        }else{
            document.getElementById('upChar').style.color = "red"
        }
        //check input lower char
        if(checkLowercaseChar){
            document.getElementById('lowChar').style.color = "green"
        }else{
            document.getElementById('lowChar').style.color = "red"
        }


    }
    const signUp = (e) => {
        e.preventDefault()
        axios({
            url: 'https://padelle.herokuapp.com/api/v1/users/signup',
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            data:{
                'username': username,
                'password': password,
                'email': email,
                'mailing_list': true
            }
        })
        .then(res => {
            toast.success('You have successfully sign up',{position:"top-right"})
            toggle()
            setLogInModal(true)
            
        })
        .catch(
            err => {
                console.log(err.response)
                toast.warning(`Something's wrong.`)

            }
        )
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')

    }
    
    return(
        <div>
        
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
            <Form onSubmit = {(e)=>signUp(e)}>
                <ModalBody>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value = {username} onChange = {(e)=> {userNameCheck(e.target.value)} } valid = {userNameValidity} invalid = {!userNameValidity}/>
                        {
                            userNameLoading?
                            <Row>
                                <Col xs="2">
                                    <Loading width = "18px" height = "18px" ></Loading>
                                
                                </Col>
                                <Col xs="10">
                                    <div style={{width:'10px', height:'10px'}}></div>
                                </Col>
                            </Row>:
                            userNameValidity?
                                <FormFeedback valid={userNameValidity}>This username is available</FormFeedback>:
                                <FormFeedback>This username is not available</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" value = {email} onChange = {(e)=>{setEmail(e.target.value)}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input minLength = "6" maxLength = "50" type={passwordType} name="password" id="password" onChange = {(e)=>checkPassword(e)} />
                        <input type="checkbox" onClick={showPasswordFunc} id = "showpassword_check" />
                        <Label for="showpassword_check">Show password</Label>
                    </FormGroup>
                        
                    <FormGroup row>
                        <Col xs="12" md ="6">
                            <p id="charLength" style = {{fontSize:"14px"}}>More than 6 characters</p>
                        </Col>
                        <Col xs="12" md ="6">
                            <p id="upChar" style = {{fontSize:"14px"}}>At least 1 uppercase </p>
                        </Col>
                        <Col xs="12" md ="6">
                            <p id="lowChar" style = {{fontSize:"14px"}}>At least 1 lowercase</p>
                        </Col>
                        <Col xs="12" md ="6">
                            <p id="specialChar" style = {{fontSize:"14px"}}>At least 1 specialcase</p>
                        </Col>
                        
                    </FormGroup>
                    <FormGroup>
                        
                        <Label for="confirm_password">Confirm Password</Label>
                        <Input type="password" name="confirm_password" id="confirm_password" onChange = {(e)=>{setConfirmPassword(e.target.value)}} valid = {validPasswordFunc()} invalid = {invalidPasswordFunc()}/>
                    </FormGroup>
                    <a href="#" onClick={toggleLogInModal}>Already have an account?</a>
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Input color="primary" type = "submit"  value = "Sign Up" id = "signUpBtn" disabled = {checkAllField()}></Input>
                </ModalFooter>
            </Form>
        </Modal>
      </div>
    )
}

export default SignUpModal