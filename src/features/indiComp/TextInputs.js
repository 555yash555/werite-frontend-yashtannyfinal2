import React,{useState} from 'react';
import { useEffect } from 'react';

const TextInputs =({setTextInputs})=>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    
    useEffect(()=>{
        setTextInputs({title:title,description:description,source_link:(url+'?source=werite&medium=Sourelink')})
    },[title,description,url,setTextInputs])

    return (
        <div className='text-inputs'>
    <hr className="grey-line" />
    <div className='title-input'>
  <label htmlFor="title" className='title-text'>Title</label>
  <textarea
    type="text"
    id="title"
    name="title"
    className='title-value'
    placeholder='Enter title'
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{ width: '120%', height: '100px' }} // Adjust as needed
  />
</div>
    {/* <hr className="grey-line" /> */}
    {/* <div className='desc-input'>
      <label htmlFor="description" className='desc-text'>Description</label>
      <textarea
        id="description"
        name="description"
        className='desc-value'
        placeholder='Enter description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div> */}
    <hr className="grey-line" />
    <div className='url-input'>
      <label htmlFor="url" className='url-text'>URL</label>
      <input
        type="URL"
        id="url"
        name="url"
        className='url-value'
        placeholder='Enter URL'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  </div>
    );
}

export default TextInputs;