import React, { useState } from 'react'
import { Container, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import axios from 'axios'

const EditAddressModal = (props) => {
    const {modal, setModal} = props
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [country, setCountry] = useState('')
    const [token] = useState(localStorage.getItem('token'))
    
    const toggle = () =>{
        setModal(!modal)
        setAddress('')
        setZipcode('')
        setCountry('')
    }

    const saveAddress = (e) => {
        e.preventDefault()
        console.log('address saved')
        console.log(address,zipcode,country)
        axios({
            url:'https://padelle.herokuapp.com/api/v1/users/address',
            method:'POST',
            headers:{
                "Authorization": `Bearer ${token}`
            },
            data:{
                "address": address,
                "country": country,
                "zipcode": zipcode
            }
        })
        .then(
            success=>{
                console.log(success)
                toggle()
                window.location.reload()
            }
        )
        .catch(
            err=>console.log(err.response)
        )
    }

    return(
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Edit Your Address</ModalHeader>
            <ModalBody>
                <Form onSubmit={(e)=>saveAddress(e)}>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value = {address} onChange = {(e)=>setAddress(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="zipcode">Zipcode</Label>
                        <Input type="text" name="zipcode" id="zipcode" value = {zipcode} onChange = {(e)=>setZipcode(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" value = {country} onChange = {(e)=>setCountry(e.target.value)}  />
                    </FormGroup>
                    <Input type="submit" value = "Save"></Input>
                </Form>
            </ModalBody>
                
            </Modal>
    )
}

export default EditAddressModal