// // SearchBox.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { searchUser } from '../actions/userActions';
// import { InputGroup, FormControl, Button, Card, Col } from 'react-bootstrap';

// const SearchBox = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState('');
//   const { user, error } = useSelector((state) => state.userSearchReducer);

//   const handleSearch = () => {
//     if (searchTerm.trim() !== '') {
//       dispatch(searchUser(searchTerm));
//     }
//   };

//   return (
    
//       <InputGroup >
//         <FormControl
//           placeholder="Search"
//           aria-label="Search"
//           size="lg"
//           variant="outline-secondary"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Button variant="outline-secondary" onClick={handleSearch}>
//           <i className="fa fa-search"></i>
//         </Button>
//       </InputGroup>

//       {user.user_id ? (
//         <Card style={{ width: '18rem', position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
//           <Card.Body>
//             {user.profile_pic && <Card.Img variant="top" src={user.profile_pic} />}
//             <Card.Title>{user.username}</Card.Title>
//             <Card.Text>
//               <Button variant="outline-secondary">
//                 <i className="fa fa-envelope"></i> Message
//               </Button>
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       ) : (
//         error && <p>{error}</p>
//       )}
    
//   );
// };

// export default SearchBox;
