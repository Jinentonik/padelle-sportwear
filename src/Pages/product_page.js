import React, {useState, useEffect} from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Col
  } from 'reactstrap';
// import product1 from '../components/Images/female_sport3.jpg'
import ProductPagination from '../components/pagination'
import axios from 'axios'
import currencyHelper from '../components/Util/currency'
import Filter from '../components/Filter'
import {Link } from 'react-router-dom'
import Loading from '../components/loading'

const ProductPage = (props) =>{
    const {currency, currencyRate} = props
    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage] = useState(9)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sort, setSort] = useState('')
    const [loading, setLoading] = useState(true)
    
    
    console.log('product page', sort)
    const sortHandle = (val)=>{
        
        productList(val)
    }
    
    const productList = (val) => {
        console.log('enter product sort')
        
        setFilteredProducts(()=>{
            if(val !== ''){
                products.sort((a, b)=>{
                    if(val === 'lowest'){
                        if(a.price < b.price){
                            return -1
                        }
                        else{
                            return 1
                        }
                    }
                    else{
                        if(a.price > b.price){
                            return -1
                        }
                        else{
                            return 1
                        }
                    }
                })
            }
            else{
                products.sort((a, b) => {
                    if(a.id < b.id){
                        return -1
                    }else{
                        return 1
                    }
                })
            }
            return products
        })
        
    }

    useEffect(()=>{
        axios.get('https://padelle.herokuapp.com/api/v1/items/unique')
        .then(success => {
            setProducts(success.data)
            setFilteredProducts(success.data)
            setLoading(false)
            // productList()
            
        })
        .catch(err => console.log(err))
    },[])

    

    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    if(loading){
        return(
            <Container style={{height:"500px"}}>
                <Loading></Loading>
            </Container>
        )
    }else{
        return(
            <Container >
              <Container style = {{padding:"25px"}}>
                <h2>
                    Product
                </h2>
              </Container>
              <Filter sort={sort} setSort = {setSort} sortHandle = {sortHandle}></Filter>
            <CardDeck>
                {currentProducts.map((item)=>{
                    return(
                        <Col xs="12" md ="6" lg="4" id = {item.id}>
                        <Card style = {{minWidth:"300px", marginBottom:"25px"}} >
                            <CardImg top  height="300px" src={item.image_url} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>
                                    <h3>
                                        {item.name}
                                    </h3>
                                </CardTitle>
                                <CardSubtitle>
                                    <h4>
                                        {currencyHelper.formatCurrency(item.price, currency, currencyRate)}
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
        )
    }
    
}

export default ProductPage