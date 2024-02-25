import React,{ useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsSortDown } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { getAllPosts } from "../actions/postsAction";
import { getPools } from "../actions/poolActions"; // Import the action for polls

const SearchFilter = ({ townhall }) => {
  const dispatch = useDispatch();
  const [isAscending, setIsAscending] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSort = () => {
    
    console.log("isascending",isAscending);
    if (townhall) {
      switch (selectedFilter) {
        case 'name':
          dispatch(getAllPosts(true, false, !isAscending));
          break;
        case 'date':
          dispatch(getAllPosts(false, true, !isAscending));
          break;
        default:
          dispatch(getAllPosts(false, false, !isAscending));
          break;
      }
    } else {
      switch (selectedFilter) {
        case 'name':
          dispatch(getPools(true, false, false, false, false,false, !isAscending));
          break;
        case 'date':
          dispatch(getPools(false, true, false, false, false, false, !isAscending));
          break;
        case 'isLive':
          dispatch(getPools(false, false, true, false, false,false, !isAscending));
          break;
        case 'male':
          dispatch(getPools(false, false, false, true, false,false, !isAscending));
          break;
       
        case 'female':
          dispatch(getPools(false, false, false, false, true,false, !isAscending));
          break;
        case 'merit':
          dispatch(getPools(false, false, false, false, false,true, !isAscending));
          break;
        default:
          dispatch(getPools(false, false, false, false, false,false, true));
          break;
      }
    }
    setIsAscending(!isAscending);
  };

  const handleSelect = (e) => {
    setIsAscending(true);
    setSelectedFilter(e);
    if (e === "name") {
      dispatch(getAllPosts(true, false));
    } else if (e === "date") {
      dispatch(getAllPosts(false, true));
    }
  };

  const handleSelectPolls = (e) => {
    setIsAscending(true);
    setSelectedFilter(e);
    if (e === "name") {
      dispatch(getPools(true, false, false, false, false,false));
    } else if (e === "date") {
      dispatch(getPools(false, true, false, false, false,false));
    } else if (e === "islive") {
      dispatch(getPools(false, false, true, false, false,false));
    } else if (e === "male") {
      dispatch(getPools(false, false, false, true, false,false));
    } else if (e === "female") {
      dispatch(getPools(false, false, false, false, true,false));
    }else if(e === "merit"){
      dispatch(getPools(false, false, false, false, false,true));
    }
  };

  return (
    <div>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button style={{ margin: "0 1rem" }} variant="white" onClick={handleSort}>
          <BsSortDown
            style={{ fontWeight: "900", cursor: "pointer",paddingTop:"10px" }}
            size={50}
            
          />
        </Button>
        {(townhall && (
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              as={Button}
              style={{ margin: "0 1rem" }}
              variant="white"
            >
              <GoSettings
                style={{ fontWeight: "900", cursor: "pointer",paddingTop:"10px" }}
                size={50}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow" style={{ borderRadius: '5px' }}>
              <Dropdown.Item eventKey="name" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Name
              </Dropdown.Item>
              <Dropdown.Item eventKey="date" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Latest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )) || (
          <Dropdown onSelect={handleSelectPolls}>
            <Dropdown.Toggle
              as={Button}
              style={{ margin: "0 1rem" }}
              variant="white"
            >
              <GoSettings
                style={{ fontWeight: "900", cursor: "pointer",paddingTop:"10px" }}
                size={50}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow" style={{ borderRadius: '5px' }}>
              <Dropdown.Item eventKey="name" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Name
              </Dropdown.Item>
              <Dropdown.Item eventKey="date" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Latest
              </Dropdown.Item>
              
              <Dropdown.Item eventKey="male" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Male
              </Dropdown.Item>
              <Dropdown.Item eventKey="merit" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Merit
              </Dropdown.Item>
              <Dropdown.Item eventKey="female" className="px-3 fw-bold" style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
                Sort by Female
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
