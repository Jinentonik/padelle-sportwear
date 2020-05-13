import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Container, Input, Table} from 'reactstrap';
import axios from 'axios'
import {Link} from 'react-router-dom'
import currencyHelper from '../components/Util/currency'

const ShoppingCart = (props) => {
    
    const {cartModal, setCartModal, currency, currencyRate} = props
    const [cartItem, setCartItem] = useState([])
    let totalCartAmount = 0
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading,setLoading] = useState(true)
    const toggle = () => {
        // console.log(modal) 
        setCartModal(!cartModal);
    }

    for(let i = 0; i < cartItem.length; i++){
        totalCartAmount = totalCartAmount + cartItem[i].cart.amount * cartItem[i].item.price

    }

    useEffect(()=>{
        axios({
            url:'https://padelle.herokuapp.com/api/v1/cart/user/cart',
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(success => {
          let cartData = []
          console.log(success)
          console.log(success.data)
          cartData = success.data
          cartData.sort((a, b)=>{
            if(a.cart.id > b.cart.id){
                return 1
            }else{
                return -1
            }
            }
          )
          console.log('cartData', cartData)
          setCartItem(success.data)
            
        })
        .catch(err => {
            console.log(err.response)
            setToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("admin_status")
            
        })
      },[])
    
    const getCartItem = () => {
        axios({
            url:'https://padelle.herokuapp.com/api/v1/cart/user/cart',
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(success => {
          let cartData = []
          console.log(success)
          console.log('raw',success.data)
          cartData = success.data
          cartData.sort((a, b)=>{
            if(a.cart.id > b.cart.id){
                return 1
            }else{
                return -1
            }
            }
          )
          console.log('cartData', cartData)
        //   setCartItem(success.data)
        setCartItem(cartData)
            
        })
        .catch(err => console.log(err.response))
    }

    



    const deductItemAmount = (itemID) => {
        console.log('deduct')
        console.log(itemID)
        axios({
            url:`https://padelle.herokuapp.com/api/v1/cart/deduct/${itemID}`,
            method:"POST"
        })
        .then(res=>{
            //update cart after deducting and item
            getCartItem()
        })
        .catch(err=>console.log(err.response))
    }

    const addItemAmount = (itemID) => {
        console.log('add')
        axios({
            url:`https://padelle.herokuapp.com/api/v1/cart/add/${itemID}`,
            method:"POST"
        })
        .then(res=>{
            //reload cart item after adding an item
            getCartItem()
        })
        .catch(err=>console.log(err.response))
    }

    const removeItem = (itemID) => {
        console.log('remove')
        axios({
            url:`https://padelle.herokuapp.com/api/v1/cart/delete/id`,
            method:'POST',
            data:{
                "id":itemID
            }
        })
        .then(success => {
            getCartItem()
        })
        .catch(err => console.log(err.response))
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
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItem.map((item)=>{
                                        return(
                                            <tr>
                                                <th scope="row">
                                                    <img src={item.item.image} style={{width:"100px"}}></img>
                                                            
                                                </th>
                                                <td>
                                                    <p style={{padding:"0px"}}>{item.item.name}</p>
                                                    <p style={{padding:"0px"}}>{item.item.type}</p>
                                                    <p style={{padding:"0px"}}>{item.item.size}</p>
                                                    <p style={{padding:"0px"}}>{item.item.color}</p>
                                                    <p style={{padding:"0px"}}>{currencyHelper.formatCurrency(Number(item.item.price), currency, currencyRate)}</p>

                                                </td>
                                                <td>
                                                    {/* <input type ="number" value = {item.cart.amount} onChange = {(e)=>{setQty(e.target.value)}} style={{width:"50px"}}></input> */}
                                                    <Row style={{justifyContent:"center"}}>
                                                        <button onClick = {()=>deductItemAmount(item.cart.id)} style={{width:"fit-content", height:"fit-content", marginRight:"5%", color:"White", backgroundColor:"palevioletred", border:"none"}}>-</button>
                                                        <p>{item.cart.amount}</p>
                                                        <button onClick = {()=>addItemAmount(item.cart.id)} style={{width:"fit-content", height:"fit-content", marginLeft:"5%", color:"White", backgroundColor:"palevioletred", border:"none"}}>+</button>
                                                    </Row>
                                                    
                                                </td>
                                                <td>
                                                    {currencyHelper.formatCurrency(Number(item.cart.amount * item.item.price), currency, currencyRate)}
                                                </td>
                                                <td>
                                                    <Row style={{justifyContent:"center"}}>
                                                        <button onClick={()=>removeItem(item.cart.id)} style={{width:"fit-content", height:"fit-content", marginLeft:"5%", color:"White", backgroundColor:"palevioletred", border:"none"}}>Remove</button>
                                                    </Row>
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
                                        <h5>{currencyHelper.formatCurrency(Number(totalCartAmount), currency, currencyRate)}</h5>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </Table>
                    }
                        
                </ModalBody>
                <ModalFooter>
                    {/* <Button style = {{backgroundColor:"palevioletred", color: "white"}}>Sign Up</Button> */}
                    <Link to='/checkout' onClick={toggle}>
                        <Input color="primary" type = "submit"  value = "Check Out" style={{color:"white"}} ></Input>
                    </Link>
                </ModalFooter>
        </Modal>
        
    )

    
}

export default ShoppingCart