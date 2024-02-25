import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col ,Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation ,useNavigate } from 'react-router-dom';
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login,clearErrors } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const userLogin = useSelector((state) => state.userLogin)
  var { loading, error, userInfo } = userLogin

  const redirect = '/app/pool'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
    
  }, [history, userInfo, redirect])
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(login(email, password));
    dispatch({ type: 'USER_CLEAR_ERRORS' });
   
    
  }
  useEffect(() => {
    dispatch({ type: 'USER_CREATE_RESET' });
  }, [dispatch]);

  return (
    <Container className='my-3'>
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='secondary' className='my-2'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </Container>
  )
}

export default LoginScreen
