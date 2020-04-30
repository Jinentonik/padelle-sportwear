import React, {useState, useEffect} from 'react'
import {Table, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardDeck, Col
  } from 'reactstrap';
import AddProductModal from '../components/add_product_modal'


const AdminProfilePage = () => {
    let token = localStorage.getItem('token')
    let admin_status = localStorage.getItem('admin_status')

    const [modal, setModal] = useState(false)
    const [productsList, setProductsList] = useState([])
    const [imageFile, setImageFile] = useState('')

    const toggle = () => setModal(!modal);

    useEffect(()=>{
        console.log('list all items')
        
        axios.get('https://padelle.herokuapp.com/api/v1/items/items')
        .then(success => {
            console.log(success)
            console.log(success.data)
            setProductsList(success.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleFile = (e)=> {
        setImageFile(e.target.files[0])
    }
    
    const uploadImageTest=()=>{
        let formData = new FormData()
        formData.append("img", imageFile)
        console.log(token)

        axios({
            url:'https://padelle.herokuapp.com/api/v1/items/upload_item_image',
            method: "POST",
            headers:{
                "Authorization": `Bearer ${token}`
            },
            data: formData


        })
        .then(success=>{
            console.log(success)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <Input type = "file" onClick={(e)=> handleFile(e)}></Input>
            <Button onClick={uploadImageTest}>Upload Image</Button>

            <Button onClick={toggle}>Add product</Button>
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
                                                    <td></td>
                                                    <td>{product.size}</td>
                                                    <td>{product.stock}</td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        <img src = {product.image_url} style = {{width:"100px"}}></img>
                                                    </td>
                                                    <td>
                                                        <Button>Edit</Button>
                                                        <Button color="danger">Delete</Button>
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

export default AdminProfilePage