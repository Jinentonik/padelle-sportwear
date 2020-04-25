import React from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar'
import MainPic from './components/main_pic'
import Product from './components/product'
import {FaFacebookSquare, FaInstagram, FaTwitterSquare} from 'react-icons/fa';
import './App.css';
import ProductPage from './Pages/product_page'
import UserProfilePage from './Pages/user_profile_page'
import { Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Route path='/' exact >
        <MainPic></MainPic>
        <Product></Product>
      </Route>
      <Route path='/products' component={ProductPage}></Route>
      <Route path='/profile' component={UserProfilePage}></Route>
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
