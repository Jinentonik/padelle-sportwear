import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {Container, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import product1 from '../components/Images/female_sport3.jpg'
import axios from 'axios'
import currency from '../components/Util/currency'


const ProductDetailsPage =(props) => {
    const {logInModal, setLogInModal} = props
    const {name} = useParams()
    const [product,setProduct] = useState('')
    const [productName, setProductName] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productType, setProductType] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productColors, setProductColors] = useState([])
    const [productSize, setProductSize] = useState([])
    const [productQtyList, setProductQtyList] = useState([])
    const [selectSize, setSelectSize] = useState('')
    const [selectColor, setSelectColor] = useState('')
    const [selectQty, setSelectQty] = useState(1)
    const [productInfoList, setProductInfoList] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [admin, setAdmin] = useState(localStorage.getItem("admin_status"))

    

    useEffect(()=>{
        axios({
            url:`https://padelle.herokuapp.com/api/v1/items/same/${name}`,
            method:"GET"
        })
        .then(success=>{
            console.log(success)
            let productInfo = success.data
            setProduct(productInfo)
            let colorArr = []
            let sizeArr = []
            let productsArr = []
            for(let i = 0; i < productInfo.length; i++){
                    //set the product name, type, price and image to show the info of the product on the browser.
                    if(i === 0){
                        setProductName(productInfo[i].name)
                        setProductType(productInfo[i].type)
                        setProductPrice(productInfo[i].price)
                        setProductImage(productInfo[i].image_url)
                    }
                    if(colorArr.indexOf(productInfo[i].color) === -1 ){
                        colorArr.push(productInfo[i].color)
                    }
                    if(sizeArr.indexOf(productInfo[i].size) === -1 ){
                        sizeArr.push(productInfo[i].size)
                    }
                    productsArr.push({"id": productInfo[i].id, "size": productInfo[i].size, "color": productInfo[i].color, "stock": productInfo[i].stock, "image":productInfo[i].image_url})
            }
            
            setProductColors(colorArr)
            setProductSize(sizeArr) 
            setSelectColor(colorArr[0])
            setSelectSize(sizeArr[0])
            changeColor(colorArr[0])
            setProductInfoList(productsArr)

            //set product quantity list
            let productQtyListArr = []
            for(let i = 0 ; i < productsArr.length; i++){
                //loop to find if any product in productsArr has the same color and size as sizeArr[0] and colorArr[0]
                if(productsArr[i].size === sizeArr[0] && productsArr[i].color === colorArr[0]){
                    for(let j = 0; j < productsArr[i].stock; j++){
                        productQtyListArr.push(j + 1)
                    }
                }
            }
            setProductQtyList(productQtyListArr)
        })
        .catch(err => {
            console.log(err.response)
            
        })

    },[])


    const submitFunc = (e) =>{
        
        e.preventDefault()
        

        if(token !== null){
            let product_id = 0
            //for loop to find the product id of the item based on color and size
            for(let i = 0; i < productInfoList.length; i++){
                if(productInfoList[i].color === selectColor && productInfoList[i].size === selectSize){
                    product_id = productInfoList[i].id
                }
            }

            console.log(product_id, selectQty)
            
            axios({
                url:'https://padelle.herokuapp.com/api/v1/cart/add_many',
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${token}`
                },
                data:{
                    "item": product_id,
                    "amount": selectQty
                }
            })
            .then(success=>{
                console.log(success)
                window.location.reload()
            })
            .catch(err=>console.log(err.response))
        }else{
            console.log('you need to log in before you can proceed.')
            setLogInModal(!logInModal)
            }
        
    }

    const changeColor = (value) => {
        setSelectColor(value)
        console.log('changeColor', value, selectSize)
        let qty = []
        for(let i = 0; i < productInfoList.length; i++){
            if(productInfoList[i].color === value && productInfoList[i].size === selectSize){
                console.log('found change color match')
                if(productInfoList[i].stock < 1){
                    qty.push('SOLD')
                }else{
                    for(let j = 0; j < productInfoList[i].stock; j++){
                        qty.push(j+1)
                     }
                }
                
            }

            if(productInfoList[i].color === value){
                setProductImage(productInfoList[i].image)
            }
        }
        setProductQtyList(qty)
    }

    const changeSize = (value) =>{
        setSelectSize(value)
        console.log('changeSize', value, selectColor)
        console.log(productInfoList)

        let qty = []
        for(let i = 0; i < productInfoList.length; i++){
            if(productInfoList[i].size === value && productInfoList[i].color === selectColor){
                console.log('found change size match')
                if(productInfoList[i].stock < 1){
                    qty.push('SOLD')
                }else{
                    for(let j = 0; j < productInfoList[i].stock; j++){
                        qty.push(j+1)
                    }
                }
                
            }
        }

        if(qty.length === 0){
            qty.push('SOLD')
        }

        console.log(qty)
        setProductQtyList(qty)
    }
    
    return(
        <Container style={{marginTop:"5%", marginBottom:"5%"}}>
            <Row>
                <Col xs="12" lg="6">
                    <img src={productImage} style = {{width:"100%", maxHeight:"800px"}}></img>
                </Col>
                <Col xs="12" lg="6" >
                    <Row style={{display:"flex", justifyContent:"center"}}>
                        <h3>
                            {productName}
                        </h3>
                        
                    </Row>
                    <FormGroup row>
                        <Col sm={6}>
                            <Label for="type" >
                                <h4>Type:</h4>
                            </Label>
                        </Col>
                        <Col sm={4}>
                            <h5>{productType}</h5>
                        </Col> 
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={6}>
                            <Label for="price" >
                                <h4>Price:</h4>
                            </Label>
                        </Col>
                        <Col sm={4}>
                            <h5>{currency.formatCurrency(Number(productPrice))}</h5>
                        </Col> 
                    </FormGroup>
                    
                    <FormGroup row>
                        <Col sm={6}>
                            <Label for="selectColor" >
                                <h4>Color:</h4>
                            </Label>
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectColor" id="selectColor" value={selectColor} onChange={(e)=>changeColor(e.target.value)}>
                                {
                                    productColors.map((color)=>{
                                        return(
                                            <option value={color}>
                                                {color}
                                            </option>
                                        )
                                    })
                                }
                            </Input>
                        </Col> 
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={6}>
                            <Label for="selectSize" >
                                <h4>Size:</h4>
                            </Label> 
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectSize" id="selectSize" value = {selectSize} onChange={(e)=>changeSize(e.target.value)}>
                                {
                                    // productInfoList.map((item)=>{
                                    //     if(item.color === selectColor){
                                    //         return(
                                    //             <option value={item.size}>{item.size}</option>
                                    //         )
                                    //     }
                                    // })
                                    productSize.map(size=>{
                                        return(
                                            <option value={size}>{size}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={6}>
                            <Label for="selectQty" >
                                <h4>Quantity:</h4>
                            </Label> 
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectQty" id="selectQty" value = {selectQty} onChange={(e)=>setSelectQty(e.target.value)}>
                                {
                                    productQtyList.map(num=>{
                                        return(
                                            <option value={num}>{num}</option>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                    
                    <Form onSubmit={(e)=>{submitFunc(e)}}>
                        
                        
                        {
                            token !== null && admin === 'false'?
                            <Input type="submit" value="Add to cart" ></Input>
                            :token === null?
                            <Input type="submit" value="You have to Log In first" style={{color:"white"}}></Input>:
                            <h5>You have to login with a user account to add item to cart.</h5>
                        }
                        
                    </Form>
                </Col>
            </Row>
            
            
        </Container>
    )
}

export default ProductDetailsPage