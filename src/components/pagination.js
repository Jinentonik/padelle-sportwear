import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ProductPagination = (props) => {
    const {productPerPage, totalProducts, setCurrentPage, currentPage} = props
    let pageNumber = []
    let numberOfPages = Math.ceil(totalProducts/productPerPage)
    console.log(totalProducts, productPerPage, numberOfPages)
    for(let i = 1; i <= numberOfPages; i++){
        pageNumber.push(i)
    }

    const firstPage = () => {
      setCurrentPage(pageNumber[0])
    } 
    
    const lastPage = () => {
      let lastpg = pageNumber[pageNumber.length - 1]
      setCurrentPage(lastpg)
    }

    const paginate = (num) => {
      setCurrentPage(num)
    }

    const prevPage = () => {
      setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
      setCurrentPage(currentPage + 1)
    }

    return(

        <Pagination size="sm" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" onClick = {()=>firstPage()}/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" onClick = {prevPage} />
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
        <PaginationLink next href="#" onClick = {nextPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" onClick = {()=>lastPage()}/>
      </PaginationItem>
    </Pagination>
    )
}

export default ProductPagination