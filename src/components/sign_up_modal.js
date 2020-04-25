import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText, Col} from 'reactstrap';
import axios from 'axios'

const SignUpModal = (props) => {
    const {modal, setModal} = props
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState('')
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [disabled, setDisabled] = useState('disabled')
    const [passwordConstraintMet, setpasswordConstraintMet] = useState(false)
    let checkpw = ''
    
    const checkAllField = () => {
        if(username === '' || email === '' || checkpw === 'incorrect' || passwordConstraintMet === false){
            setDisabled('disabled')

        }else{
            setDisabled('')
        }
    }

    const toggle = () => {
        // console.log(modal) 
        setModal(!modal);
    }
    const confirmPasswordFunc = (e) => {
        const password = document.getElementById('password').value
        setConfirmPassword(e.target.value)
        if(password === e.target.value){
            checkpw = 'correct'
            setValidConfirmPassword(true)
            setInvalidConfirmPassword(false) 
            checkAllField()
            // console.log(checkpw)
            
        }else{
            checkpw = 'incorrect'
            setValidConfirmPassword(false)
            setInvalidConfirmPassword(true)
            checkAllField()
        }
        
    }
    const showPasswordFunc = () => {
        console.log('clicked')
        if(passwordType === 'password'){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }
    const checkPassword = (e)=>{
        let passwordInput = e.target.value 
        setPassword(passwordInput)
        // console.log(passwordInput) 
        let specialCharRegex = RegExp('[^A-Za-z0-9]')
        let checkSpecialChar = specialCharRegex.test(passwordInput)
        console.log(checkSpecialChar)
        let uppercaseCharRegex = RegExp('[A-Z]')
        let checkUppercaseChar = uppercaseCharRegex.test(passwordInput)
        console.log(checkUppercaseChar)
        let lowercaseCharRegex = RegExp('[a-z]')
        let checkLowercaseChar = lowercaseCharRegex.test(passwordInput)

        //check if password constraint is met
        if(checkSpecialChar === true && checkUppercaseChar === true && checkLowercaseChar === true && passwordInput.length > 6){
            setpasswordConstraintMet(true)
            // console.log('passwordconstraint has been met')
        }else{
            setpasswordConstraintMet(false)
        }
        //disable or enable submit button
        checkAllField()
        
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
        console.log(username)
        console.log(password)
        console.log(email)
        axios({
            url: 'https://padelle.herokuapp.com/api/v1/users/signup',
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            data:{
                'username': username,
                'password': password,
                'email': email
            }
        })
        .then(res => {
            console.log('Success')
            console.log(res)
            console.log('********')
            toggle()
            
        })
        .catch(
            err => {
                console.log('Error')
                console.log(err)
                console.log(err.response)
                console.log('***********')

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
                        <Input type="text" name="username" id="username" value = {username} onRateChangeCapture = {(e)=> {setUsername(e.target.value)} }/>
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
                        <Input type="password" name="confirm_password" id="confirm_password" onChange = {(e)=>{confirmPasswordFunc(e)}} valid = {validConfirmPassword} invalid = {invalidConfirmPassword}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Input color="primary" type = "submit"  value = "Sign Up" id = "signUpBtn" disabled = {disabled}></Input>
                </ModalFooter>
            </Form>
        </Modal>
      </div>
    )
}

export default SignUpModal