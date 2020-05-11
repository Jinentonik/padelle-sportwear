import React, {useState, useEffect} from 'react'
import {Table, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardDeck, Col
  } from 'reactstrap';
import AddProductModal from '../components/add_product_modal'
import Loading from '../components/loading'


const AdminProfilePage = () => {
    let token = localStorage.getItem('token')
    let admin_status = localStorage.getItem('admin_status')

    const [modal, setModal] = useState(false)
    const [productsList, setProductsList] = useState([])
    const [imageFile, setImageFile] = useState('')
    const [loading, setLoading] = useState(true)

    const toggle = () => setModal(!modal);

    //list out all items in table
    useEffect(()=>{
        
        axios.get('https://padelle.herokuapp.com/api/v1/items/items')
        .then(success => {
            console.log(success)
            console.log(success.data)
            setProductsList(success.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    },[])

    
    const removeItem = (itemID) => {
        console.log(itemID)
        axios({
            url:`https://padelle.herokuapp.com/api/v1/items/delete/id`,
            method:'POST',
            data:{
                id:itemID
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
                <Button onClick={toggle} style={{margin:"10px"}}>Add product</Button>
    
                <AddProductModal modal={modal} setmodal={setModal} toggle = {toggle}></AddProductModal>
                
                <Container>
                        {
                            token != null || admin_status === 'true'?
                            <Container style={{minHeight:"500px"}} >
                                {/* <CardDeck>  */}
                                <Table>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Product Type</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>image</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productsList.map((product, idx)=>{
                                                return(
                                                    // <Col xs="12" md ="6" lg="4">
                                                    //     <Card>
                                                    //         <CardBody>
                                                    //         <CardTitle>Product {idx}</CardTitle>
                                                    //         <CardSubtitle>{product.name}</CardSubtitle>
                                                    //         <CardSubtitle>{product.type}</CardSubtitle>
                                                    //         </CardBody>
                                                    //         <img width="100%" src={product.image_url} alt="Card image cap"  />
                                                    //         <CardBody>
                                                    //         <CardText>Size: {product.size}</CardText>
                                                    //         <CardText>Price: {product.price}</CardText>
                                                    //         <CardText>Quantity: {product.stock}</CardText>
                                                    //         <Button color="info">Edit</Button>
                                                    //         <Button color="danger">Delete</Button>
                                                    //         {/* <CardLink href="#">Card Link</CardLink> */}
                                                    //         {/* <CardLink href="#">Another Link</CardLink> */}
                                                    //         </CardBody>
                                                    //     </Card>
                                                    // </Col>
    
                                                        
                                                    
                                                        <tr>
                                                        <th scope="row">{idx+1}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.type}</td>
                                                        <td>{product.color}</td>
                                                        <td>{product.size}</td>
                                                        <td>{product.stock}</td>
                                                        <td>{product.price}</td>
                                                        <td>
                                                            <img src = {product.image_url} style = {{width:"100px"}}></img>
                                                        </td>
                                                        <td>
                                                            {/* <Button style={{margin:"10px"}}>Edit</Button> */}
                                                            <Button color="danger" style={{margin:"10px"}} onClick={()=>removeItem(product.id)}>Delete</Button>
                                                        </td>
                                                        </tr>
                                                        
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                    
                                {/* </CardDeck> */}
                                
                            </Container>:
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
            </div>
        )
    }
    
}

export default AdminProfilePage