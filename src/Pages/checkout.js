import React, {useState, useEffect} from "react";
import DropIn from "braintree-web-drop-in-react";
import {Row, Col, Container, Table, Button} from "reactstrap"
import axios from 'axios'
import currency from '../components/Util/currency'
import { toast } from 'react-toastify'

const CheckOutPage = () => {
	const [token, setToken] = useState(null)//client token from braintree
	const [auth_token, setAuthToken] = useState(localStorage.getItem('token')) //token receive after login
	const [instance, setInstance] = useState('')
	const [cartItem, setCartItem] = useState([])
	let totalCartAmount = 0

	for(let i = 0; i < cartItem.length; i++){
        totalCartAmount = totalCartAmount + cartItem[i].cart.amount * cartItem[i].item.price

    }

	//Get braintree client token
	useEffect(()=>{
		axios({
			url:'https://padelle.herokuapp.com/api/v1/payment/new_payment',
			method:"GET",
			headers:{
				"Authorization": `Bearer ${auth_token}`
			}
		})
		.then(success=>{
			console.log(success)
			setToken(success.data["client token"])
		})
		.catch(err=>{
			console.log(err.response)
			
		})
	},[])

	//make payment to braintree
	let makePayment = () => {
		console.log(instance)
		
		instance.requestPaymentMethod(function (err, payload){
			if(err){
				console.log(err)
			}else{
				
				// nonce = payload.nonce
				console.log(payload.nonce)
				axios({
					url:'https://padelle.herokuapp.com/api/v1/payment/checkout',
					method:"POST",
					headers:{
						"Authorization": `Bearer ${auth_token}`
					},
					data:{
						"amount":totalCartAmount,
						"paymentMethod": payload.nonce
					}
				})
				.then(res=>{
					console.log(res)
					toast.success('You have successfully paid',{position:"top-right"})
				})
				.catch(err=>console.log(err.response))
			}
		})
		

		
	}

	//get data from cart
	useEffect(()=>{
		axios({
			url:'https://padelle.herokuapp.com/api/v1/cart/user/cart',
			method:'GET',
			headers:{
				"Authorization": `Bearer ${auth_token}`
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
			setAuthToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("admin_status")
		})
	  },[])

	  const getCartItem = () => {
		axios({
			url:'https://padelle.herokuapp.com/api/v1/cart/user/cart',
			method:'GET',
			headers:{
				"Authorization": `Bearer ${auth_token}`
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
			setAuthToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("admin_status")
		})
	  }
		//deduct item in cart
	const deductItemAmount = (itemID) => {
		console.log('deduct')
		console.log(itemID)
		axios({
			url:`https://padelle.herokuapp.com/api/v1/cart/deduct/${itemID}`,
			method:"POST"
		})
		.then(res=>{
			getCartItem()
		})
		.catch(err=>console.log(err.response))
	}

	//add item in cart
	const addItemAmount = (itemID) => {
		console.log('add')
		axios({
			url:`https://padelle.herokuapp.com/api/v1/cart/add/${itemID}`,
			method:"POST"
		})
		.then(res=>{
			getCartItem()
		})
		.catch(err=>console.log(err.response))
	}

	const removeItem = (itemID) => {
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
	
		if (!token) {
			return (
				<div>
					<h1>Loading...</h1>
				</div>
			);
		}else{
			return(
				<Container>
					<Row>
						<h3>Your Shopping Cart</h3>
						<Col xs={12}>
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
                                                    {/* <div style={{display:"flex"}}>
                                                        <div style = {{padding:"5px"}}>
                                                            <img src={item.item.image} style={{width:"100px"}}></img>
                                                        </div>
                                                        <div>
                                                            <p style={{paddingBottom:"0px"}}>{item.item.name}</p>
                                                            <p style={{paddingBottom:"0px"}}>{item.item.type}</p>
                                                            <p style={{paddingBottom:"0px"}}>{item.item.size}</p>
                                                            <p style={{paddingBottom:"0px"}}>{item.item.color}</p>
                                                            <p style={{paddingBottom:"0px"}}>{currency.formatCurrency(item.item.price)}</p>

                                                        </div>
                                                    </div> */}
                                                </th>
												<td>
													<p style={{paddingBottom:"0px"}}>{item.item.name}</p>
													<p style={{paddingBottom:"0px"}}>{item.item.type}</p>
													<p style={{paddingBottom:"0px"}}>{item.item.size}</p>
													<p style={{paddingBottom:"0px"}}>{item.item.color}</p>
													<p style={{paddingBottom:"0px"}}>{currency.formatCurrency(item.item.price)}</p>
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
                                                    {currency.formatCurrency(item.cart.amount * item.item.price)}
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
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<DropIn
								options={{ authorization: token }}
								// onInstance={ins => instance = ins}
								onInstance={ins => setInstance(ins)}
							/>
							<Button onClick ={()=>makePayment()}>Pay</Button>
						</Col>
					</Row>
				</Container>
			
			)
		}
		
	
}

export default CheckOutPage