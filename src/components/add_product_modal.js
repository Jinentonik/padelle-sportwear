import React, {useState} from 'react'
import axios from 'axios'
import { Container, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
const AddProductModal = (props) => {
    const {modal, setModal,toggle} = props
    const [productType, setProductType] = useState('')
    const [productName, setProductName] = useState('')
    const [productColor, setProductColor] = useState('')
    const [productSize, setProductSize] = useState('XS')
    const [stockQty, setStockQty] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [imageFile, setImageFile] = useState(null)
    let token = localStorage.getItem('token')

    const handleFile = (e) => {
        setImageFile(e.target.files[0])
        // setPreviewImage(URL.createObjectURL(e.target.files[0]))
        // setMessage('uploaded')
    }

    const addProductFunc = (e) => {
        e.preventDefault()
        console.log('token', token)
        console.log(productName,productType,productSize,productPrice,stockQty,imageFile.name)
        
        axios({
            url: 'https://padelle.herokuapp.com//api/v1/items/add_item',
            method: "POST",
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data:{
                "name": productName,
                "product_type": productType,
                "size": productSize,
                "price": productPrice,
                "stock": stockQty,
                "image": imageFile.name
            }
        })
        // axios({
        //     url: 'https://padelle.herokuapp.com/api/v1/items/upload_item_image',
        //     method: "POST",
        //     data: formData,
            
            
        // })
        .then(success => {
            let formData = new FormData()
            formData.append("img", imageFile)
            console.log(token)
            axios({
            url: 'https://padelle.herokuapp.com/api/v1/items/upload_item_image',
            method: "POST",
            data: formData,
            headers:{
                
                "Authorization": `Bearer ${token}`
            }
            })
            .then(success =>{
                console.log(success)
            }
            )
            .catch(err=>console.log(err))
            console.log('successfully upload image')
            console.log(success)
            setProductType('')
            setProductName('')
            setProductSize('')
            setProductColor('')
            setProductPrice('')
            setStockQty('')
            setImageFile(null)
            toggle()
            // window.location.reload()
        })
        .catch(err => {
            console.log('error happen')
            console.log(err)
        })
    }

    return(
        <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e)=>addProductFunc(e)}>
                        <FormGroup>
                            <Label for="productType">Product Type</Label>
                            <Input type="text" name="productType" id="productType" value = {productType} onChange = {(e)=>setProductType(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productName">Product Name</Label>
                            <Input type="text" name="name" id="productName" value = {productName} onChange = {(e)=>setProductName(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="color">Color</Label>
                            <Input type="text" name="color" id="color" value = {productColor} onChange = {(e)=>setProductColor(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="size">Size</Label>
                            <Input type="select" name="size" id="size" onInput = {(e)=> setProductSize(e.target.value)}>
                            <option value = "XS">XS</option>
                            <option value = "S">S</option>
                            <option value = "M">M</option>
                            <option value = "L">L</option>
                            <option value = "XL">XL</option>
                            <option value = "XXL">XXL</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="stock">Stock Quantity</Label>
                            <Input type="number" name="stock" id="stock" value = {stockQty} onChange = {(e)=>setStockQty(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="number" name="price" id="price" value = {productPrice} onChange = {(e)=>setProductPrice(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="productImage">Product image</Label>
                            <Input type="file" name="image" id="productImage" onChange = {(e) => handleFile(e)} />
                            <FormText color="muted">
                                One image only.
                            </FormText>
                        </FormGroup>
                        <Input type="submit" value = "Submit"></Input>
                    </Form>
                </ModalBody>
                
            </Modal>
    )
}

export default AddProductModal