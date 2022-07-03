import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import Form from 'react-bootstrap/Form';

import { API } from '../../config/api';
import NavBarAdmin from '../../Component/Navbar/NavbarAdmin';
import cssModules from './EditProduct.module.css'

export default function EditProduct() {

  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  }); //Store product data


  // Fetching detail product data by id from database
  let { data: products, refetch } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });

  // Fetching category data
  let { data: categoriesData, refetch: refetchCategories } = useQuery(
    'categoriesCache',
    async () => {
      const response = await API.get('/categories');
      return response.data.data;
    }
  );

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setForm({
        ...form,
        name: products.name,
        desc: products.desc,
        price: products.price,
        qty: products.qty,
      });
      setProduct(products);
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [products]);

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

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      formData.set('categoryId', categoryId);

      // Insert product data
      const response = await API.patch('/product/' + product.id, formData, config);

      console.log(response.data);

      navigate('/product');
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

  return (
<div className="bg-black">
    <NavBarAdmin/>
    <Container className={cssModules.Container}>
      <div>
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
            value={form?.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className={cssModules.input} controlId="formBasicDexcription">
          <textarea 
            className={cssModules.description} 
            type="text" 
            placeholder="Product Desc .."
            name="desc"
            value={form?.desc}
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
            value={form?.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className={cssModules.input} controlId="formBasicQty">
          <Form.Control 
            className={cssModules.input1} 
            type="number" 
            placeholder="Stock ex. 500"
            name="qty"
            value={form?.qty}
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
                      categoryId={categoryId}
                      value={item?.id}
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