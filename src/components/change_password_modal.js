import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText, Col} from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/loading'



const ChangePasswordModal = (props) => {
    const {modal,setModal} = props
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [passwordConstraintMet, setpasswordConstraintMet] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggle = () => {
        // console.log(modal) 
        setModal(!modal);
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    const showPasswordFunc = () => {
        // console.log('clicked')
        if(passwordType === 'password'){
            setPasswordType('text')
        }else{
            setPasswordType('password')
        }
    }

    const validateForm = () => {
        if(newPassword === "" || confirmPassword === "" || newPassword !== confirmPassword || passwordConstraintMet === false){
            return true
        }else{
            return false
        }
    }
    
    const changePassword = (e) => {
        e.preventDefault()
        setLoading(true)
        // console.log('change password')
        axios({
            url:'https://padelle.herokuapp.com/api/v1/users/password',
            method:'POST',
            headers:{
                "Authorization": `Bearer ${token}`
            },
            data:{
                "password": newPassword
            }
        })
        .then(success=>{
            // console.log(success)
            setLoading(false)
            toggle()
            setPassword('')
            setNewPassword('')
            setConfirmPassword('')
            toast.success('You have successfully changed your password',{position:"top-right"})

        })
        .catch(err=>console.log(err.response))
    }

    const validPasswordFunc = (e) => {
        if(newPassword === confirmPassword){
            return true
            
        }else{
            return false
        }
        
    }

    const invalidPasswordFunc = () => {
        if(newPassword === confirmPassword){
            return false
        }else{
            return true
        }
        
    }

    const checkPassword = (e)=>{
        let passwordInput = e.target.value 
        setNewPassword(passwordInput)
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
    if(loading){
        return(
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Log In</ModalHeader>
                    <ModalBody>
                        <Loading></Loading>
                            
                    </ModalBody>
            </Modal>
        )
    }else{
        return(
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Log In</ModalHeader>
                
                <Form onSubmit={(e)=>changePassword(e)}>
                    <ModalBody>
                        
                        {/* <FormGroup>
                            <Label for="oldPassword">Old Password</Label>
                            <Input type={passwordType} name="oldPassword" id="oldPassword" value = {password} onInput={(e)=>setPassword(e.target.value)}/>
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input type={passwordType} name="newPassword" id="newPassword" value = {newPassword} onInput ={(e)=>checkPassword(e)} />
                            
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
                            
                            <Label for="confirm_password">Confirm New Password</Label>
                            <Input type={passwordType} name="confirm_password" id="confirm_password" onChange = {(e)=>{setConfirmPassword(e.target.value)}} valid = {validPasswordFunc()} invalid = {invalidPasswordFunc()}/>
                        </FormGroup>
                        <input type="checkbox"  id = "showpassword_check" onClick = {showPasswordFunc}/>
                        <Label for="showpassword_check">Show all password</Label>
                            
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                        <Input disabled={validateForm()} color="primary" type = "submit"  value = "Save" id = "changePasswordBtn" ></Input>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}
    

export default ChangePasswordModal