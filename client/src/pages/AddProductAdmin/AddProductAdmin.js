import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';

// Import useMutation and useQuery from react-query here ...
import { useMutation } from 'react-query';



// Get API config here ...
import { API } from '../../config/api'
import NavBarAdmin from '../../Component/Navbar/NavbarAdmin';
import cssModules from './AddProductAdmin.module.css'


export default function AddProductAdmin() {

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  console.log(categories)
  
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: ''
  });

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // Create function for handle insert product data with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
  
      // Data body
      const formData = new FormData();
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('categoryId', categoryId);

      // Insert data product to database
      const response = await API.post('/product', formData, config);
      console.log('dataproduct',response)
  
      navigate('/product')
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-black">
    <NavBarAdmin/>
    <Container className={cssModules.Container}>
      <div className="mt-0">
      <h1 className={cssModules.name}>Add Product</h1>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
      {preview && (
        <div>
        <img className={cssModules.img}
          src={preview}
          style={{
            maxWidth: '150px',
            maxHeight: '150px',
            objectFit: 'cover',
            }}
          alt={preview}
        />
        </div>
        )}
        <input
        type="file"
        id="upload"
        name="image"
        hidden
        onChange={handleChange}
        />
        <label for="upload" className={cssModules.label}>
            Upload file
        </label>
        <Form.Group className={cssModules.input} controlId="formBasicName">
          <Form.Control 
            className={cssModules.input1} 
            type="text" 
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className={cssModules.input} controlId="formBasicDexcription">
          <textarea 
            className={cssModules.description} 
            type="text" 
            placeholder="Product Desc .."
            name="desc"
            onChange={handleChange}
            >
          </textarea>
        </Form.Group>
        <Form.Group className={cssModules.input} controlId="formBasicPrice">
          <Form.Control 
            className={cssModules.input1} 
            type="number" 
            placeholder="Rp .." 
            name="price"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className={cssModules.input} controlId="formBasicQty">
          <Form.Control 
            className={cssModules.input1} 
            type="number" 
            placeholder="Stock ex. 500"
            name="qty"
            onChange={handleChange}
          />
        </Form.Group>
        <div className={cssModules.checkbox}>
            <div
                className="text-secondary mb-1"
                style={{ fontSize: '15px', color: 'white' }}
                >
                Category
            </div>
                {categories.map((item, index) => (
                  <label className="checkbox-inline me-4" key={index}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{' '}
                    {item.name}
                  </label>
                ))}
        </div>
        
        <Button className={cssModules.btn} variant="success" type="submit">
          Save
        </Button>
      </form>
        </div>
    </Container> 
    </div>
  );
}