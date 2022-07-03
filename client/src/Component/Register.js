import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContex';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import cssModules from './Register.module.css'

// Import useMutation from react-query here ...
import { useMutation } from 'react-query'

// Get API config here ...
import { API } from '../config/api'

export default function Register() {
  let navigate = useNavigate();

  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // Data body => Convert Object to String
      const body = JSON.stringify(form);
  
      // Insert data user to database
      const response = await API.post('/register', body, config);
  
      // Handling response here
      console.log(response.data)


      // Notification
      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
      } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
      }
});

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div
          style={{ fontSize: '30px', lineHeight: '49px', fontWeight: '600' }}
          className="mb-2"
        >
          Register
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className={cssModules.form}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className={cssModules.form}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className={cssModules.form}
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <Button variant="danger" type="submit" className="btn btn-login">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}