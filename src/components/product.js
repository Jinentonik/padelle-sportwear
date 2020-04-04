import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container
} from 'reactstrap';
import product1 from './Images/female_sport3.jpg'

const Product = () => {
  return (
      <Container>
          <Container style = {{padding:"25px"}}>
            <h2>
                Product
            </h2>
          </Container>
        <CardDeck >

            <Card style = {{minWidth:"300px", marginBottom:"25px"}}>
                <CardImg top width="100%" src={product1} alt="Card image cap" />
                <CardBody>
                <CardTitle>
                    <h3>Sport Bra</h3>
                </CardTitle>
                <CardSubtitle>
                    <h4>USD 39</h4>
                </CardSubtitle>
                <CardText>Great for barre, pilates, and post-workout hangouts. Our less-structured designs have a comfortable, soft feel ideal for all-day wear and smaller cup sizes.</CardText>
                <Button style = {{backgroundColor:"palevioletred"}}>Buy now</Button>
                </CardBody>
            </Card>
            <Card style = {{minWidth:"300px", marginBottom:"25px"}}>
                <CardImg top width="100%" src={product1} alt="Card image cap" />
                <CardBody>
                <CardTitle>
                    <h3>Sport Bra</h3>
                </CardTitle>
                <CardSubtitle>
                    <h4>USD 39</h4>
                </CardSubtitle>
                <CardText>Great for barre, pilates, and post-workout hangouts. Our less-structured designs have a comfortable, soft feel ideal for all-day wear and smaller cup sizes.</CardText>
                <Button style = {{backgroundColor:"palevioletred"}}>Buy now</Button>
                </CardBody>
            </Card>
            <Card style = {{minWidth:"300px", marginBottom:"25px"}}>
                <CardImg top width="100%" src={product1} alt="Card image cap" />
                <CardBody>
                <CardTitle>
                    <h3>Sport Bra</h3>
                </CardTitle>
                <CardSubtitle>
                    <h4>USD 39</h4>
                </CardSubtitle>
                <CardText>Great for barre, pilates, and post-workout hangouts. Our less-structured designs have a comfortable, soft feel ideal for all-day wear and smaller cup sizes.</CardText>
                <Button style = {{backgroundColor:"palevioletred"}}>Buy now</Button>
                </CardBody>
            </Card>
            <Card style = {{minWidth:"300px", marginBottom:"25px"}}>
                <CardImg top width="100%" src={product1} alt="Card image cap" />
                <CardBody>
                <CardTitle>
                    <h3>Sport Bra</h3>
                </CardTitle>
                <CardSubtitle>
                    <h4>USD 39</h4>
                </CardSubtitle>
                <CardText>Great for barre, pilates, and post-workout hangouts. Our less-structured designs have a comfortable, soft feel ideal for all-day wear and smaller cup sizes.</CardText>
                <Button style = {{backgroundColor:"palevioletred"}}>Buy now</Button>
                </CardBody>
            </Card>
            <Card style = {{minWidth:"300px", marginBottom:"25px"}}>
                <CardImg top width="100%" src={product1} alt="Card image cap" />
                <CardBody>
                <CardTitle>
                    <h3>Sport Bra</h3>
                </CardTitle>
                <CardSubtitle>
                    <h4>USD 39</h4>
                </CardSubtitle>
                <CardText>Great for barre, pilates, and post-workout hangouts. Our less-structured designs have a comfortable, soft feel ideal for all-day wear and smaller cup sizes.</CardText>
                <Button style = {{backgroundColor:"palevioletred"}}>Buy now</Button>
                </CardBody>
            </Card>
            <Card style = {{minWidth:"300px", marginBottom:"25px"}}>
                <CardImg top width="100%" src={product1} alt="Card image cap" />
                <CardBody>
                <CardTitle>
                    <h3>Sport Bra</h3>
                </CardTitle>
                <CardSubtitle>
                    <h4>USD 39</h4>
                </CardSubtitle>
                <CardText>Great for barre, pilates, and post-workout hangouts. Our less-structured designs have a comfortable, soft feel ideal for all-day wear and smaller cup sizes.</CardText>
                <Button style = {{backgroundColor:"palevioletred"}}>Buy now</Button>
                </CardBody>
            </Card>
            
            
        </CardDeck>
      </Container>
    
  );
};

export default Product;