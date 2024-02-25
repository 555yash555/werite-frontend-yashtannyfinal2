import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiFillAudio, AiFillVideoCamera } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';
import { SiAudioboom } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Modal, Button } from 'react-bootstrap';

import './CreateStyle.css';
import AddCommunity from '../indiComp/AddCommunity';
import TextInputs from '../indiComp/TextInputs';
import { createPost } from '../../actions/postsAction';

const CreatePost = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles,setSelectedFiles] = useState([]);
const [previewUrl, setPreviewUrl] = useState(null);

const navigate =useNavigate();
const [files, setFiles] = useState([]);
const [showModal, setShowModal] = useState(false);

const [attachments,setattachments] =  useState([]);
const [isSubmitted, setIsSubmitted] = useState(false);


const Post = useSelector((state) => state.postCreate);
let { loading,error,success } = Post;


  
  const [postData, setPostData] = useState({title:'',description:'',source_link:'',communities:{input1:'',input2:'',input3:''},attachments:[]})
  const [communitiesNames, setCommunitiesNames] = useState({input1:'',input2:'',input3:''})
  const [textInputs, setTextInputs] = useState({title:'',description:'',source_link:''})
  useEffect(() => {
    setPostData({...postData, communities:communitiesNames, title:textInputs.title, description:textInputs.description, source_link:textInputs.source_link});
  }, [communitiesNames, textInputs]);

  useEffect(() => {
    if (!loading && success) {
      setTimeout(() => {
        success = false;
        error = false;
        navigate('/app/townhall');
      }, 1000);
    }
  }, [loading, success, navigate]);

  const submitHandler = async () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      await fileUploadHandler();
      console.log(postData);
      dispatch(createPost(postData));
      
    }
  };

  

 
  

  const fileSelectedHandler = (event) => {
    const files = event.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      urls.push(url);
    }
    setSelectedFiles(files);
    setSelectedFile(files[0]);
    setPreviewUrl(urls[0]);
    setFiles(urls);
  };

  const allFileSelectedHandler = (event) => {
    const files = [...selectedFiles,...event.target.files];
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      urls.push(url);
    }
    setSelectedFiles(files);
    setSelectedFile(files[0]);
    setPreviewUrl(urls[0]);
    setFiles(urls);
  };
  const fileUploadHandler = async () => {
  
const attachments1=[];

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    console.log(file);
    attachments1.push(file);
    console.log(attachments);
}

// setattachments(attachments1);
postData.attachments=attachments1;
    // if (file.type.startsWith('audio/')) {
    //   attachments.push(file);
    // } else if (file.type.startsWith('image/')) {
    //   attachments.push(file);
    // } else if (file.type.startsWith('video/')) {
    //  attachments.push(file);
    // }


//   const response = await fetch('/api/post/', {
//     method: 'POST',
//     body: formData
//   });

//   if (response.ok) {
//     console.log('Files uploaded successfully');
//   } else {
//     console.log('File upload failed');
//   }
};

  useEffect(()=>{console.log(selectedFiles)},[selectedFiles])

  const filePreviewHandler = (index) => {
    setSelectedFile(selectedFiles[index]);
    setPreviewUrl(files[index]);
  };

  const fileRemoveHandler = (index) => {
    const updatedFiles = [...files];
    const url = updatedFiles.splice(index, 1);
    const updatedDataFiles = [...selectedFiles];
    const dataFiles = updatedDataFiles.splice(index,1);
    setSelectedFiles(updatedDataFiles);
    setFiles(updatedFiles);
    URL.revokeObjectURL(url);

    if (updatedFiles.length > 0 && updatedDataFiles.length > 0 && url===previewUrl) {
      setSelectedFile(updatedDataFiles[0]);
      setPreviewUrl(updatedFiles[0]);
    }
  };

  // ... (other state declarations)

  // Use useEffect to reset state when the component mounts
  useEffect(() => {
    dispatch({ type: 'POST_CREATE_RESET' });
  }, [dispatch]);

  return (
    <div className='create-post'>
      {loading ? (
      <Loader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}/>
    ) : (
      <>
    
      <h1 className='create-header'>Create a post</h1>
      <div className='create-container'>
        <div>
        <>
         <hr className="grey-line" />
    <div className='file-select'>
         <label htmlFor="img-input">
         <HiOutlinePhotograph className='image-upload' color='white'/>
      </label>
        <input
          type="file"
          id="img-input"
          name="file"
          accept="image/*"
          onChange={fileSelectedHandler}
          hidden={true}
          multiple
        />
         <label htmlFor="aud-input">
         <AiFillAudio className='audio-upload' color='white' />
      </label>
      <input
          type="file"
          id="aud-input"
          name="file"
          accept="audio/*"
          onChange={fileSelectedHandler}
          hidden={true}
          multiple
        />
         <label htmlFor="vid-input">
         <AiFillVideoCamera className='video-upload' color='white'/>
      </label>
      <input
          type="file"
          id="vid-input"
          name="file"
          accept="video/*"
          onChange={fileSelectedHandler}
          hidden={true}
          multiple
        />
        
    </div>

    {previewUrl ? (
         <div key={previewUrl}>
          {selectedFile.type.startsWith('image/') ? (
            <img key={`img-${previewUrl}`} src={previewUrl} alt="Preview" className='selected-file' />
          ) : selectedFile.type.startsWith('audio/') ? (
            <audio key={`aud-${previewUrl}`} src={previewUrl} controls className='selected-file' />
          ) : selectedFile.type.startsWith('video/') ? (
            <video key={`vid-${previewUrl}`} src={previewUrl} controls className='selected-file'/>
          ) : (
            <p>File type not supported</p>
          )}
        </div>
      ) : (<div className='preview-cont'><label for='all-main-input'><div key='preview-empty' id='preview-empty' name='preview-empty' className='preview-empty' /> <IoIosAddCircleOutline className='add-icon' color='white' size={'8em'}/></label><input type="file"
      id="all-main-input"
      name="file"
      accept="audio/*,image/*,video/*"
      onChange={allFileSelectedHandler}
      hidden={true}
      multiple
    /></div>)}
<div className='selected-list'>
  {files.length > 0 && (
    <div className='add-cont'>
      <label htmlFor='all-input'>
        <div key='add-empty' id='add-empty' name='add-empty' className='add-empty' />
        <IoIosAddCircleOutline className='add-small-icon' color='white' size={'4em'}/>
      </label>
      <input
        type="file"
        id="all-input"
        name="file"
        accept="audio/*,image/*,video/*"
        onChange={allFileSelectedHandler}
        hidden={true}
        multiple
      />
    </div>
  )}

<div key={`div-uploaded}`} className='uploaded-files'  style={{cursor:'pointer'}}>
{files.length>0 && files.map((fileUrl, groupIndex) => (
  <React.Fragment key={groupIndex}>
    <div key={`div-${groupIndex}`} onClick={() => filePreviewHandler(groupIndex)} className='uploaded-files-items'  style={{cursor:'pointer'}}>
      {selectedFiles[groupIndex]?.type?.split('/')[0] === 'image' && (
        <img key={`img-${groupIndex}`} src={fileUrl} alt="Loading or corrupted try again"  className='uploaded-files-img'/>
      )}
      {selectedFiles[groupIndex]?.type?.split('/')[0] === 'audio' && (
        <SiAudioboom size={'5em'} className='uploaded-files-aud'/>
      )}
      {selectedFiles[groupIndex]?.type?.split('/')[0] === 'video' && (
        <video key={`vid-${groupIndex}`} src={fileUrl} className='uploaded-files-vid'/>
      )}
      <button key={`butn-${groupIndex}`} className='remove-button' onClick={() => fileRemoveHandler(groupIndex)}><VscChromeClose size={'2em'} /></button>
    </div>
  </React.Fragment>
))}</div>
</div> 
    </>
        </div>
        <div>
        <TextInputs className='fixed-position' setTextInputs={setTextInputs} />
      
      
      <button id='post-button' type='button' variant="primary" className='post-button' onClick={submitHandler}>Post</button>
      
    {success && <Message variant='success'>Your post has been created successfully.</Message>}
    {error && <Message variant='danger'>{error}</Message>}
        </div>
      </div>
      {/* <div className='create-line' /> */}
      {/* <TextInputs className='fixed-position' setTextInputs={setTextInputs} />
      <div className='create-line' />
      <button id='post-button' 
      type='button' className='post-button' onClick={submitHandler}>Post</button> */}
      </>)}
    </div>
  );
}

export default CreatePost;