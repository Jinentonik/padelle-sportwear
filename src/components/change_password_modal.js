import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText, Col} from 'reactstrap';


const ChangePasswordModal = (props) => {
    const {modal,setModal} = props
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')

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

    const validateForm = () => {
        if(password === "" || newPassword === "" ){
            return true
        }else{
            return false
        }
    }
    
    const changePassword = (e) => {
        e.preventDefault()
        console.log('change password')
    }

    const validPasswordFunc = (e) => {
        if(password === confirmPassword){
            return true
            
        }else{
            return false
        }
        
    }

    const invalidPasswordFunc = () => {
        console.log(password, confirmPassword)
        if(password === confirmPassword){
            return false
        }else{
            return true
        }
        
    }

    return(
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Log In</ModalHeader>
            <Form onSubmit={(e)=>changePassword(e)}>
                <ModalBody>
                    <FormGroup>
                        <Label for="oldPassword">Old Password</Label>
                        <Input type="text" name="oldPassword" id="oldPassword" value = {password} onInput={(e)=>setPassword(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="newPassword">New Password</Label>
                        <Input type={passwordType} name="newPassword" id="newPassword" value = {newPassword} onInput ={(e)=>setNewPassword(e.target.value)} />
                        <input type="checkbox"  id = "showpassword_check" onClick = {showPasswordFunc}/>
                        <Label for="showpassword_check">Show password</Label>
                    </FormGroup>
                    <FormGroup>
                        
                        <Label for="confirm_password">Confirm New Password</Label>
                        <Input type="password" name="confirm_password" id="confirm_password" onChange = {(e)=>{setConfirmPassword(e.target.value)}} valid = {validPasswordFunc()} invalid = {invalidPasswordFunc()}/>
                    </FormGroup>
                        
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Input disabled={validateForm()} color="primary" type = "submit"  value = "Save" id = "changePasswordBtn" ></Input>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal