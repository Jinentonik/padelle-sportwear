import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText, Col} from 'reactstrap';

const ShoppingCart = (props) => {
    const {modal, toggle} = props
    
    return( 
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Log In</ModalHeader>
                <ModalBody>
                    
                        
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Input color="primary" type = "submit"  value = "Log In" id = "signUpBtn" ></Input>
                </ModalFooter>
        </Modal>
    )
}

export default ShoppingCart