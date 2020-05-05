import React from 'react'
import { Col,Form, FormGroup, Label, Input } from 'reactstrap';

const Filter = (props) => {
    const {sort, setSort, sortHandle} = props
    console.log('filter page before function', sort)
    const changeFunc = (e) => {
        console.log('filter page after func', e.target.value)
        setSort(e.target.value)
        sortHandle(e.target.value)
    }
    return (
        
        <Form>
            <FormGroup row>
                <Label for="orderBy" sm={2}>Order By</Label>
                <Col sm={10}>
                <Input type="select" name="select" id="orderBy" value = {sort} onChange = {(e)=> changeFunc(e)}>
                    <option value="">Select</option>
                    <option value="lowest">Lowest price</option>
                    <option value="highest">Highest price</option>
                    
                </Input>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default Filter