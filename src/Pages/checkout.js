import React, {useState, useEffect} from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
const CheckOutPage = () => {
	const [token, setToken] = useState(null)
	let auth_token = localStorage.getItem("token")
	const [instance, setInstance] = useState('')
	// let instance;
	console.log("auth_token", auth_token)

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
	console.log("token", token)

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
						"amount":88,
						"paymentMethod": payload.nonce
					}
				})
				.then(res=>{
					console.log(res)
				})
				.catch(err=>console.log(err.response))
			}
		})
		

		
	}
	
		if (!token) {
			return (
				<div>
					<h1>Loading...</h1>
				</div>
			);
		}else{
			return(<div>
				<DropIn
					options={{ authorization: token }}
					// onInstance={ins => instance = ins}
					onInstance={ins => setInstance(ins)}
				/>
				<button onClick ={()=>makePayment()}>Pay</button>
			</div>)
		}
		
	
}

export default CheckOutPage