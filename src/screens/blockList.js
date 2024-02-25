// components/ReportList.js

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import {unblockUser,getBlockedUsers} from '../actions/blockActions';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

const BlockedList = ({ blocks }) => {
    const dispatch = useDispatch();
    

    const handleUnblock = (userId) => {
      // Dispatch the action to unblock the user with the specified userId
      dispatch(unblockUser(userId))
        .then(() => {
          // Dispatch getBlockedUsers() after unblockUser() has completed
          dispatch(getBlockedUsers());
        })
        .catch((error) => {
          console.error('Error unblocking user:', error);
        });
    };
    


  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <div style={{ width: '100%' }}>
        {blocks.map((block) => (
          <Card key={block.report_id} style={{ minWidth: '50%', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                src={block.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
                alt="user"
              />
               
              <div>
                <Card.Title style={{ fontSize: '1.8em', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>{block.username}</Card.Title>
                <Card.Text style={{ fontSize: '1.2em', color: '#666', marginBottom: '8px' }}>
                  Email: {block.email}
                </Card.Text>
              </div>
              <Button variant="danger" onClick={() => handleUnblock(block.user_id)}>
                Unblock
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlockedList;
