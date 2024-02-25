// components/ReportList.js

import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { deletePostById } from '../../actions/postsAction';
import { useDispatch } from 'react-redux';

const ReportList = ({ reports }) => {
  const dispatch = useDispatch();
  const handleDeletePost = (postId) => {
    // Dispatch the deletePostById action with the postId
    dispatch(deletePostById(postId));
  };
  return (
   
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        {reports.map((report) => (
          

          <Card key={report.report_id} style={{ minWidth: '50%', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <Link
        to={`/app/user/${report.post.user.user_id}/posts`}
        style={{ font: "inherit", textDecoration: "inherit" }} >
          
              <Card.Img
                variant="top"
                style={{
                  marginRight: 15,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                src={report.post.user.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
                alt="user"
              />
              </Link>
              <div>
                <Card.Title style={{ fontSize: '1.8em', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>{report.post.user.username}</Card.Title>
                <Card.Text style={{ fontSize: '1.2em', color: '#666', marginBottom: '8px' }}>
                  Email: {report.post.user.email}
                </Card.Text>

              </div>
              <div>
               
              
  
              <Link
          to={`/app/singlepost/${report.post_id}`}
          style={{ font: "inherit", textDecoration: "inherit" }} >
                
              <Card.Text style={{ fontSize: '1.2em', color: '#666', marginBottom: '8px' }}>
                Report ID: {report.report_id}
              </Card.Text>
              </Link>
              <Card.Text style={{ fontSize: '1.2em', color: '#666', marginBottom: '8px' }}>
                Report Text: {report.report_text}
              </Card.Text>
              </div>
              <div>
              <Card.Text style={{ fontSize: '1.2em', color: '#666', marginBottom: '8px' }}>
                time: {moment(report.created_at).fromNow()}
              </Card.Text>
              <button onClick={() => handleDeletePost(report.post.post_id)}>Delete</button>
              </div>
            </Card.Body>
          </Card>
          
        ))}
      </div>
      
    </div>
  );
};

export default ReportList;



