//import css modules
import cssModules from './EditCategory.module.css'


import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useParams} from "react-router-dom";

// Import useMutation and useQuery from react-query here ...
import { useQuery, useMutation } from 'react-query';

import { API } from '../../config/api'
import NavBarAdmin from '../../Component/Navbar/NavbarAdmin';

function EditCategory() {

  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  useQuery('editCategoryCache', async () => {
    const response = await API.get('/category/' + id);
    setCategory({ name: response.data.data.name });
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch('/category/' + id, body, config);

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
      <h1 className={cssModules.name}>Edit Category</h1>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className={cssModules.input} controlId="formBasicName">
          <Form.Control 
            className={cssModules.input1} 
            placeholder="Category"
            defaultValue={category?.name}
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


export default EditCategory