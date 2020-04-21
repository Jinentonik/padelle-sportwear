import React from 'react'
import Img2 from './Images/female_sport2.jpg'
import { Button, Row, Container} from 'reactstrap';

const MainPic = () => {
    // className reference https://mdbootstrap.com/docs/react/utilities/display/
    return( 
            <Row>
                <Row style = {{height: "95vh", overflow:"hidden", position: "relative"}} className = "d-none d-md-block "> 
                    <img src = {Img2} style = {{width: "100%"}}></img> 
                    <div style = {{width: "30%", position: "absolute", top: "50%", right:"10%", color: "white"}}>
                        <h2>New Design for this season has launched!</h2>
                        <Button style = {{color: "White", width:"100%", backgroundColor:"palevioletred", border:"none"}}>Buy now!</Button>
                    </div>
                </Row>
                <Row style = {{height: "30vh", overflow:"hidden", position:"relative"}} className = "d-block d-md-none">
                    <img src = {Img2} style = {{width: "100%"}}></img> 
                    <div style = {{width: "40%", position: "absolute", top: "25%", right:"5%", color: "white"}}>
                        <h5>New Design for this season has launched!</h5>
                        <Button style = {{color: "White", width:"100%", backgroundColor:"palevioletred", border:"none"}}>Buy now!</Button>
                    </div>
                </Row>
                
            </Row>
    )
}

export default MainPic