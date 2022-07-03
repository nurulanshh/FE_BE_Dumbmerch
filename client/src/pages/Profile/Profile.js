//import css modules
import cssModules from './Profile.module.css'


import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavBar from '../../Component/Navbar/Navbar';

import dateFormat from 'date-format';
import convertRupiah from 'rupiah-format';
import { useQuery } from 'react-query';

import { UserContext } from '../../context/userContex';


import { API } from '../../config/api';


function Profile() {
    let api = API();

  const [state] = useContext(UserContext);

  // Fetching profile data from database
  let { data: profile} = useQuery("profileCache",async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/profile");
      return response.data.data;
    }
  );

  // Fetching transactions data from database
  let { data: transactions} = useQuery("transactionsCache",async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/transactions");
      console.log('respons', response)
      return response.data.data;
    }
  );

  return (
    <div className="bg-black">
    <NavBar/>
    <Container className={cssModules.Container}>
    <Row>
    <Col sm={3} className={cssModules.Col1}>
        <h1 className={cssModules.Profile}>My Profile</h1>
        <img src='/images/profile.png' alt="" className={cssModules.img}/>
    </Col>
    <Col sm={2} className={cssModules.Col2}>
        <div className='mt-5'>
            <h3 className={cssModules.h3}>Name</h3>
            <h4 className={cssModules.h4}>{state.user.name}</h4>
            <h3 className={cssModules.h3}>Email</h3>
            <h4 className={cssModules.h4}>{state.user.email}</h4>
            <h3 className={cssModules.h3}>Phone</h3>
            <h4 className={cssModules.h4}>{profile?.phone ? profile?.phone : '-'}</h4>
            <h3 className={cssModules.h3}>Gender</h3>
            <h4 className={cssModules.h4}>{profile?.gender ? profile?.gender : '-'}</h4>
            <h3 className={cssModules.h3}>Address</h3>
            <h4 className={cssModules.h4}>{profile?.address ? profile?.address : '-'}</h4>
        </div>
    </Col>
    <Col sm={4} className={cssModules.Col3}> 
    <h1 className={cssModules.Profile}>My Transaction</h1>
    <Card className={cssModules.cardBody}>
        {transactions?.map((item, index) => (
          console.log('transaksi', item),
    <Row key={index}>
        <Col sm={2} className={cssModules.Col4}>
            <img 
                src={item.product.image}
                alt="img"
                className={cssModules.imgCart}
                style={{
                height: '120px',
                width: '170px',
                objectFit: 'cover',
            }}/>
        </Col>
        <Col sm={5} className={cssModules.Col5}>
            <p className={cssModules.p1}> {item.product.name}</p>
            <p className={cssModules.p2}> {dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}</p>
            <p className={cssModules.p3}> Price : {convertRupiah.convert(item.price)}</p>
            <p className={cssModules.p4}> Sub Total : {convertRupiah.convert(item.price)}</p>
        </Col>
        <Col sm={2} className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}>
          {item.status}
        </Col>
    </Row>
    ))};
    </Card>
    </Col>
    </Row>
    </Container>
    </div>
  )
}

export default Profile