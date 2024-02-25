// components/UserList.js

import React from 'react';
import Card from 'react-bootstrap/Card';

const UserList = ({ users }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        {users.map((user) => (
          <Card key={user.user_id} style={{ minWidth: '50%', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Card.Img
                variant="top"
                style={{
                  marginRight: 15,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                src={user.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
                alt="user"
              />
              
                <Card.Title style={{ fontSize: '1.8em', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>{user.username}</Card.Title>
                <Card.Text style={{ fontSize: '1.2em', color: '#666', marginBottom: '8px' }}>
                  Email: {user.email}
                </Card.Text>
                <Card.Text style={{ fontSize: '1.2em', color: '#666' }}>
                  Merit: {user.merit}
                </Card.Text>
             
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;
