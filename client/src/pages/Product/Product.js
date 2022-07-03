//import css modules
import cssHmModules from './Product.module.css'
import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import dataProduct from '../../fakedata/product'
import { Link } from 'react-router-dom'
// import NavBar from '../../Component/Navbar/Navbar';
import convertRupiah from 'rupiah-format';


// Import useQuery here ...
import {useQuery} from 'react-query'

// Get API config here ...
import {API} from '../../config/api'
import NavBarAdmin from '../../Component/Navbar/NavbarAdmin';
  
  function Product() {
    // Create process for fetching products data from database with useQuery here ...

  let {data: products, isLoading} = useQuery('productData', async () => {
    const response = await API.get('/products')
    console.log(response)

    return response.data.data
  })
    console.log(isLoading)
    
    return (
      <div className={cssHmModules.page}>
       <NavBarAdmin/>
      <h1 className={cssHmModules.Product}>Product</h1>
      <Row xs={1} md={4} className={cssHmModules.productCard}>
      {products?.map((item, index) => (
          <Col className='g-4' key={index}>
            <Card className='bg-dark'>
              <Card.Img className={cssHmModules.imgCard} variant="top" src={item.image}/>
              <Card.Body>
                <Link className={cssHmModules.cardTitle} as={Link} to={`/detail-product/` + item.id}>{item.name} 
                </Link>
                <Card.Text className={cssHmModules.cardText}>
                    {convertRupiah.convert(item.price)}
                </Card.Text>
                <Card.Text className={cssHmModules.cardText}>
                    Stock : {item.qty}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
    );
  }
  
  export default Product;