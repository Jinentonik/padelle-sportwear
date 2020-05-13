import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Table} from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from './loading'
import '../App.css';

const AdminAddProductDetailsModal = (props) =>{
    const {modal, setModal, selectProductName, selectProductType, productDetailsList, setProductDetailsList} = props
    const [imageFile, setImageFile] = useState('')
    const blankProduct = {image_url:'', color:'', size:'', stock:'', price:''}
    const [productColor, setProductColor] = useState('')
    const [productSize, setProductSize] = useState('XXS')
    const [productStock, setProductStock] = useState(0)
    const [productPrice, setProductPrice] = useState(0)
    const [saveStatus, setSaveStatus] = useState(true)
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('token')
    // const [productDetailsList, setProductDetailsList] = useState([])

    const toggle = () => {
        setModal(!modal)
    }

    const handleFile = (e) => {
        setImageFile(e.target.files[0])
        // setPreviewImage(URL.createObjectURL(e.target.files[0]))
        // setMessage('uploaded')
    }
    
    const saveProductFunc = (e) =>{
        e.preventDefault()
        setLoading(true)
        axios({
            url: 'https://padelle.herokuapp.com//api/v1/items/add_item',
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            data:{
                "name": selectProductName,
                "product_type": selectProductType,
                "size": productSize,
                "color":productColor,
                "price": productPrice,
                "stock": productStock,
                "image": imageFile.name
            }
        })   
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
                axios({
                    url:`https://padelle.herokuapp.com/api/v1/items/same/${selectProductName}`,
                    method:'GET'
                })
                .then(
                    success=>{
                        setProductDetailsList(success.data)
                        setLoading(false)
                    }
                )
                .catch(err=>console.log(err.response))
            }
            )
            .catch(err=>console.log(err))

            setProductSize('')
            setProductColor('')
            setProductPrice('')
            setProductStock('')
            setImageFile(null)
            // toggle()
            // window.location.reload() 
        })
        .catch(err => {
            console.log('error happen')
            console.log(err.response)
            setLoading(false)
            
        })

    }

    const addNewProductRow = () =>{
        setProductDetailsList([...productDetailsList, {...blankProduct}])
        setSaveStatus(false)
    }

    const removeProduct = (productID) =>{
        setLoading(true)

        axios({
            url:'https://padelle.herokuapp.com/api/v1/items/delete/id',
            method:'POST',
            data:{
                'id':productID
            }
        })
        .then(
            success=>{
                console.log(success)
                axios({
                    url:`https://padelle.herokuapp.com/api/v1/items/same/${selectProductName}`,
                    method:'GET'
                })
                .then(
                    success=>{
                        setProductDetailsList(success.data)
                        setLoading(false)
                    }
                )
                .catch(err=>console.log(err.response))
                
            }
        )
        .catch(err=>console.log(err.response))
    }
    
    return(
        <Modal isOpen={modal} toggle={toggle} size="xl" >
                <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e)=>saveProductFunc(e)}>
                        <FormGroup>
                            <Label for="productType">Product Type</Label>
                            <Input type="text" name="productType" id="productType" value = {selectProductType} disabled="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="productName">Product Name</Label>
                            <Input type="text" name="name" id="productName" value = {selectProductName} disabled="true"/>
                        </FormGroup>
                        <FormGroup style={{maxHeight:"300px", overflow:"auto"}}>
                            <div>

                            <Table id="productListTable" >
                                <thead>
                                    <tr>
                                        <th style={{position:'sticky', top:0, backgroundColor:'white', border:'1px'}}>Image</th>
                                        <th style={{position:'sticky', top:0, backgroundColor:'white' , border:'1px'}}>Color</th>
                                        <th style={{position:'sticky', top:0, backgroundColor:'white', border:'1px'}}>Size</th>
                                        <th style={{position:'sticky', top:0, backgroundColor:'white', border:'1px'}}>Quantity</th>
                                        <th style={{position:'sticky', top:0, backgroundColor:'white', border:'1px'}}>Price</th>
                                        <th style={{position:'sticky', top:0, backgroundColor:'white', border:'1px'}}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading?
                                        <Loading width="100px"></Loading>:
                                        productDetailsList.map(product=>{
                                            return(
                                                    <tr>
                                                        <th scope="row">
                                                            {
                                                                product.image_url !== ''?
                                                                <img src={product.image_url} style={{width:"50px"}}></img>:
                                                                <input type="file" name="image" id="productImage" onChange = {(e) => handleFile(e)} width="50px"></input>
                                                            }
                                                        </th>
                                                        <td>
                                                            {
                                                            product.color !== ''?
                                                            product.color:
                                                            <input type = 'text' size="10" name="color" id="color" width="50px" value = {productColor} onChange = {(e)=>setProductColor(e.target.value)}></input>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                            product.size !== ''?
                                                            product.size:
                                                            <select name="size" id="size" value={productSize} onInput = {(e)=> setProductSize(e.target.value)}>
                                                                <option value = "XXS">XXS</option>
                                                                <option value = "XS">XS</option>
                                                                <option value = "S">S</option>
                                                                <option value = "M">M</option>
                                                                <option value = "L">L</option>
                                                                <option value = "XL">XL</option>
                                                                <option value = "XXL">XXL</option>
                                                                <option value = "XXXL">XXXL</option>
                                                            </select>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                            product.stock !== ''?
                                                            product.stock:
                                                            <input type="number" name="stock" style={{width:"60px"}} id="stock" value = {productStock} onChange = {(e)=>setProductStock(e.target.value)}></input>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                            product.price !== ''?
                                                            'USD' + ' ' + product.price:
                                                            <input type="number" name="price" style={{width:"60px"}} id="price" value = {productPrice} onChange = {(e)=>setProductPrice(e.target.value)}></input>
                                                            }
                                                        </td>
                                                        <td>
                                                            <input type="button" value="Delete" onClick={()=>removeProduct(product.id)}></input>
                                                        </td>
                                                    </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            </div>
                        </FormGroup>
                        <FormGroup style={{display:'flex', justifyContent:'space-between'}}> 
                            {/* <a href="#" onClick={addNewProductRow}>Add New Product</a> */}
                            <div></div>
                            <Input disabled={!saveStatus} type='button' value='Add New' style={{width:'100px'}} onClick={addNewProductRow}></Input>

                        </FormGroup>
                        <Input type="submit" value = "Save" disabled={saveStatus}></Input>
                    </Form>
                </ModalBody>
                
            </Modal>
    )
}

export default AdminAddProductDetailsModal