import React, {useState, useEffect} from "react";
import DropIn from "braintree-web-drop-in-react";
import {Row, Col, Container, Table, Button, Form, FormGroup, Label, Input, FormFeedback, FormText} from "reactstrap"
import axios from 'axios'
import currency from '../components/Util/currency'
import { toast } from 'react-toastify'
import Loading from '../components/loading'

const CheckOutPage = () => {
	const [token, setToken] = useState(null)//client token from braintree
	const [auth_token, setAuthToken] = useState(localStorage.getItem('token')) //token receive after login
	const [instance, setInstance] = useState('')
	const [cartItem, setCartItem] = useState([])
	const [updateAddress, setUpdateAddres] = useState(false)
	const [address, setAddress] = useState('')
	const [zipcode, setZipcode] = useState('')
	const [country, setCountry] = useState('')
	const [loading, setLoading] = useState(true)
	let totalCartAmount = 0

	for(let i = 0; i < cartItem.length; i++){
        totalCartAmount = totalCartAmount + cartItem[i].cart.amount * cartItem[i].item.price

	}

	
	
	const saveAddressFunc = () =>{
		setUpdateAddres(!updateAddress)
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
			setLoading(false)
			
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
					window.location.reload()
					//update address when user choose to save this address
					if (updateAddress){
						axios({
							url:'https://padelle.herokuapp.com/api/v1/users/address',
							method:'POST',
							headers:{
								"Authorization": `Bearer ${auth_token}`
							},
							data:{
								"address": address,
								"zipcode": zipcode,
								"country": country
							}
						})
						.then(success=>console.log(success))
						.catch(err=>console.log(err.response))
						
					}
				})
				.catch(err=>{
					console.log(err.response)
					toast.warning(`Payment is not successful`)
				})
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

	  //get saved address from user account
	  useEffect(()=>{
		  axios({
			  url:'https://padelle.herokuapp.com/api/v1/users/user',
			  method:'GET',
			  headers:{
				"Authorization": `Bearer ${auth_token}`
			}
		  })
		  .then(
			  success=>{
				  setAddress(success.data.address)
				  setZipcode(success.data.zipcode)
				  setCountry(success.data.country)
			  }
		  )
		  .catch(
			  error =>{
				  console.log(error.response)
			  }
		  )
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
		if(!auth_token){
			return(
				<Container style={{height:"500px"}}>
					<h5>You have to login before you can checkout.</h5>
				</Container>
			)
		}else{
			if (loading && token === null) {
				return (
					<Container style={{height:"500px"}}>
						<Loading></Loading>
					</Container>
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
							<h3>Shipping details:</h3>
							<Col xs={12}>
								<Form>
									<FormGroup row>
										<Label for="address" sm={2} style={{textAlign:"left"}}>Address</Label>
										<Col sm={10}>
										<Input type="text" name="address" id="address" value = {address} onChange = {(e)=>setAddress(e.target.value)}/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="zipcode" sm={2} style={{textAlign:"left"}}>Zipcode</Label>
										<Col sm={3}>
										<Input type="text" name="zipcode" id="zipcode" value = {zipcode} onChange = {(e)=>setZipcode(e.target.value)}/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for="country" sm={2} style={{textAlign:"left"}}>Country</Label>
										<Col sm={3}>
										<Input type="text" name="country" id="country" value = {country} onChange = {(e)=>setCountry(e.target.value)}/>
										</Col>
									</FormGroup>
									<FormGroup check style={{textAlign:"left"}}>
										<Input type="checkbox" onClick={saveAddressFunc} id = "saveAddress" />
										<Label check for="saveAddress">Save this address for future use</Label>
										
									</FormGroup>
								</Form>
								{/* <Form>
									<h3>Shipping address:</h3>
									<input type="checkbox" onClick={loadSavedAddress} id = "saveAddress" />
									<Label for="saveAddress">Use my saved address for shipment</Label>
									<FormGroup>
										<Label for="address">Addres</Label>
										<Input type="text" name="address" id="address" value = {address} onChange = {(e)=>setAddress(e.target.value)}/>
									</FormGroup>
									<FormGroup>
										<Label for="zipcode">Zipcode</Label>
										<Input type="text" name="zipcode" id="zipcode" value = {zipcode} onChange = {(e)=>setZipcode(e.target.value)}/>
									</FormGroup>
									<FormGroup>
										<Label for="country">Country</Label>
										<Input type="text" name="country" id="country" value = {country} onChange = {(e)=>setCountry(e.target.value)}/>
									</FormGroup>
									<input type="checkbox" onClick={saveAddressFunc} id = "saveAddress" />
									<Label for="saveAddress">Save this address as my personal address</Label>
								</Form> */}
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
		
		
	
}

export default CheckOutPage