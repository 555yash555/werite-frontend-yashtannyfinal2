import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Badge,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from "react-bootstrap";
import { editPool } from "../../actions/editPoolActions";
import Loader from "../../components/Loader";
import { getMyPools } from "../../actions/poolActions";
import { getPoolById } from "../../actions/getPoolById";
import Form from "react-bootstrap/Form";
import { useParams } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { GrFormUp, GrFormDown } from 'react-icons/gr';
import "./pool.css";
import del from "../../assets/delete11.svg";


let categories = [];
const EditPool = ({ onClose }) => {
  const { poolId } = useParams();
  console.log("Pool ID:", poolId);

  const dispatch = useDispatch();
  const { pools, loading } = useSelector((state) => state.getMyPools);
  console.log("Redux State:", pools);

  const pool = pools ? pools.find((pool) => String(pool.pool_id) === String(poolId)) : null;

  console.log("Pool ID:", poolId);
  console.log("Pools:vhsbsd", pools);
  console.log("Pool:", pool);

  const [nextForm,setnextForm]=useState(false);
  const handleMore = () => {
    setnextForm(!nextForm);
  };
  const [inputActive, setInputActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [category, setCategory] = useState("");

  const [text, settext] = useState('');
  
  const [timeMinutes, settimeMinutes] = useState('');
  const [prompts, setPrompts] = useState(pool ? pool.prompts : []);


  const handleIncrement = () => {
    settimeMinutes((prevTime) => (prevTime !== '' ? `${parseInt(prevTime) + 1}` : '1'));
  };

  const handleDecrement = () => {
    settimeMinutes((prevTime) => (prevTime !== '' && parseInt(prevTime) > 1 ? `${parseInt(prevTime) - 1}` : '1'));
  };
  const handleClick = () => {
    if (inputText !== "") {
      setCategory(inputText);
      categories.push(inputText);
      setInputActive(false);
      setInputText("");
    }
  };
const addPrompt = () => {

  if (timeMinutes.trim() === '') {
    // Display an error message or take appropriate action
    alert('Please fill in both Prompt and Time fields');
    return;
  }
  const newPrompt = { text, timeMinutes };
  setPrompts([...prompts, newPrompt]);
  settext('');
  settimeMinutes('');
  handlepromptChange();
};

  const deletePrompt = (index) => {
    const updatedPrompts = [...prompts];
    updatedPrompts.splice(index, 1);
    setPrompts(updatedPrompts);
    handlepromptChange();
  };
  

  const [formData, setFormData] = useState({
    title: pool ? pool.title : "",
    category: pool ? pool.category : "",
    merit_required: pool ? pool.merit_required : "",
    discussion_type: pool ? pool.discussion_type : "",
    spectators_allowed: pool ? pool.spectators_allowed : "",
    stance: pool ? pool.stance : "",
    guts: pool ? pool.guts : "",
    source: pool ? pool.source : "",
    duration: pool ? pool.duration : "",
    thumbnail: pool ? pool.thumbnail : "",
    people_allowed: pool ? pool.people_allowed : "",
    prompts: pool ? pool.prompts : [],
  });

  console.log(formData);

  useEffect(() => {
    dispatch(getMyPools());
  }, [dispatch]);

  useEffect(() => {
    if (poolId && pools && pools.length > 0) {
      const foundPool = pools.find((pool) => pool.pool_id === poolId);

      if (foundPool) {
        setFormData((prevData) => ({
          ...prevData,
          title: foundPool.title,
          category: foundPool.category,
          merit_required: foundPool.merit_required,
          discussion_type: foundPool.discussion_type,
          spectators_allowed: foundPool.spectators_allowed,
          stance: foundPool.stance,
          guts: foundPool.guts,
          source: foundPool.source,
          duration: foundPool.duration,
          thumbnail: foundPool.thumbnail,
          people_allowed: foundPool.people_allowed,
          prompts: foundPool.prompts,
        }));
      }
    }
  }, [poolId, pools]);

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    console.log(name,value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlepromptChange = (e) => {
    console.log("new prompts,",prompts);
    
    setFormData((prevData) => ({
      ...prevData,
      [prompts]: prompts,
    }));
  };
  
  const navigate =useNavigate();
  const handleUpdatePool = (e) => {
    console.log("update pool")
    e.preventDefault();
    console.log("edit pool form data here");
    console.log(formData);
    dispatch(editPool(poolId, formData));
    setTimeout(() => {
      
      navigate('/app/pool');
    }, 2000);
    
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' } }>
    
    <Card.Body className="pt-0">
      <Card.Text>
        {loading && <Loader />}
        <Col md={12}>
        <Form className="mt-4" onSubmit={handleUpdatePool}>
          <Form.Group className={!nextForm ? "" : "d-none"}>
            <Form.Control
              className="mb-3 custom-border"
              type="text"
              name="title"
              placeholder="Title"
               value={formData.title}
               onChange={handleInputChange}
              defaultValue={formData.title}
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
              className="mb-3 custom-border"
              value={formData.category}
              required
              size="lg"
              style={{
                background: "#e2e2e2",
                outline: "none",
                border: "none",
                color: "black",
              }}
              onChange={handleInputChange}
              name="category"
            >
              <option>Choose Category</option>
              <option value="Anime">Anime</option>
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
                <InputGroup className="mb-3 ">
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
              className="mb-3 custom-border"
              type="text"
              name="merit_required"
              value={formData.merit_required}
                onChange={handleInputChange}
                placeholder="merit_required"
              defaultValue={formData.merit_required}
              size="lg"
              style={{
                background: "#e2e2e2",
                outline: "none",
                border: "none",
              }}
              
              required
              pattern="[0-9]{1,6}$"
            />

<Form.Group controlId="discussion_type">
  <Row>
    <Col>
      <InputGroup
        style={{
          background: "#e2e2e2",
          borderRadius: "7px",
          padding: ".65rem .65rem 0",
          display: 'flex', // Add this
          
        }}
        className="mb-3 custom-border"
      >
        <Form.Label style={{marginRight:"10px"}}>
          {formData.discussion_type === "panel" ? "Panel" : "One On One"}
        </Form.Label>
        <Form.Check
          type="switch"
          className=" mb-3"
          name="discussion_type"
          id="male"
          size="lg"
          value={
            formData.discussion_type === "panel"
              ? "Panel"
              : "One On One"
          }
          checked={formData.discussion_type === "panel"}
          onChange={handleInputChange}
        />
      </InputGroup>
    </Col>
    {(formData.discussion_type === "panel") && (
      <div style={{ marginBottom: "0.5rem" }}>
        <Form.Control
          type="number"
          value={formData.people_allowed}
          style={{
            background: "#e2e2e2",
            outline: "none",
            border: "none",
          }}
          min="2"
          max="10"
          size="lg"
          pattern="([2-9]|10)"
          onChange={handleInputChange}
          name="people_allowed"
        />
      </div>
    )}
  </Row>
</Form.Group>

<InputGroup
  style={{
    background: "#e2e2e2",
    borderRadius: "7px",
    padding: ".55rem .55rem 0",
    display: 'flex', // Add this
    alignItems: 'center' // Add this
  }}
  className="mb-3 custom-border"
>
  <Form.Label style={{ marginRight: '10px' }}> {/* Add some margin to the right of the label */}
    Spectators
  </Form.Label>
  <Form.Check
    type="switch"
    className="mb-3"
    checked={formData.spectators_allowed}
    size="lg"
    onChange={() =>
      setFormData((prevData) => ({
        ...prevData,
        spectators_allowed:
          prevData.spectators_allowed === 0 ? 1 : 0,
      }))
    }
    name="spectators_allowed"
  />
</InputGroup>

            <InputGroup className="mb-3 custom-border"
              style={{
               
                borderRadius: "7px",
               
              }}>
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
    className="mb-3 custom-border" 
    type="text"
    placeholder="Stance"
    value={formData.stance}
    size="lg"
    style={{
      background: "#e2e2e2",
      outline: "none",
      border: "none",
    }}
    onChange={handleInputChange}
    name="stance"
  />
  <Form.Label className="mb-0 ">
    Guts <Badge bg="dark">{formData.guts}</Badge>
  </Form.Label>
  <Form.Range
    className="mb-3"
    value={formData.guts}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        guts: e.target.value,
      }))
    }
    name="guts"
  />
  <Form.Control
    className="mb-3 custom-border"
    type="text"
    placeholder="Source"
    value={formData.source}
    size="lg"
    style={{
      background: "#e2e2e2",
      outline: "none",
      border: "none",
    }}
    onChange={handleInputChange}
    name="source"
    pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
  />
  
  <Form.Control
  as="select"
  className="mb-3 custom-border"
  type="text"
  placeholder="Duration"
  value={formData.duration}
  name="duration"
  onChange={handleInputChange}
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
 
   <div className="d-flex ">
                    <Form.Control
                      className="mb-3 me-3 custom-border"
                      type="text"
                      placeholder="Prompt"
                      value={text}
                      size="lg"
                      style={{
                        background: "#e2e2e2",
                        flex: "0 0 62%",
                        outline: "none",
                        border: "none",
                      }}
                      onChange={(e)=> {settext(e.target.value);handleInputChange(e);} }
                    />

                    <Form.Control
                      className="mb-3 custom-border"
                      type="text"
                      placeholder="Time"
                      value={timeMinutes}
                      size="lg"
                      style={{
                        background: "#e2e2e2",
                        outline: "none",
                        border: "none",
                        flex: "0 0 35%",
                      }}
                      onChange={(e) => {settimeMinutes(e.target.value);}}
                    />
<div className="d-flex flex-column align-items-center">
 <Button 
  variant="grey" 
  size="sm" 
  onClick={handleIncrement}
  style={{ border: "1px solid", padding: "2.5px 5px", fontSize: "0.75rem",backgroundColor:"#e2e2e2" }} // Adjust padding and fontSize here
>
  <GrFormUp size={13} />
</Button>
<Button 
  variant="grey" 
  size="sm" 
  onClick={handleDecrement}
  style={{ border: "1px solid ", padding: "2.5px 5px", fontSize: "0.75rem",backgroundColor:"#e2e2e2" }} // Adjust padding and fontSize here
>
  <GrFormDown size={13} />
</Button>
</div>
</div>


                  {/* Add Prompt button */}
                  <Button style={{backgroundColor:"#6940aa"}}   onClick={addPrompt} className="mb-3" size="lg ">
                    Add Prompt
                  </Button>

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
                      className={`fa-regular fa-circle-${nextForm ? "left" : "right"}`}
                    ></i>
                  </span>
                </p>

                <Container>
                  <Col className="text-center">
                    <Button variant="dark" type="submit" className="px-4 py-1">
                      Update Pool
                    </Button>
                  </Col>
                </Container>
              </Form>
            </Col>
          </Card.Text>
        </Card.Body>
      </div>
  </>
  
  );
};

export default EditPool;