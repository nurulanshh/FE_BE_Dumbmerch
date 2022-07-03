import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../../Component/Login";
import Register from "../../Component/Register";

import { UserContext } from "../../context/userContex";

import cssModules from './auth.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Auth() {
  let navigate = useNavigate();

  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      if(state.user.status == 'Customer'){
        navigate('/')
      }else{
        navigate('/complain-admin')
      }
    }
  };
  checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <div className="bg-black">
      <Container className={cssModules.Container}>
        <Row>
          <Col sm={8} className={cssModules.Col1}>
          <img src='/images/dumbmerch1.png' alt="" className={cssModules.img}/>
          <h1 className={cssModules.h1}>Easy, Fast, and Reliable</h1>
          <h5 className={cssModules.h5}>
              Go shopping for merchandise, just got to dumbmerch
              shopping, the biggest merchandise in Indonesia
          </h5>
            <div className="mt-3">
              <Button onClick={switchLogin} variant="danger" className={cssModules.button}>
                Login
              </Button>
              <Button onClick={switchRegister} variant="link" className={cssModules.button1}>
                Register
              </Button>
            </div>
          </Col>
          <Col sm={4} className={cssModules.Col2}>
          <Card className={cssModules.cardBody}>
            {isRegister ? <Register/> : <Login/>}
          </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}