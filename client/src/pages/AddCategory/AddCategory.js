import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';

// Import useMutation and useQuery from react-query here ...
import { useMutation } from 'react-query';



// Get API config here ...
import { API } from '../../config/api'
import NavBarAdmin from '../../Component/Navbar/NavbarAdmin';
import cssModules from './AddCategory.module.css'


export default function AddCategory() {
  //console.clear();

  let navigate = useNavigate();
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.post('/category', body, config);

      navigate('/category');
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <div className="bg-black">
    <NavBarAdmin/>
    <Container className={cssModules.Container}>
      <div className="mt-0">
      <h1 className={cssModules.name}>Add Category</h1>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className={cssModules.input} controlId="formBasicName">
          <Form.Control 
            className={cssModules.input1} 
            type="text" 
            placeholder="Category"
            value={category}
            name="category"
            onChange={handleChange}
          />
        </Form.Group>        
        <Button className={cssModules.btn} variant="success" type="submit">
          Save
        </Button>
      </form>
        </div>
    </Container> 
    </div>
  );
}