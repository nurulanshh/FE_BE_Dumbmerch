import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useContext} from 'react'
import {
  Link,
  useNavigate
} from "react-router-dom"
import { UserContext } from '../../context/userContex'

//import css modules
import cssModules from './Navbar.module.css'


function NavBarSearch(props) {

  const [state, dispatch] = useContext(UserContext)

  let navigate = useNavigate()

  const logout = () => {
      console.log(state)
      dispatch({
          type: "LOGOUT"
      })
      navigate("/auth")
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" 
              className={props?.title == 'Homepage' ? `text-navbar-active` : `text-navbar`}>
            <img className={cssModules.img} src='/images/logodumbmerch.png' alt=''/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className={cssModules.Navlink} >
            <Form className="d-flex">
                <Form.Control
                   type="search"
                   placeholder="Search"
                   className="me-2 bg-dark border-dark"
                   aria-label="Search"/>
                <Button variant="link" className={cssModules.button}>Search</Button>
            </Form>
            <Nav.Link as={Link} to="/category" 
              className={props?.title == 'Category' ? `text-navbar-active` : `text-navbar`}>
              Category
            </Nav.Link>
            <Nav.Link as={Link} to="/product" 
              className={props?.title == 'Product' ? `text-navbar-active` : `text-navbar`}>
              Product
            </Nav.Link>
            <Nav.Link as={Link} to="/complain" 
              className={props?.title == 'Complain' ? `text-navbar-active` : `text-navbar`}>
              Complain
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" 
              className={props?.title == 'Profile' ? `text-navbar-active` : `text-navbar`}>
              Profile
            </Nav.Link>
            <Nav.Link onClick={logout} className="text-navbar">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarSearch;