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
  NavbarText,
  Col
} from 'reactstrap';
import './navbar.css'
import {FiShoppingCart} from 'react-icons/fi';
// import {FiShoppingCart} from 'react-icons/fa'
import {Link} from 'react-router-dom'



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = null //localStorage.getItem("token")
  const toggle = () => setIsOpen(!isOpen);

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
            <div style = {{display:"flex"}}>
              <div style = {{padding:"10px",color:"grey"}}>
                <a href = "#" style = {{color:"grey"}}>
                  Sign Up 
                </a>
              </div>
              <div style = {{padding:"10px", color:"grey"}}>
                <a href = "#" style = {{color:"grey"}}>
                  Log In 
                </a>
              </div>
            </div>:
            <div style = {{padding:"10px", color:"grey"}}>
              <a href = "#" style = {{color:"grey"}}>
                Log Out
              </a>
            </div>
          }
          
          <div style = {{color:"grey"}}>
            Cart <FiShoppingCart size = {22} color = {'grey'}></FiShoppingCart>
          </div>
        </Collapse>
        {/* <Col>abc</Col> */}
      </Navbar>
      </div>
    </div>
  );
}

export default NavBar;