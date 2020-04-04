import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import MainPic from './components/main_pic'
import Product from './components/product'
import {Container,Row} from 'reactstrap'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <MainPic></MainPic>
      
      <Product></Product>
      <div style = {{paddingTop:"10px", width:"100%", backgroundColor:"palevioletred", display:"flex", justifyContent:"center"}}>
        <h5 style = {{color:"white", margin:"0px"}}>
                PAD'ELE all right reserved 
        </h5>
      </div>
    </div>
  );
}

export default App;
