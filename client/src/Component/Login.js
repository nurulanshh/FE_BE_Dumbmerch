import { useContext, useState } from 'react';
import { UserContext } from '../context/userContex';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import cssModules from './Login.module.css'

// Import useMutation from react-query here ...
import { useMutation } from 'react-query'

// Get API config here ...
import { API } from '../config/api'


export default function Login() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  console.log(state)

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

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
      const response = await API.post('/login', body, config);
      console.log(response)

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status === 'Admin') {
          navigate('/complain-admin');
        } else {
          navigate('/complain');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
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
          className="mb-3"
        >
          Login
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
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
            <button className={cssModules.btn}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}