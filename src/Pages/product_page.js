import React, {useState} from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Col
  } from 'reactstrap';
  import product1 from '../components/Images/female_sport3.jpg'
import ProductPagination from '../components/pagination'

const ProductPage = () =>{

    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage] = useState(9)
    const product = [
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "first "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts.Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "middle somewhere "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts.Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts.Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "Great for barre, pilates, and post-workout hangouts. "
        },
        {
            "name":"Sport Bra",
            "price": "RM39",
            "description": "last "
        }
    ]

    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct)

    return(
        <Container>
          <Container style = {{padding:"25px"}}>
            <h2>
                Product
            </h2>
          </Container>
        <CardDeck>
            {currentProducts.map((item)=>{
                return(
                    <Col xs="12" md ="6" lg="4">
                    <Card style = {{minWidth:"300px", marginBottom:"25px"}} >
                        <CardImg top width="100%" src={product1} alt="Card image cap" />
                        <CardBody>
                            <CardTitle>
                                <h3>
                                    {item.name}
                                </h3>
                            </CardTitle>
                            <CardSubtitle>
                                <h4>
                                    {item.price}
                                </h4>
                            </CardSubtitle>
                            <CardText>
                                {item.description}
                            </CardText>
                            <Button className = "BuyBtn" style = {{backgroundColor:"palevioletred", border: "none"}} >Buy now</Button>
                        </CardBody>
                    </Card>
                    </Col>
                )
            })}           
            
        </CardDeck>
        <ProductPagination productPerPage={productPerPage} totalProducts={product.length} setCurrentPage={setCurrentPage}></ProductPagination>
      </Container>
    )
}

export default ProductPage