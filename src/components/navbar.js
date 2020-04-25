import React, { useState } from 'react';
import {
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
  DropdownItem,
} from 'reactstrap';
import './navbar.css'
import {FiShoppingCart} from 'react-icons/fi';
import {Link, useHistory } from 'react-router-dom'
import SignUpModal from './sign_up_modal'
import LogInModal from './log_in_modal'



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token")
  const toggle = () => {
    setIsOpen(!isOpen)
  };
  const [signUpModal, setSignUpModal] = useState(false)
  const [logInModal, setLogInModal] = useState(false)
  const toggleSignUpModal = () => setSignUpModal(!signUpModal)
  const toggleLogInModal = () => setLogInModal(!logInModal)

  const logoutFunc = () =>{
    localStorage.removeItem("token")
    history.push("/");
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
              <NavLink href="/components/">Home</NavLink>
            </NavItem>
            <NavItem>
              <Link to="/products">
                <NavLink href="#">Products</NavLink>
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
          {token === null?
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
            <Nav navbar>
            <NavItem>
              <NavLink >
                <a href = "#" style = {{color:"gray"}}>My account</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href = "#" onClick = {logoutFunc} style = {{color:"gray"}}>Log out</a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <a href = "#" style = {{color:"gray"}}>Cart<FiShoppingCart size = {22} color ={'gray'}></FiShoppingCart></a>
              </NavLink>
            </NavItem>
          </Nav>
            }
        </Collapse>
      </Navbar>
      </div>
      <SignUpModal modal = {signUpModal} setModal = {setSignUpModal}></SignUpModal>
      <LogInModal modal = {logInModal} setModal = {setLogInModal}></LogInModal>
    </div>
  );
}

export default NavBar;