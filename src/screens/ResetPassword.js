import React, { useState, useEffect } from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Reset } from '../actions/userActions'
import Message from '../components/Message'
import { useParams,useNavigate } from 'react-router-dom';

import './ResetPassword.css'

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(0)
  // const userLogin = useSelector((state) => state.userLogin)
  // const { message,error } = userLogin;
  const navigate =useNavigate();
  const { token } = useParams();
  const reset = useSelector((state) => state.resetPassword);
   let { Loading,error,success } = reset;

  const submitHandler = (e) => {
    setFormError(0);
    e.preventDefault();

    if (password.length && confirmPassword.length && confirmPassword===password)
    {
      dispatch(Reset(password,token));
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setFormError(1);
    }
    };
    useEffect(() => {
      dispatch({ type: 'RESET_PASSWORD_RESET' });
    }, [dispatch]);

  return (
    <Container className='my-3'>
    <FormContainer>
    {success && <Message variant='success'>Password reset successfully!</Message>}
    {error && <Message variant='danger'>{error}</Message>}
      <h1>Reset Password</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='New password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Enter Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
            >
            </Form.Control>
        </Form.Group>
        {
          formError ? <div class="Reset__error-message">
            Password does not match!
          </div> : null
        }
        <Button type='submit' variant='secondary' className='my-2'>
          Submit
        </Button>
      </Form>
    </FormContainer>
    </Container>
  )
  }
export default ResetPassword
