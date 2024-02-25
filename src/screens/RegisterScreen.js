import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col,Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation ,useNavigate } from 'react-router-dom';
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register,clearErrors } from '../actions/userActions'


const RegisterScreen = () => {
  const navigate= useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [gender, setGender] = useState('male')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo, message: registerMessage } = userRegister

  const redirect = '/app/pool'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password,gender,mobile,username))
    }
  }

  const handleGenderChange=(e)=>{
    setGender (e.target.value)
  }
  useEffect(() => {
    dispatch({type:'USER_REGISTER_RESET'});
  }, [dispatch]);

  return (
    <Container className='my-2'>
    <FormContainer>
      <h1 className="mb-3">Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {registerMessage && <Message variant='success'>{registerMessage}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      { loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
        </Form.Group>S

        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Form.Group controlId='confirmPassword' className='my-2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='mobile' className='my-2'>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type='number'
            placeholder='Mobile'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='gender' className='my-2' onChange={handleGenderChange}>
        <Form.Check 
            type= 'radio'
            name= 'gender'
            id= 'male'
            checked={gender === "male"}
            label={`Male`}
            value='male'
          />

          <Form.Check 
            type= 'radio'
            name= 'gender'
            id= 'female'
            label={`Female`}
            value='female'
          />
        </Form.Group>

        <Button type='submit' variant='secondary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </Container>
  )
}

export default RegisterScreen
