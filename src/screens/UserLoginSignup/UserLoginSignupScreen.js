import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Login, register } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from 'react-router-dom';


import {
  Container,
  SignInContainer,
  Form,
  Title,
  Input,
  Anchor,
  Button,
  Overlay,
  OverlayContainer,
  RightOverlayPanel,
  LeftOverlayPanel,
  Paragraph,
  GhostButton,
  SignUpContainer,
  ImgContainer,
  Image,
  PasswordImage,
  PasswordContainer,
} from "./Components";

import logo from "../../assets/logo.png";
import ShowPassword from "../../assets/showPwd.svg";
import HidePassword from "../../assets/HidePassword.svg";
import socket from "../../socket";

const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const UserLoginSignupScreen = () => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [gender, setGender] = useState("male");
  const [message, setMessage] = useState(null);
  const [signIn, toggleSignIn] = useState(true);
  const [pwdRegReveal, setPwdRegReveal] = useState(false);
  const [pwdLogReveal, setPwdLogReveal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const MessageMemo = React.memo(Message);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onValueChange = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleAcceptTerms = () => {
    setAcceptTerms((prevAcceptTerms) => !prevAcceptTerms);
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, message: registerMessage } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: fetching, error: fault, userInfo: userData } = userLogin;

  const redirect = "/app/pool";

  useEffect(() => {
    if (userInfo || userData) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect, userData]);

  // registers the user
  const handleRegisteration = (e) => {
    
    e.preventDefault();
    if (!signup) {
      setMessage("Please fill all the inputs");
    } else if (signup.password !== signup.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setLogin(signup.email,signup.password);
      dispatch(register({ ...signup, gender }));
      setTimeout(() => {
        dispatch({ type: 'USER_CLEAR_ERRORS' });
      }, 1000);
    }
  };

  //log the user in
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(Login({ ...login }));
    setTimeout(() => {
      dispatch({ type: 'USER_CLEAR_ERRORS' });
    }, 1000);

  };



  // Function to toggle between sign-in and sign-up
  useEffect(() => {
    if (signIn) {
      setLogin({
        email: signup.email,
        password:signup.password,
      });
    } else {
      setSignup({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    }
  }, [signIn]);


  useEffect(() => {
    
     
    
    
  }, [fault,message,registerMessage,error]);

  return (
    <>
      {fault && <MessageMemo variant="danger">{fault}</MessageMemo>}

      {message && <MessageMemo variant="danger">{message}</MessageMemo>}
      {registerMessage && (
        <MessageMemo variant="success">{registerMessage}</MessageMemo>
      )}
      {error && <MessageMemo variant="danger">{error}</MessageMemo>}
      <Container>
        {/* login */}
        <SignInContainer signingIn={signIn}>
          <Form onSubmit={handleLogin}>
            <Title>Sign in</Title>

            <Input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
              value={login.email}
              
              onChange={(e) => onInputChange(e)}
              // pattern=" /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            />
            <PasswordContainer>
              <Input
                type={pwdLogReveal ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
              <PasswordImage
                src={pwdLogReveal ? ShowPassword : HidePassword}
                width={20}
                onClick={() => setPwdLogReveal((prev) => !prev)}
              />
            </PasswordContainer>
            <Link to='/forgot-password' style={
              {
                paddingBottom: '5px' 
              }}>Forgot your password?</Link><br></br>
            <Button type="submit">
              {!fetching ? "Sign In" : <Loader small />}
            </Button>
          </Form>
        </SignInContainer>

        {/* register */}
        <SignUpContainer signingIn={signIn}>
          <Form onSubmit={handleRegisteration}>
            <Title>Create Account</Title>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={signup.name}
              
              onChange={(e) => onValueChange(e)}
              required={true}
            />
            <Input
              type="email"
              value={signup.email}
              
              placeholder="Email"
              name="email"
              onChange={(e) => onValueChange(e)}
              required={true}
            />
            <Input
              type="text"
              placeholder="Username"
              value={signup.username}
              name="username"
              onChange={(e) => onValueChange(e)}
              required={true}
            />
            <PasswordContainer>
              <Input
                type={pwdRegReveal ? "text" : "password"}
                placeholder="Password"
                value={signup.password}
                name="password"
                onChange={(e) => onValueChange(e)}
                required={true}
              />
              <PasswordImage
                src={pwdRegReveal ? ShowPassword : HidePassword}
                width={20}
                onClick={() => setPwdRegReveal((prev) => !prev)}
              />
            </PasswordContainer>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={signup.confirmPassword}
              name="confirmPassword"
              onChange={(e) => onValueChange(e)}
              required={true}
            />
            <Input
              type="text"
              placeholder="Phone No."
              value={signup.phone}
              name="phone"
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
              onChange={(e) => onValueChange(e)}
              required={true}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Input
                type="radio"
                name="gender"
                checked={gender === "male"}
                label={`Male`}
                value="male"
                style={{ marginRight: "3px" }}
                onChange={handleGenderChange}
              />
              <span
                style={{
                  marginRight: "1rem",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Male
              </span>
              <Input
                type="radio"
                name="gender"
                id="female"
                label={`Female`}
                value="female"
                onChange={handleGenderChange}
              />
              <span
                style={{
                  marginLeft: "3px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Female
              </span>
            </div>
            
            <label
            style={
              {
                paddingBottom: '5px' 
              }
            }
            >
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={handleAcceptTerms}
            />{" "}
            I accept the <Link to="/terms">Terms & Conditions</Link>
          </label>
          <br></br>
            <Button type="sumbit"  disabled={!acceptTerms || loading}>
              {!loading ? "Sign Up" : <Loader small />}
            </Button>
          </Form>
        </SignUpContainer>

        <OverlayContainer signingIn={signIn}>
          <Overlay signingIn={signIn}>
            <LeftOverlayPanel signingIn={signIn}>
              <ImgContainer>
                <Image src={logo} />
              </ImgContainer>
              <div style={{ marginTop: "8rem" }}>
                <Title>Welcome Back!</Title>
                <Paragraph>
                  To keep connected with us please login with your personal info
                </Paragraph>
                <GhostButton onClick={() =>{toggleSignIn(true)}}>
                  Sign In
                </GhostButton>
              </div>
            </LeftOverlayPanel>
            <RightOverlayPanel signingIn={signIn}>
              <Title>Welcome User!</Title>
              <Paragraph>
                Enter your personal details and start your journey of
                discussions.
              </Paragraph>
              <GhostButton onClick={() => {toggleSignIn(false);}}>
                Sign Up
              </GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </>
  );
};

export default UserLoginSignupScreen;
