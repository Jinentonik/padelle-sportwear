import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ProductPagination = (props) => {
    const {productPerPage, totalProducts, setCurrentPage} = props
    let pageNumber = []
    let numberOfPages = Math.ceil(totalProducts/productPerPage)
    for(let i = 1; i <= numberOfPages; i++){
        pageNumber.push(i)
    }

    let paginate = (num) => {
      setCurrentPage(num)
    }
    return(

        <Pagination size="sm" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
        {pageNumber.map((num)=>{
            return(
                <PaginationItem>
                    <PaginationLink href = "#" onClick = {()=>paginate(num)}>
                        {num}
                    </PaginationLink>
                </PaginationItem>
            )
        })}
      
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
    )
}

export default ProductPagination