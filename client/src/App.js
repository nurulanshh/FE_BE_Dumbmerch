import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContex';

import Auth from './pages/Auth/auth';
import Profile from './pages/Profile/Profile';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import ListCategory from './pages/ListCategory/ListCategory';
import EditCategory from './pages/EditCategory/EditCategory';
import EditProduct from './pages/EditProduct/EditProduct';


// Get API config & setAuthToken here ...
import {API, setAuthToken} from './config/api'
import AddProductAdmin from './pages/AddProductAdmin/AddProductAdmin';
import Product from './pages/Product/Product';
import AddCategory from './pages/AddCategory/AddCategory';
import ListProduct from './pages/ListProduct/ListProduct';
import ProductAdmin from './pages/ProductAdmin/ProductAdmin';
import ComplainUser from './pages/ComplainUser/ComplainUser';
import ComplainAdmin from './pages/ComplainAdmin/ComplainAdmin';

// Init token on axios every time the app is refreshed here ...
if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'Admin') {
        navigate('/complain-admin');
      } else if (state.user.status === 'Customer') {
        navigate('/complain');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Product />} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/detail-product/:id' element={<DetailProduct/>} />
      <Route path='/category' element={<ListCategory/>} />
      <Route path='/edit-category/:id' element={<EditCategory/>} />
      <Route path='/edit-product/:id' element={<EditProduct/>} />
      <Route path='/complain-admin' element={<ComplainAdmin/>} />
      <Route path='/complain' element={<ComplainUser/>} />
      <Route path='/add-product' element={<AddProductAdmin/>} />
      <Route path='/add-category' element={<AddCategory/>} />
      <Route path='/product' element={<ListProduct/>} />
      <Route path='/product-admin' element={<ProductAdmin/>} />
    </Routes>
  );
}

export default App;