import React, { useCallback, useRef, useState } from "react";
import {
  Card,
  Badge,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from 'styled-components';

import { useDispatch, useSelector } from "react-redux";
import { createPool } from "../../actions/poolActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { BsTrash } from 'react-icons/bs';
import { GrFormUp, GrFormDown } from 'react-icons/gr';
import del from "../../assets/delete11.svg";
import  './switch.css';
import './pool.css';


let categories = [];

const CreatePool = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [merit_required, setMeritRequired] = useState("");
  const [discussion_type, setDiscussionType] = useState("panel");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [spectators_allowed, setSpectatorsAllowed] = useState(0);
  const [prompts, setPrompts] = useState([]);
  const [stance, setStance] = useState("");
  const [guts, setGuts] = useState(50);
  const [source, setSource] = useState("");
  const [duration, setDuration] = useState("");
  const [text, settext] = useState('');
  
  const [is_active, setIsActive] = useState(0);
  const [nextForm, setnextForm] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [people_allowed, setPanelNumber] = useState(2);
  const [radio, setRadio] = useState("");
  const [timeMinutes, settimeMinutes] = useState('');

  
  const handleIncrement = () => {
    // Handle increment logic here
    settimeMinutes((prevTime) => (prevTime !== '' ? `${parseInt(prevTime) + 1}` : '1'));
  };

  const handleDecrement = () => {
    // Handle decrement logic here
    settimeMinutes((prevTime) => (prevTime !== '' && parseInt(prevTime) > 1 ? `${parseInt(prevTime) - 1}` : '1'));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (category !== "Other") return;
    setInputActive(true);
  }, [category]);

  const handleMore = () => {
    setnextForm(!nextForm);
  };
  

  const addPrompt = () => {
    // Check if the timeMinutes field is empty or contains only whitespace
    if (timeMinutes.trim() === '') {
      // Display an error message or take appropriate action
      alert('Please fill in both Prompt and Time fields');
      return;
    }
  
    // Create a new prompt
    const newPrompt = { text, timeMinutes };
  
    // Add the new prompt to the prompts array
    setPrompts([...prompts, newPrompt]);
  
    // Reset form fields
    settext('');
    settimeMinutes('');
  };

  const deletePrompt = (index) => {
    const updatedPrompts = [...prompts];
    updatedPrompts.splice(index, 1);
    setPrompts(updatedPrompts);
  };

  const handleChangeRadio = (e) => {
    // setRadio(e.target.value);

    setDiscussionType(discussion_type === "OneOnOne" ? "panel" : "OneOnOne");
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleClick = () => {
    if (inputText !== "") {
      setCategory(inputText);
      categories.push(inputText);
      setInputActive(false);
      setInputText("");
    }
  };

  const handleCreatePoolSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPool(
        title,
        category,
        merit_required,
        discussion_type,
        spectators_allowed,
        stance,
        guts,
        source,
        duration,
        is_active,
        people_allowed,
        prompts, 
      )
    );
    setCategory("");
  };

  const Pool = useSelector((state) => state.createPool);
  const { loading,success,error } = Pool;


  useEffect(() => {
    dispatch({ type: 'POOL_CREATE_RESET' });
  }, [dispatch]);

  return (
    <>
      <Card.Body className="pt-0" style={{ width: "100%" }}>
        <Card.Text>
          {loading && <Loader />}
          
          <Form className="mt-4" onSubmit={handleCreatePoolSubmit}>
            <Form.Group className={!nextForm ? "" : "d-none"}>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                size="lg"
                style={{
                  background: "#e2e2e2",
                  outline: "none",
                  border: "none",
                  
                }}
              />
              <Form.Select
                aria-label="Default select example"
                className="mb-3"
                value={category}
                placeholder="Choose Category"
                required
                size="lg"
                style={{
                  background: "#e2e2e2",
                  outline: "none",
                  border: "none",
                  
                }}
                onChange={handleChangeCategory}
              >
                <option >Choose Category</option>
                <option value="Tech">Tech</option>
                <option value="Politics">Politics</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                {categories?.map((name) => {
                  return (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  );
                })}
                <option>Other</option>
              </Form.Select>
              {inputActive && (
                <InputGroup className="mb-3">
                  <Form.Control
                    label="Other"
                    type="text"
                    placeholder="Enter your category"
                    variant="outline-secondary"
                    required
                    value={inputText}
                    size="lg"
                    style={{
                      background: "#e2e2e2",
                      outline: "none",
                      border: "none",
                    }}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleClick}
                  >
                    <i className="fa fa-add"></i>
                  </Button>
                </InputGroup>
              )}
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Merit Requirement"
                value={merit_required}
                size="lg"
                style={{
                  background: "#e2e2e2",
                  outline: "none",
                  border: "none",
                }}
                onChange={(e) => setMeritRequired(e.target.value)}
                required
                pattern="[0-9]{1,6}$"
              />

              <Form.Group
                controlId="discussion_type"
                // onChange={(e) => setDiscussionType(e.target.value)}
              >
                <Row>
                <Col>
                <InputGroup
  style={{
    display: "flex",
    background: "#e2e2e2",
    borderRadius: "7px",
    padding: ".55rem 0.55rem ",
  }}
  className="mb-3"
>
  <Form.Label
    className="mb-0"
    style={{ alignSelf: "center", paddingLeft:"0.5rem", fontSize:"1.2rem", marginRight: "10px" }} // Add marginRight here
  >
    {discussion_type === "panel" ? "Panel" : "1 on 1"}
  </Form.Label>
  <Form.Check
    type="switch"
    style={{ marginTop: "3px" }} 
    name="discussion_type"
    id="male"
    size="lg"
    checked={discussion_type === "panel"}
    onChange={handleChangeRadio}

  />
</InputGroup>
  </Col>
                  {/* <Col md={8}>
                    <Form.Check
                      type="radio"
                      className="mb-3"
                      name="discussion_type"
                      id="oneOnOne"
                      label={`1 on 1`}
                      value="oneOnOne"
                      size="lg"
                      onChange={handleChangeRadio}
                    />
                  </Col> */}
                  {(radio === "panel" || discussion_type === "panel") && (
                    <div style={{ marginBottom: "1rem" }}>
                      <Form.Control
                        type="number"
                        value={people_allowed}
                        style={{
                          background: "#e2e2e2",
                          outline: "none",
                          border: "none",
                        }}
                        min="2"
                        max="10"
                        size="lg"
                        pattern="([2-9]|10)"
                        onChange={(e) => setPanelNumber(e.target.value)}
                      />
                    </div>
                  )}
                </Row>
              </Form.Group>

              <InputGroup
                style={{
                  display: "flex",
                  background: "#e2e2e2",
                  borderRadius: "7px",
                  padding: ".55rem 0.55rem ",
                  
                }}
                className="mb-3"
              >
                <Form.Label
              className="mb-0"
                style={{ alignSelf: "center", paddingLeft:"0.5rem", fontSize:"1.2rem", marginRight: "10px" }}> Spectators
              </Form.Label>
                <Form.Check
                  type="switch"
                  style={{ marginTop: "3px" }}
                  
                  checked={spectators_allowed}
                  size="lg"
                  onChange={() =>
                    setSpectatorsAllowed(spectators_allowed === 0 ? 1 : 0)
                  }
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Invite</InputGroup.Text>
                <Form.Control
                  placeholder="Search"
                  aria-label="search"
                  aria-describedby="basic-addon1"
                  size="lg"
                  style={{
                    background: "#e2e2e2",
                    outline: "none",
                    border: "none",
                  }}
                />
              </InputGroup>
            </Form.Group>
           
            <Form.Group className={nextForm ? "" : "d-none"}>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Stance"
                value={stance}
                size="lg"
                style={{
                  background: "#e2e2e2",
                  outline: "none",
                  border: "none",
                }}
                onChange={(e) => setStance(e.target.value)}
              />
              <Form.Label className="mb-0">
                Guts <Badge bg="dark">{guts}</Badge>
              </Form.Label>
              <Form.Range
                className="mb-3"
                value={guts}
                onChange={(e) => setGuts(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Source"
                value={source}
                size="lg"
                style={{
                  background: "#e2e2e2",
                  outline: "none",
                  border: "none",
                }}
                onChange={(e) => setSource(e.target.value)}
                pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
              />
              <Form.Control
  as="select"
  className="mb-3"
  value={duration}
  onChange={(e) => setDuration(e.target.value)}
  size="lg"
  style={{
    background: "#e2e2e2",
    outline: "none",
    border: "none",
  }}
>
  <option value="">Select Duration</option>
  <option value="15">15 minutes</option>
  <option value="20">20 minutes</option>
  <option value="30">30 minutes</option>
</Form.Control>
              {/* <Form.Control
                className="mb-3"
                type="text"
                placeholder="Thumbnail"
                size="lg"
                style={{
                  background: "#e2e2e2",
                  outline: "none",
                  border: "none",
                }}
              /> */}
              <div className="d-flex">
  <Form.Control
    className="mb-3 me-3"
    type="text"
    placeholder="Prompt"
    value={text}
    size="lg"
    style={{
      flex: "0 0 62%", // This line
      background: "#e2e2e2",
      outline: "none",
      border: "none",
    }}
    onChange={(e) => settext(e.target.value)}
  />

  <Form.Control
    className="mb-3"
    type="text"
    placeholder="Time"
    value={timeMinutes}
    size="lg"
    style={{
      flex: "0 0 35%", // And this line
      background: "#e2e2e2",
      outline: "none",
      border: "none",
    }}
    onChange={(e) => settimeMinutes(e.target.value)}
  />
 <div className="d-flex flex-column align-items-center">
 <Button 
  variant="grey" 
  size="sm" 
  onClick={handleIncrement}
  style={{ border: "1px solid white", padding: "2.5px 5px", fontSize: "0.75rem",backgroundColor:"#e2e2e2" }} // Adjust padding and fontSize here
>
  <GrFormUp size={13} />
</Button>
<Button 
  variant="grey" 
  size="sm" 
  onClick={handleDecrement}
  style={{ border: "1px solid white", padding: "2.5px 5px", fontSize: "0.75rem",backgroundColor:"#e2e2e2" }} // Adjust padding and fontSize here
>
  <GrFormDown size={13} />
</Button>
</div>
</div>

      {/* Add Prompt button */}
      <Button onClick={addPrompt} className="mb-3" size="lg" style={{backgroundColor:"#6940aa"}}>
        Add Prompt 
      </Button>

      {/* List of prompts */}
      {prompts.map((prompt, index) => (
  <div key={index} className="mb-3 d-flex align-items-center">
  {/* Display other prompt details as needed */}
  <p className="me-3" style={{ fontSize: "1.2rem",fontWeight: "bold", marginBottom: "0" }}>
    Prompt: </p>
  <div className="tooltip-container">
    <p className="me-2" style={{ fontSize: "1rem", marginBottom: "0",marginRight:"7px",overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "14ch",  }}>
      {prompt.text}
    </p>
    <span className="tooltip-text">{prompt.text}</span>
  </div>
    
  
  <p className="me-3" style={{ fontSize: "1.2rem",fontWeight: "bold", marginBottom: "0" }}>
    Time: 
    </p>
    <p className="me-3" style={{ fontSize: "1.2rem", marginBottom: "0" }}>
    {prompt.timeMinutes}
  </p>

  {/* Button to delete the prompt */}
  <Button
    onClick={() => deletePrompt(index)}
    variant="white"
    size="sm"
    className="ms-3" // Add margin to the left of the button for spacing
  >
    
    <img src={del}
      width={24}
      alt="delete"  />
  </Button>
</div>

))}
            </Form.Group>
            <p>
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                onClick={handleMore}
              >
                {nextForm ? "Back" : "More"}{" "}
                <i
                  class={`fa-regular fa-circle-${nextForm ? "left" : "right"}`}
                ></i>
              </span>
            </p>

            <Container>
              <Col className="text-center">
              <Button variant="primary" type="submit" className="px-5 py-2" style={{ fontSize: '20px', fontWeight: 'bold' }}>
    Create
</Button>
              </Col>
            </Container>
          </Form>
          
        </Card.Text>
      </Card.Body>
    </>
  );
};

export default CreatePool;
