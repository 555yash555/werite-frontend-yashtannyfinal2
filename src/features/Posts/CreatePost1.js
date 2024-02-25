import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UploadFile from '../indiComp/UploadFile';

import './CreateStyle.css';
import AddCommunity from '../indiComp/AddCommunity';
import TextInputs from '../indiComp/TextInputs';
import { createPost } from '../../actions/postsAction';

const CreatePost = () => {
  const dispatch = useDispatch();
  
  const [postData, setPostData] = useState({title:'',description:'',url:'',photo:'',video:'',audio:'',communities:{input1:'',input2:'',input3:''}})
  const [communitiesNames, setCommunitiesNames] = useState({input1:'',input2:'',input3:''})
  const [textInputs, setTextInputs] = useState({title:'',description:'',url:''})
  useEffect(() => {
    setPostData({...postData, communities:communitiesNames, title:textInputs.title, description:textInputs.description, url:textInputs.url});
  }, [communitiesNames, textInputs]);

  const submitHandler = () => {
    console.log(postData);
    dispatch(createPost(postData));
  };

  return (
    <div className='create-post'>
      <h1 className='create-header'>Create a post</h1>
      <div className='create-container'>
        <div>
          <UploadFile />
        </div>
        <div>
          <AddCommunity setCommunities={setCommunitiesNames} />
        </div>
      </div>
      <div className='create-line' />
      <TextInputs className='fixed-position' setTextInputs={setTextInputs} />
      <div className='create-line' />
      <button id='post-button' type='button' className='post-button' onClick={submitHandler}>Post</button>
    </div>
  );
}

export default CreatePost;