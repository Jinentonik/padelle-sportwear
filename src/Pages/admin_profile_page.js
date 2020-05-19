import React, {useState, useEffect} from 'react'
import {Table, Container, Button,  Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardDeck, Col
  } from 'reactstrap';
import AddProductModal from '../components/add_product_modal'
import Loading from '../components/loading'
import AdminAddPoductDetailsModal from '../components/admin_add_product_details_modal'
import '../App.css';
import ChangePasswordModal from '../components/change_password_modal'



const AdminProfilePage = () => {
    let token = localStorage.getItem('token')
    let admin_status = localStorage.getItem('admin_status')

    const [modal, setModal] = useState(false)
    const [productsList, setProductsList] = useState([])
    const [imageFile, setImageFile] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectProductName, setSelectProductName] = useState('')
    const [selectProductType, setSelectProductType] = useState('')
    const [productDetailsModal, setProductDetailsModal] = useState(false)
    const [productDetailsList, setProductDetailsList] = useState([])
    const [alertModal, setAlertModal] = useState(false)
    const [deleteName, setDeleteName] = useState('')
    const [changePasswordModal,setChangePasswordModal] = useState(false)


    const toggle = () => setModal(!modal);

    const toggleChangePasswordModal = () => {
        setChangePasswordModal(!changePasswordModal)
      }

    const toggleAlertModal = () => setAlertModal(!alertModal)

    //list out all items in table 
    useEffect(()=>{
        
        axios.get('https://padelle.herokuapp.com/api/v1/items/items')
        .then(success => {
            // console.log(success)
            // console.log(success.data)
            // setProductsList(success.data)
            // setLoading(false)
        })
        .catch(err => console.log(err))
    },[])
    //list out all item's category
    useEffect(()=>{
        //get all items
        let allItemsArr = []
        axios.get('https://padelle.herokuapp.com/api/v1/items/items')
        .then(success => {
            for(let i = 0; i < success.data.length; i++){
                allItemsArr.push(success.data[i])
            }
            console.log('all items get', allItemsArr, allItemsArr.length)
            
            //count the total quantity which has the same product name
            let productsListArr = []
            axios({
                url:'https://padelle.herokuapp.com/api/v1/items/unique',
                method:'GET',
            })
            .then(
                success=>{
                    for(let i = 0; i < success.data.length; i++){
                        productsListArr.push(success.data[i])
                    }
                    for(let j = 0; j < productsListArr.length; j++){
                        
                        productsListArr[j].total = 0
                        for(let k = 0; k < allItemsArr.length; k++){
                            if(productsListArr[j].name == allItemsArr[k].name){
                                productsListArr[j].total = productsListArr[j].total + allItemsArr[k].stock
                            }
                        }
                    }
                    setProductsList(productsListArr)
                    setLoading(false)
                }
                    
            )
            .catch(err=>{console.log(err.response)})

        })
        .catch(err => console.log(err))
        
        
    },[])
    const showRemoveAlert = (productName) => {
        setAlertModal(true)
        setDeleteName(productName)
    }
    const removeAllSameNameItem = () => {
        console.log('remove', deleteName)
        axios({
            url:`https://padelle.herokuapp.com/api/v1/items/delete/name`,
            method:'POST',
            data:{
                "name":deleteName
            }
        })
        .then(
            success=>{
                console.log(success)
                window.location.reload()
            }
        )
        .catch(
            err=>{
                console.log(err.response)
            }
        )
    }

    const viewProductDetails = (name, productType) => {
        setSelectProductName(name)
        setSelectProductType(productType)
        setProductDetailsModal(true)

        axios({
            url:`https://padelle.herokuapp.com/api/v1/items/same/${name}`,
            method:'GET'
        })
        .then(
            success=>{
                setProductDetailsList(success.data)
            }
        )
        .catch(err=>console.log(err.response))

    } 
    

    if(loading){
        return(
            <Container style={{height:"500px"}}>
                <Loading>

                </Loading>
            </Container>
        )
    }else{
        return(
            <div>
                <Col sm="12">
                    <Button onClick={toggle} style={{margin:"10px", backgroundColor:"palevioletred", border:"none"}}>Add product</Button>
                    <Button onClick = {toggleChangePasswordModal} style={{margin:"10px", color:'white', backgroundColor:'palevioletred', border:'none'}}>Change password</Button>
                </Col>

                
                <Modal isOpen={alertModal} toggle={toggleAlertModal} >
                    <ModalHeader toggle={toggleAlertModal}>Warning</ModalHeader>
                    <ModalBody>
                        Performing this action will delete all of the size and color. Are you sure you want to proceed?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={()=>removeAllSameNameItem()}>Yes</Button>{' '}
                    <Button color="secondary" onClick={toggleAlertModal}>No</Button>
                    </ModalFooter>
                </Modal>
                <AddProductModal modal={modal} setmodal={setModal} toggle = {toggle}></AddProductModal>
                <AdminAddPoductDetailsModal 
                    modal = {productDetailsModal} 
                    setModal = {setProductDetailsModal} 
                    selectProductName = {selectProductName} 
                    selectProductType = {selectProductType} 
                    productDetailsList = {productDetailsList}
                    setProductDetailsList = {setProductDetailsList}
                    >
                </AdminAddPoductDetailsModal>
                
                <Container>
                        {
                            token != null || admin_status === 'true'?
                            <Container style={{minHeight:"500px"}}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Product Type</th>
                                            <th>Total Quantity</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productsList.map((product, idx)=>{
                                                return(
                                                    <tr>
                                                        <th scope="row">{idx+1}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.type}</td>
                                                        <td>{product.total}</td>
                                                        <div style={{display:'flex'}}>
                                                        <Input type="button" value="View details" style={{margin:"10px"}} onClick = {()=>viewProductDetails(product.name, product.type)} ></Input>
                                                        <Input type="button" value="Remove" style={{margin:"10px", backgroundColor:'Red', border:'none', color:'black'}} onClick = {()=>showRemoveAlert(product.name)} ></Input>

                                                        </div>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>:
                            // <Container style={{minHeight:"500px"}} >
                            //     {/* <CardDeck>  */}
                            //     <Table>
                            //         <thead>
                            //             <tr>
                            //             <th>#</th>
                            //             <th>Name</th>
                            //             <th>Product Type</th>
                            //             <th>Color</th>
                            //             <th>Size</th>
                            //             <th>Quantity</th>
                            //             <th>Price</th>
                            //             <th>image</th>
                            //             <th></th>
                            //             </tr>
                            //         </thead>
                            //         <tbody>
                            //             {
                            //                 productsList.map((product, idx)=>{
                            //                     return(
                            //                         // <Col xs="12" md ="6" lg="4">
                            //                         //     <Card>
                            //                         //         <CardBody>
                            //                         //         <CardTitle>Product {idx}</CardTitle>
                            //                         //         <CardSubtitle>{product.name}</CardSubtitle>
                            //                         //         <CardSubtitle>{product.type}</CardSubtitle>
                            //                         //         </CardBody>
                            //                         //         <img width="100%" src={product.image_url} alt="Card image cap"  />
                            //                         //         <CardBody>
                            //                         //         <CardText>Size: {product.size}</CardText>
                            //                         //         <CardText>Price: {product.price}</CardText>
                            //                         //         <CardText>Quantity: {product.stock}</CardText>
                            //                         //         <Button color="info">Edit</Button>
                            //                         //         <Button color="danger">Delete</Button>
                            //                         //         {/* <CardLink href="#">Card Link</CardLink> */}
                            //                         //         {/* <CardLink href="#">Another Link</CardLink> */}
                            //                         //         </CardBody>
                            //                         //     </Card>
                            //                         // </Col>
    
                                                        
                                                    
                            //                             <tr>
                            //                             <th scope="row">{idx+1}</th>
                            //                             <td>{product.name}</td>
                            //                             <td>{product.type}</td>
                            //                             <td>{product.color}</td>
                            //                             <td>{product.size}</td>
                            //                             <td>{product.stock}</td>
                            //                             <td>{product.price}</td>
                            //                             <td>
                            //                                 <img src = {product.image_url} style = {{width:"100px"}}></img>
                            //                             </td>
                            //                             <td>
                            //                                 {/* <Button style={{margin:"10px"}}>Edit</Button> */}
                            //                                 <Button color="danger" style={{margin:"10px"}} onClick={()=>removeItem(product.id)}>Delete</Button>
                            //                             </td>
                            //                             </tr>
                                                        
                            //                     )
                            //                 })
                            //             }
                            //         </tbody>
                            //     </Table>
                                    
                            //     {/* </CardDeck> */}
                                
                            // </Container>:
                            <Container style={{minHeight:"500px"}}>
                                <h1>
                                    You are not authorized to visit this page.
                                </h1>
                                <h5>
                                    Go back to <Link to="/">home page</Link>
                                </h5>
                            </Container>
            }
                </Container>
                <ChangePasswordModal modal={changePasswordModal} setModal={setChangePasswordModal} ></ChangePasswordModal>

            </div>
        )
    }
    
}

export default AdminProfilePage