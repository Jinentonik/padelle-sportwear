import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar'
import MainPic from './components/main_pic'
import Product from './components/product'
import {FaFacebookSquare, FaInstagram, FaTwitterSquare} from 'react-icons/fa';
import './App.css';
import ProductPage from './Pages/product_page'
import UserProfilePage from './Pages/user_profile_page'
import AdminProfilePage from './Pages/admin_profile_page'
import AllUsers from './Pages/delete_users_page'
import ProductDetailsPage from './Pages/product_details_page'
import CheckOutPage from './Pages/checkout'
import { Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


function App() {
  const [logInModal, setLogInModal] = useState(false)
  const [xChangeRateEnt, setXChangeRateEnt] = useState() //exchange rate entries. Use in navbar.js
  const [currencyRate, setCurrencyRate] = useState(localStorage.getItem('currencyRate') === null?'1':localStorage.getItem('currencyRate')) //conversion rate
  const [currency, setCurrency] = useState(localStorage.getItem('currency') === null?'USD':localStorage.getItem('currency')) //name of the currency

  console.log('currency', currency, currencyRate)
  useEffect(()=>{
    axios({
      url:'https://openexchangerates.org/api/latest.json',
      method:'GET',
      headers:{
        "Authorization": "Token 42eb5d5255ef46aca68c6c747063299a"
      }
    })
    .then(
      success=>{
        console.log('currency rate')
        console.log(success)
        let jsonObj = success.data.rates
        let entries = Object.entries(jsonObj)
        console.log('entries app.js', entries)
        setXChangeRateEnt(entries)
      }
    )
    .catch(err=>console.log(err.response))
  },[])
  // console.log('xchangerate', xChangeRate)
  return (
    <div className="App">
    
        <Navbar 
          logInModal ={logInModal} 
          setLogInModal = {setLogInModal} 
          currency = {currency} 
          setCurrency = {setCurrency}
          xChangeRateEnt = {xChangeRateEnt}
          currencyRate = {currencyRate}
          setCurrencyRate = {setCurrencyRate}
          ></Navbar>
        <Route path='/' exact >
          <MainPic></MainPic>
          <Product currency={currency} currencyRate={currencyRate}></Product>
        </Route>
        <Route path='/products' exact >
          <ProductPage currency={currency} currencyRate={currencyRate}></ProductPage>
        </Route>
        <Route path='/profile' >
          <UserProfilePage currency={currency} currencyRate={currencyRate}></UserProfilePage>
        </Route>
        <Route path='/admin' component={AdminProfilePage}></Route>
        <Route path='/all_users' component={AllUsers}></Route>
        <Route path='/product/:name' >
          <ProductDetailsPage logInModal ={logInModal} setLogInModal={setLogInModal} currency={currency} currencyRate={currencyRate}></ProductDetailsPage>
        </Route>
        <Route path='/checkout' >
          <CheckOutPage currency={currency} currencyRate={currencyRate}></CheckOutPage>
        </Route>
        <div style = {{paddingTop:"10px", width:"100%", backgroundColor:"palevioletred", display:"flex", justifyContent: "space-between"}}>
          
          <p style = {{paddingTop: "8px", color:"white", margin:"0px"}}>
                  PAD'ELE all right reserved 
                  
          </p>
          
          <div id = "socialTab">
            <div style = {{marginLeft:"10px", marginRight:"10px"}}>
              <a href = "#">
                <FaFacebookSquare size = {42}></FaFacebookSquare>
              </a>
            </div>
            <div style = {{marginLeft:"10px", marginRight:"10px"}}>
              <a href = "#">
                <FaInstagram size = {42}></FaInstagram>
              </a>
            </div>
            <div style = {{marginLeft:"10px", marginRight:"10px", textDecoration:"none"}}>
              <a href = "#" >
                <FaTwitterSquare size = {42}></FaTwitterSquare>
              </a>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover>

        </ToastContainer>
      
    </div>
  );
}

export default App;
