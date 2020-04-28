import React, {useState,useEffect} from 'react'
import {Table, Container, Button} from 'reactstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'


const AllUsers = () => {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        axios.get('https://padelle.herokuapp.com/api/v1/users/all')
        .then(success=>{
            console.log(success)
            console.log(success.data)
            setUsers(success.data)
            console.log('successful')
        })
        .catch(err => console.log(err))
    },[])
    console.log('hello')

    const deleteFunc = (userid) => {
        console.log('delete launch')
        axios({
            url:'https://padelle.herokuapp.com/api/v1/users/delete',
            method:'POST',
            data:{
                id:userid
            }
        })
        .then(success=>{
            console.log(success)
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <Container style={{minHeight:"500px"}}>
        <Table >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>delete</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                        return(
                            <tr>
                                <th scope='row'>{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button onClick={() => deleteFunc(user.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </Table>
    </Container>       
    )
}

export default AllUsers