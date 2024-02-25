import React, { useState } from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Forgot } from '../actions/userActions'
import Message from '../components/Message'

const ForgotPassword = () => {
const dispatch = useDispatch();
const userLogin = useSelector((state) => state.userLogin)
const { message,error } = userLogin;
const [email, setEmail] = useState('');

const  submitHandler = (e) => {
    if (!email.length) {
      return;
    }
    e.preventDefault();
    dispatch(Forgot(email));
  }
  return (
    <Container className='my-3'>
    <FormContainer>
    {error && <Message variant='danger'>{error}</Message>}
    {message && <Message variant='success'>{message.message}</Message>}
      <h1 >Forgot Password</h1>
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

        <Button type='submit' variant='secondary' className='my-2'>
          Generate Link
        </Button>
      </Form>
    </FormContainer>
    </Container>
  )
}

export default ForgotPassword;
