import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import product1 from '../components/Images/female_sport3.jpg'
import axios from 'axios'


const ProductDetailsPage =(props) => {
    const {cartItem, setCartItem} = props
    const {name} = useParams()
    const [product,setProduct] = useState('')
    const [sort,setSort] = useState('')
    const [productName, setProductName] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productType, setProductType] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productColors, setProductColors] = useState([])
    const [productSize, setProductSize] = useState([])
    const [selectSize, setSelectSize] = useState('')
    const [selectColor, setSelectColor] = useState('')
    const [productInfoList, setProductInfoList] = useState([])
    let token = localStorage.getItem("token")

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
                //     console.log(product[i].name)
                    if(i === 0){
                        setProductName(productInfo[i].name)
                        setProductType(productInfo[i].type)
                        setProductPrice(productInfo[i].price)
                        setProductImage(productInfo[i].image_url)
                    }
                    if(colorArr.indexOf(productInfo[i].color) === -1 && productInfo[i].stock > 0){
                        colorArr.push(productInfo[i].color)
                    }
                    if(sizeArr.indexOf(productInfo[i].size) === -1 && productInfo[i].stock > 0){
                        sizeArr.push(productInfo[i].size)
                    }
                    productsArr.push({"id": productInfo[i].id, "size": productInfo[i].size, "color": productInfo[i].color})
            }
            setProductColors(colorArr)
            setProductSize(sizeArr) 
            setSelectSize(sizeArr[0])
            setSelectColor(colorArr[0])
            setProductInfoList(productsArr)
            
        })
        .catch(err => console.log(err))

    },[])



    

    // const submitFunc2 = (e) => {
    //     e.preventDefault()
    //     console.log('add to cart')
    //     console.log(cartItem)
    //     //using database
    //     axios({
    //         url:"https://padelle.herokuapp.com/api/v1/cart",
    //         method:"POST",
    //         data:{
    //             "user":"1",
    //             "item":product.id
    //         }
    //     })
    //     .then(success=>console.log(success))
    //     .catch(err=>console.log(err))

    //     //without using database
    //     if(cartItem.length === 0){
    //         setCartItem(
    //         [
    //             {
                    
    //                 "name":product.name,
    //                 "type":product.type,
    //                 "count":1,
    //             }
    //         ]
    //         )
    //     }else{
    //         let check = false
    //         let index = 0
    //         for(let i = 0; i < cartItem.length; i++){
    //             if(id === cartItem[i].id){
    //                 check = true
    //                 index = i
    //                 // cartItem[i].count = cartItem[i].count + 1
    //             }
    //         }

    //         if(check){
    //             cartItem[index]["count"] = cartItem[index]["count"] + 1
    //         }else{
    //             setCartItem(
    //                 [...cartItem, 
    //                     {
    //                         "id":id,
    //                         "name":product.name,
    //                         "type":product.type,
    //                         "count":1
                        
    //                     }
    //                 ]
    //             )
    //         }
    //     }
        

        
    // }
    


    const submitFunc = (e) =>{
        
        e.preventDefault()
        
        let product_id = 0

        for(let i = 0; i < productInfoList.length; i++){
            if(productInfoList[i].color === selectColor && productInfoList[i].size === selectSize){
                product_id = productInfoList[i].id
            }
        }
        
        axios({
            url:'https://padelle.herokuapp.com/api/v1/cart/add_new_item',
            method:"POST",
            headers:{
                "Authorization": `Bearer ${token}`
            },
            data:{
                "item": product_id
            }
        })
        .then(success=>{
            console.log(success)
            window.location.reload()
        })
        .catch(err=>console.log(err.response))
    }

    
    
    return(
        <Container style={{marginTop:"5%", marginBottom:"5%"}}>
            <Row>
                <Col xs="12" lg="6">
                    <img src={productImage} style = {{width:"100%", maxHeight:"800px"}}></img>
                </Col>
                <Col xs="12" lg="6" >
                    <Row style={{display:"flex", justifyContent:"center"}}>
                        <h4>
                            {productName}
                        </h4>
                        
                        
                    </Row>
                    <Row style={{display:"flex", justifyContent:"center"}}>
                        <Col xs={6}>
                            <h4> Type: </h4>
                        </Col>
                        <Col xs={6}>
                            <h4>
                                {productType}
                            </h4>
                        </Col>  
                        
                    </Row>

                    <Row style={{display:"flex", justifyContent:"center"}}>
                    <Col xs={6}>
                            <h4> Price: </h4>
                        </Col>
                        <Col xs={6}>
                            <h4>
                                {productPrice}
                            </h4>
                        </Col> 
                    </Row>
                    <Row style={{display:"flex", justifyContent:"center"}}>
                        <Col xs={6}>
                            <Label for="selectColor" sm={2}>
                                <h4>Size:</h4>
                            </Label>
                        </Col>
                        <Col xs={4}>
                            <Input type="select" name="selectColor" id="selectColor" value={selectColor} onChange={(e)=>setSelectColor(e.target.value)}>
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
                    </Row>
                    
                    <Form onSubmit={(e)=>{submitFunc(e)}}>
                        <FormGroup row>
                            <Col sm={6}>
                                <Label for="selectSize" sm={2}>
                                    <h4>Size:</h4>
                                </Label> 
                            </Col>
                            <Col sm={4}>
                            <Input type="select" name="selectSize" id="selectSize" value = {selectSize} onChange={(e)=>setSelectSize(e.target.value)}>
                                {
                                    productSize.map(size=>{
                                        return(
                                            <option value={size}>{size}</option>
                                        )
                                    })
                                }
                            </Input>
                            </Col>
                        </FormGroup>
                        
                        <Input type="submit" value="Add to cart" ></Input>
                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
}

export default ProductDetailsPage