import React, {useState, useEffect} from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Col
} from 'reactstrap';
import product1 from './Images/female_sport3.jpg'
import ProductPagination from './pagination'
import axios from 'axios'
import {Link } from 'react-router-dom'


const Product = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage] = useState(3)
    const [products, setProducts] = useState([])
    

    useEffect(()=>{
        axios.get('https://padelle.herokuapp.com/api/v1/items/unique')
        .then(success => {
            console.log(success.data)
            setProducts(success.data)
        })
        .catch(err => console.log(err))
    },[])


    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
      <Container>
          <Container style = {{padding:"25px"}}>
            <h2>
                Product
            </h2>
          </Container>
        <CardDeck >
            {currentProducts.map((item)=>{
                return(
                    <Col xs="12" md ="6" lg="4">
                        <Card style = {{minWidth:"300px", marginBottom:"25px"}} >
                            <CardImg top width="100%" height="300px" src={item.image_url} alt="Card image cap" />
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
                                    {item.type}
                                </CardText>
                                    <Link to={`/product/${item.name}`}>
                                        <Button className = "BuyBtn" style = {{backgroundColor:"palevioletred", border: "none"}} >Check this</Button>
                                    </Link>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })}           
        </CardDeck>
        <ProductPagination productPerPage={productPerPage} totalProducts={products.length} setCurrentPage={setCurrentPage} currentPage = {currentPage}></ProductPagination>
      </Container>
    
  );
};

export default Product;