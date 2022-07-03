//import css modules
import cssModules from './ListCategory.module.css'
import {Link} from "react-router-dom";

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavBar from '../../Component/Navbar/Navbar';
import { useNavigate } from 'react-router';

// Import useQuery here ...
import {useQuery, useMutation } from 'react-query'

import {API} from '../../config/api'

import DeleteData from '../../Component/Modal/DeleteData';

function ListCategory() {
  let navigate = useNavigate();

  // Create variabel for id product and confirm delete data with useState here ...
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create init useState & function for handle show-hide modal confirm here ...
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: categories, refetch } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleEdit = (id) => {
    navigate(`/edit-category/${id}`);
  };

  // Create function handle get id product & show modal confirm delete data here ...
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // Create function for handle delete product here ...

  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const addCategory = () => {
    navigate('/add-category');
  };

  return (
    <div className="bg-black">
    <NavBar/>
    <Container className={cssModules.Container}>
    <h1 className={cssModules.name}>List Category</h1>
        <Button
            onClick={addCategory}
            className={cssModules.add}
            style={{ width: '100px' }}
            variant="dark"
          >
            Add
        </Button>
      <Table striped bordered hover variant="dark" className={cssModules.table}>
        <thead>
          <tr>
            <th className="sm-1">No.</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {categories?.map((item, index) => (
          <tr key={index}>
            <td className='m-auto'>{index + 1}</td>
            <td className='m-auto'>{item.name}</td>
            <td>
              <Button variant="success" 
                className={cssModules.button} 
                onClick={() => {
                  handleEdit(item.id);
                }}
                >
                Edit
              </Button>
              <Button variant="danger" 
                className={cssModules.btn}
                onClick={() => {
                  handleDelete(item.id);
                }} 
                >
                Delete
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </Container> 
    <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}


export default ListCategory