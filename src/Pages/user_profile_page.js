import React, {useState} from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import {Link} from 'react-router-dom'
import ChangePasswordModal from '../components/change_password_modal'

const UserProfilePage = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const token = localStorage.getItem("token")
    const admin_status = localStorage.getItem("admin_status")
    const [modal,setModal] = useState(false)
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    const toggleChangePasswordModal = () => {
      setModal(!modal)
    }
  
    return (
      <Container>
        {
          token != null || admin_status === 'false'?
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
                    <h5>matrix99</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" sm="3" className="userProfileTitle">
                    <h5>email:</h5>
                  </Col>
                  <Col  xs="6" sm="3" className="userProfileContent">

                    <h5>matrix99@matrix.com</h5>
                  </Col>
                </Row>
                <Row>
                  
                </Row>
                </Card>
                <Container>
                  <Row>
                    <Col sm="12">
                      <Button onClick = {toggleChangePasswordModal}>Change password</Button>
                    </Col>
                  </Row>
                </Container>
              
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
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
        <ChangePasswordModal modal={modal} setModal={setModal} ></ChangePasswordModal>
      </Container>
    );
  }
  
  export default UserProfilePage;