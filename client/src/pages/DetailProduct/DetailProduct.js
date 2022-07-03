//import css modules
import cssModules from './DetailProduct.module.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavBar from '../../Component/Navbar/Navbar';
import dataProduct from '../../fakedata/product';
import { useParams, useNavigate } from 'react-router-dom';
import convertRupiah from 'rupiah-format';
import React, {useState, useEffect} from 'react';
import { useQuery, useMutation } from 'react-query';

import { API } from '../../config/api';

function DetailProduct() {

  let navigate = useNavigate();
  let { id } = useParams();

  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });

  // Create config Snap payment page with useEffect here ...
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-_uTSrD57ODPvAE-B";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [])

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      const response= await API.post('/transaction', body, config);

      // Create variabel for store token payment from response here ...
      const token = response.data.payment.token;

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      })

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className='bg-black'>
      <NavBar/>
    <Container className={cssModules.Container}>
    <Row>
    <Col sm={4} className={cssModules.Col1}>
        <img src={product?.image} alt="" className={cssModules.img}/>
    </Col>
    <Col sm={8} className={cssModules.Col2}>
        <h1 className={cssModules.name}>{product?.name}</h1>
        <p className={cssModules.p2}>Stock : {product?.qty}</p>
        <p className={cssModules.p3}>
        {product?.desc}
        </p>
        <h3 className={cssModules.h3}>{convertRupiah.convert(product?.price)}</h3>
        <Button className={cssModules.btn} onClick={(e) => handleBuy.mutate(e)} variant="danger" type="submit">
            Buy
        </Button>
    </Col>
    </Row>
    </Container>
    </div>
  )
}

export default DetailProduct