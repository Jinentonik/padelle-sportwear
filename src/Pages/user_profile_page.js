import React, {useState, useEffect} from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Table } from 'reactstrap';
import classnames from 'classnames';
import {Link} from 'react-router-dom'
import ChangePasswordModal from '../components/change_password_modal'
import EditAddressModal from '../components/edit_address_modal'
import axios from 'axios'
import Loading from '../components/loading'

const UserProfilePage = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [adminStatus, setAdminStatus] = useState(localStorage.getItem("admin_status"))
    const [changePasswordModal,setChangePasswordModal] = useState(false)
    const [purchaseHis, setPurchaseHis] = useState([])
    const [user, setUser] =useState([])
    const [editAddressModal, setEditAddressModal] = useState(false)
    const [loading, setLoading] = useState(true)
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    const toggleChangePasswordModal = () => {
      setChangePasswordModal(!changePasswordModal)
    }

    const toggleEditAddressModal = () => {
      console.log('toggle edit address')
      setEditAddressModal(!editAddressModal)
    }
    
    
    useEffect(()=>{
      console.log('admin status',adminStatus)
      console.log(token)
      //Get user details
      axios({
        url:'https://padelle.herokuapp.com/api/v1/users/user',
        method:'GET',
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      .then(success=>{
        console.log('setUser',success.data)
        setUser(success.data)
        setLoading(false)
      })
      .catch(err => console.log(err.response))

      //Get purchase history
      axios({
        url:'https://padelle.herokuapp.com/api/v1/cart/user/paid',
        method:'GET',
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      .then(success=>{
        console.log(success.data)
        setPurchaseHis(success.data)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err.response)
        // setToken(null)
        // setAdminStatus(null)
        // localStorage.removeItem("token")
        // localStorage.removeItem("admin_status")
      })
      
    },[])

    const changeMailStatus = () =>{
      axios({
        url:'https://padelle.herokuapp.com/api/v1/users/email_list',
        method:'POST',
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      .then(success=> {
        console.log(success)
        window.location.reload()
      }
        
      )
      .catch(
        err=>console.log(err.response)
      )
    }
    if(loading){
      return(
        <Container style={{height:"500px"}}>
          <Loading></Loading>
        </Container>
      )
    }else{
      return (
        <Container>
          {
            token != null || adminStatus === 'false'?
            <Container className="mt-5" style ={{minHeight:"500px"}}>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                    style = {{cursor:"pointer"}}
                    >
                    Account Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    style = {{cursor:"pointer"}}
                  >
                    Purchase History 
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Card>
                    <Row>
                      <Col xs="6" sm="3" className="userProfileTitle">
                        <h5 >Username:</h5>
                      </Col>
                      <Col xs="6" sm="3" className="userProfileContent">
                        <h5>{user.username}</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" sm="3" className="userProfileTitle">
                        <h5 >email:</h5>
                      </Col>
                      <Col xs="6" sm="3" className="userProfileContent">
                        <h5>{user.email}</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" sm="3" className="userProfileTitle">
                        <h5 >address:</h5>
                      </Col>
                      <Col xs="6" sm="3" className="userProfileContent">
                        {
                          user.address === null?
                          <h5>N/A</h5>:
                          <h5>{user.address}</h5>
  
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" sm="3" className="userProfileTitle">
                        <h5 >Zipcode:</h5>
                      </Col>
                      <Col xs="6" sm="3" className="userProfileContent">
                        {
                          user.zipcode === null?
                          <h5>N/A</h5>:
                          <h5>{user.zipcode}</h5>
  
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" sm="3" className="userProfileTitle">
                        <h5 >Country:</h5>
                      </Col>
                      <Col xs="6" sm="3" className="userProfileContent">
                        {
                          user.country === null?
                          <h5>N/A</h5>:
                          <h5>{user.country}</h5>
                          
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" sm="3" className="userProfileTitle">
                        <h5 >newsletter:</h5>
                      </Col>
                      <Col xs="6" sm="3" className="userProfileContent" style={{display:"flex"}}>
                        {user.mail_list === true?<h5>Subscribed</h5>:<h5>Unsubscribed</h5>}
                        {
                          user.mail_list === true?
                          <button onClick = {changeMailStatus} style={{marginLeft:"10px", color:'white', backgroundColor:'palevioletred', border:'none'}}>Unsubscribe</button>:
                          <button onClick = {changeMailStatus} style={{marginLeft:"10px", color:'white', backgroundColor:'palevioletred', border:'none'}}>Subscribe</button>
                        }
                      </Col>
                    </Row>
                  </Card>
                    
                  <Container>
                    <Row>
                      <Col sm="12">
                        <Button onClick = {toggleEditAddressModal} style={{margin:"10px", color:'white', backgroundColor:'palevioletred', border:'none'}}>Edit Address</Button>
                        <Button onClick = {toggleChangePasswordModal} style={{margin:"10px", color:'white', backgroundColor:'palevioletred', border:'none'}}>Change password</Button>
                  
                      </Col>
                      
                    </Row>
                  </Container>
                
                </TabPane>
                <TabPane tabId="2">
                  <Table>
                    <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Product Type</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        purchaseHis.map((item, idx)=>{
                          return(
                            <tr>
                              <th scope="row">{idx+1}</th>
                              <td>
                                  <img src = {item.item.image} style = {{width:"100px"}}></img>
                              </td>
                              <td>{item.item.name}</td>
                              <td>{item.item.type}</td>
                              <td>{item.item.color}</td>
                              <td>{item.item.size}</td>
                              <td>{item.cart.amount}</td>
                              <td>{item.item.price}</td>
                              
                              </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
  
                </TabPane>
              </TabContent>
            </Container>:
            <Container>
              <h1>
                You are not authorized to visit this page.
              </h1>
              <h5>
                Go back to <Link to="/">home page</Link>
              </h5>
            </Container>
          }
          <ChangePasswordModal modal={changePasswordModal} setModal={setChangePasswordModal} ></ChangePasswordModal>
          <EditAddressModal modal={editAddressModal} setModal={setEditAddressModal} ></EditAddressModal>
        </Container>
      );
    }
    
  }
  
  export default UserProfilePage;