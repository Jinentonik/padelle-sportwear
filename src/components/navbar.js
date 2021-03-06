import React, { useState, useEffect } from 'react';
import {
  Input,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';
import './navbar.css'
import {FiShoppingCart} from 'react-icons/fi';
import {Link, useHistory } from 'react-router-dom'
import SignUpModal from './sign_up_modal'
import LogInModal from './log_in_modal'
import ShoppingCartModal from './cart_modal'
import axios from 'axios';


const NavBar = (props) => {
  const {logInModal, setLogInModal, currency, setCurrency, xChangeRateEnt, currencyRate, setCurrencyRate} = props
  const [cartItem, setCartItem] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false)
  // const [logInModal, setLogInModal] = useState(false)
  const [cartModal, setCartModal] = useState(false)
  const [cartTotalItem, setCartTotalItem] = useState(0)
  const history = useHistory();
  const [token,setToken] = useState(localStorage.getItem("token"))
  const admin_status = localStorage.getItem("admin_status")

  const currencyList = ['USD', 'CAD', 'AUD', 'EUR', 'CNY', 'GBP', 'MYR', 'SGD']

  const toggle = () => {
    setIsOpen(!isOpen)
  };
  
  const toggleSignUpModal = () => setSignUpModal(!signUpModal)

  const toggleLogInModal = () => setLogInModal(!logInModal)

  const logoutFunc = () =>{
    console.log('logout')
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("admin_status")
    localStorage.removeItem("currency")
    localStorage.removeItem("currencyRate")

    history.push("/");
  }

  const cartFunc = () => {
    setCartModal(!cartModal)
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
      let countItem = 0
      cartData = success.data
      cartData.sort()
      setCartItem(success.data)
      for(let i = 0; i < success.data.length; i++){
        countItem += success.data[i].cart.amount
      }
      setCartTotalItem(countItem)
    })
    .catch(err => {
      console.log(err.response)
      setToken(null)
      localStorage.removeItem("token")
      localStorage.removeItem("admin_status")
    })
  },[])

  const changeCurrencyFunc = (text) => {
    for(const [currencyName, currencyRate] of xChangeRateEnt){
      if(currencyName === text){
        setCurrency(text)
        setCurrencyRate(currencyRate)
        localStorage.setItem('currency',text)
        localStorage.setItem('currencyRate', currencyRate)
      }
    }
    
    
  }
  
  return (
    <div id = "navBarDiv">
      <div id = "navBarDivIn">
      <Navbar id = "navBar" light expand="md">
      <NavbarBrand id = 'navBarBrand' href="/" xs="6" style ={{fontSize:"28px"}}>PAD'ELLE</NavbarBrand>
        {/* <NavbarBrand id = 'navBarBrand' href="/">PAD'ELLE</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar xs="6">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to ="/">
                <NavLink >Home</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/products">
                <NavLink >Products</NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  About Us
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                Contact Us
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {token === null && admin_status === null?
            <Nav navbar>
            <NavItem>
              <NavLink >
                <a href = "#" onClick = {toggleSignUpModal} style = {{color:"gray"}}>Sign Up</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href = "#" onClick = {toggleLogInModal} style = {{color:"gray"}}>Log In</a>
              </NavLink>
            </NavItem>
          </Nav>:
          admin_status === 'true'?
          <Nav navbar>
            <NavItem>
              <NavLink>
                <Link to ="/admin">
                  <a href = "#" style = {{color:"gray"}}>Admin panel</a>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href = "#" onClick = {logoutFunc} style = {{color:"gray"}}>Log out</a>
              </NavLink>
            </NavItem>
          </Nav>:
          <Nav navbar>
          <NavItem>
            <NavLink >
              <Link to="/profile">
                <a href = "#" style = {{color:"gray"}}>My account</a>
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <a href = "#" onClick = {logoutFunc} style = {{color:"gray"}}>Log out</a>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <a href = "#" style = {{color:"gray"}} onClick = {cartFunc}>Cart<FiShoppingCart size = {22} color ={'gray'}></FiShoppingCart> {cartTotalItem}</a>
            </NavLink>
          </NavItem>
          
        </Nav>
            }
        {
          admin_status === 'true'?
          <Nav navbar style={{display:'none'}}>
          <NavItem style={{display:"flex", justifyContent:"center"}}>
              <Input type='select' value={currency} onChange={(e)=>changeCurrencyFunc(e.target.value)}>
                {
                  currencyList.map(unit => {
                    return(
                      <option value={unit}>{unit}</option>
                    )
                  })
                }
              </Input>
            </NavItem>
        </Nav>:
        <Nav navbar>
        <NavItem style={{display:"flex", justifyContent:"center"}}>
            <Input type='select' value={currency} onChange={(e)=>changeCurrencyFunc(e.target.value)}>
              {
                currencyList.map(unit => {
                  return(
                    <option value={unit}>{unit}</option>
                  )
                })
              }
            </Input>
          </NavItem>
      </Nav>
        }
        </Collapse>
      </Navbar>
      </div>
      <SignUpModal modal = {signUpModal} setModal = {setSignUpModal} logInModal = {logInModal} setLogInModal={setLogInModal}></SignUpModal>
      <LogInModal modal = {logInModal} setModal = {setLogInModal} signUpModal = {signUpModal} setSignUpModal = {setSignUpModal}></LogInModal>
      <ShoppingCartModal 
        cartModal = {cartModal} 
        setCartModal = {setCartModal} 
        cartItem = {cartItem} 
        setCartItem = {setCartItem} 
        currency={currency} 
        currencyRate={currencyRate}
        cartTotalItem = {cartTotalItem}
        setCartTotalItem = {setCartTotalItem}
        ></ShoppingCartModal>
      
    </div>
  );
}

export default NavBar;