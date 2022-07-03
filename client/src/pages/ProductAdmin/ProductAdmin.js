//import css modules
import cssModules from './ProductAdmin.module.css'

import ShowMoreText from 'react-show-more-text';
import rupiahFormat from 'rupiah-format'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import NavBarSearch from '../../Component/Navbar/NavbarSearch';

// Import useQuery here ...
import {useQuery} from 'react-query'

import {API} from '../../config/api'


function ProductAdmin() {
  let navigate = useNavigate();


  // Create process for fetching products data from database with useQuery here ...

  let {data: products, isLoading} = useQuery('productData', async () => {
    const response = await API.get('/products')
    console.log(response)

    return response.data.data
  })
    console.log(isLoading)

  const addProduct = () => {
    navigate('/add-product');
  };

  
  return (
    <div className="bg-black">
    <NavBarSearch/>
    <Container className={cssModules.Container}>
    <h1 className={cssModules.name}>List Product</h1>
    <Button
      onClick={addProduct}
      className={cssModules.add}
      style={{ width: '100px' }}
      variant="dark"
      >
      Add
     </Button>
    <Table striped bordered hover variant="dark" className={cssModules.table}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Photo</th>
          <th>Product Name</th>
          <th>ProductDesc</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((item, index) => (
        <tr key={index}>
          <td className='m-auto'>{index + 1}</td>
          <td className='m-auto'>
            src={item.image}
            style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            }}
            alt={item.name}
          </td>
          <td className='m-auto'>{item.name}</td>
          <td className='m-auto'>
            <ShowMoreText
              /* Default options */
              lines={1}
              more="show"
              less="hide"
              className="content-css"
              anchorClass="my-anchor-css-class"
              expanded={false}
              width={280}
              >
              {item.desc}
            </ShowMoreText>
          </td>
          <td className='m-auto'>
            {rupiahFormat.convert(item.price)}
          </td>
          <td className='m-auto'>
            {item.qty}
          </td>
          <td>
            <Button variant="success" className={cssModules.button} href="/edit-product">Edit</Button>
            <Button variant="danger" className={cssModules.btn}>Delete</Button>
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
    </Container> 
    </div>
  );
}


export default ProductAdmin