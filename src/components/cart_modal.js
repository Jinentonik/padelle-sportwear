import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText, Col, Table} from 'reactstrap';
import axios from 'axios'
import currency from '../components/Util/currency'

const ShoppingCart = (props) => {
    
    const {cartModal, setCartModal, cartItem, setCartItem} = props
    const [qty, setQty] = useState(1)
    let totalCartAmount = 0
    const toggle = () => {
        // console.log(modal) 
        setCartModal(!cartModal);
    }

    for(let i = 0; i < cartItem.length; i++){
        totalCartAmount = totalCartAmount + cartItem[i].cart.amount * cartItem[i].item.price

    }
    
    return( 
        
        <Modal isOpen={cartModal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Shopping Cart</ModalHeader>
                <ModalBody>
                    {
                        cartItem.length === 0? "Cart is empty":
                        <Table>
                            <thead>
                                <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItem.map((item)=>{
                                        return(
                                            <tr>
                                                <th scope="row">
                                                    <div style={{display:"flex"}}>
                                                        <div style = {{padding:"5px"}}>
                                                            <img src={item.item.image} style={{width:"100px"}}></img>
                                                        </div>
                                                        <div>
                                                            <p>{item.item.name}</p>
                                                            <p>{item.item.type}</p>
                                                            <p>{item.item.size}</p>
                                                            <p>{item.item.color}</p>
                                                            <p>{currency.formatCurrency(item.item.price)}</p>

                                                        </div>
                                                    </div>
                                                </th>
                                                <td>
                                                    {/* <input type ="number" value = {item.cart.amount} onChange = {(e)=>{setQty(e.target.value)}} style={{width:"50px"}}></input> */}
                                                    <p>{item.cart.amount}</p>
                                                </td>
                                                <td>
                                                    {currency.formatCurrency(item.cart.amount * item.item.price)}
                                                </td>
                                            </tr>
                                        )
                                        
                                    })
                                }
                                <tr>
                                    <td></td>
                                    <td>
                                        <h4>Total:</h4>
                                    </td>
                                    <td>
                                        <h5>{currency.formatCurrency(totalCartAmount)}</h5>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </Table>
                    }
                        
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Input color="primary" type = "submit"  value = "Check Out" id = "signUpBtn" ></Input>
                </ModalFooter>
        </Modal>
        
    )
}

export default ShoppingCart