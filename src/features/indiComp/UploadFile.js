import React,{useState,useEffect} from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiFillAudio, AiFillVideoCamera } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';
import { SiAudioboom } from 'react-icons/si';


const UploadFile =()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles,setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [files, setFiles] = useState([]);

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
  const formData = new FormData();
  const audio_attachments = [];
  const image_attachments = [];
  const video_attachments = [];

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    if (file.type.startsWith('audio/')) {
      audio_attachments.push(file);
    } else if (file.type.startsWith('image/')) {
      image_attachments.push(file);
    } else if (file.type.startsWith('video/')) {
      video_attachments.push(file);
    }
  }

  formData.append('audio_attachments', audio_attachments);
  formData.append('image_attachments', image_attachments);
  formData.append('video_attachments', video_attachments);

  const response = await fetch('/api/post/', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    console.log('Files uploaded successfully');
  } else {
    console.log('File upload failed');
  }
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
    
    return(<>
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
    </>)
}

export default UploadFile;
// import React, { useState, useEffect } from 'react';
// import { HiOutlinePhotograph } from 'react-icons/hi';
// import { AiFillAudio, AiFillVideoCamera } from 'react-icons/ai';
// import { IoIosAddCircleOutline } from 'react-icons/io';
// import { VscChromeClose } from 'react-icons/vsc';
// import { SiAudioboom } from 'react-icons/si';

// const UploadFile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [files, setFiles] = useState([]);

//   const imageSelectedHandler = (event) => {
//     const files = event.target.files;
//     const urls = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const url = URL.createObjectURL(file);
//       urls.push(url);
//     }
//     setSelectedFiles(files);
//     setSelectedFile(files[0]);
//     setPreviewUrl(urls[0]);
//     setFiles(urls);
//   };

//   const audioSelectedHandler = (event) => {
//     const files = event.target.files;
//     const urls = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const url = URL.createObjectURL(file);
//       urls.push(url);
//     }
//     setSelectedFiles(files);
//     setSelectedFile(files[0]);
//     setPreviewUrl(urls[0]);
//     setFiles(urls);
//   };

//   const videoSelectedHandler = (event) => {
//     const files = event.target.files;
//     const urls = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const url = URL.createObjectURL(file);
//       urls.push(url);
//     }
//     setSelectedFiles(files);
//     setSelectedFile(files[0]);
//     setPreviewUrl(urls[0]);
//     setFiles(urls);
//   };

//   const allFileSelectedHandler = (event) => {
//     const files = [...selectedFiles, ...event.target.files];
//     const urls = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const url = URL.createObjectURL(file);
//       urls.push(url);
//     }
//     setSelectedFiles(files);
//     setSelectedFile(files[0]);
//     setPreviewUrl(urls[0]);
//     setFiles(urls);
//   };

//   useEffect(() => {
//     console.log(selectedFiles);
//   }, [selectedFiles]);

//   const filePreviewHandler = (index) => {
//     setSelectedFile(selectedFiles[index]);
//     setPreviewUrl(files[index]);
//   };

//   const fileRemoveHandler = (index) => {
//     const updatedFiles = [...files];
//     const url = updatedFiles.splice(index, 1);
//     const updatedDataFiles = [...selectedFiles];
//     const dataFiles = updatedDataFiles.splice(index, 1);
//     setSelectedFiles(updatedDataFiles);
//     setFiles(updatedFiles);
//     URL.revokeObjectURL(url);

//     if (updatedFiles.length > 0 && updatedDataFiles.length > 0 && url === previewUrl) {
//       setSelectedFile(updatedDataFiles[0]);
//       setPreviewUrl(updatedFiles[0]);
//     }
//   };

//   return (
//     <>
//       <div className='file-select'>
//         <label htmlFor="img-input">
//           <HiOutlinePhotograph className='image-upload' color='white' />
//         </label>
//         <input
//           type="file"
//           id="img-input"
//           name="file"
//           accept="image/*"
//           onChange={imageSelectedHandler}
//           hidden={true}
//           multiple
//         />
//         <label htmlFor="aud-input">
//           <AiFillAudio className='audio-upload' color='white' />
//         </label>
//         <input
//           type="file"
//           id="aud-input"
//           name="file"
//           accept="audio/*"
//           onChange={audioSelectedHandler}
//           hidden={true}
//           multiple
//         />
//         <label htmlFor="vid-input">
//           <AiFillVideoCamera className='video-upload' color='white' />
//         </label>
//         <input
//           type="file"
//           id="vid-input"
//           name="file"
//           accept="video/*"
//           onChange={videoSelectedHandler}
//           hidden={true}
//           multiple
//         />
//       </div>

//       {previewUrl ? (
//         <div key={previewUrl}>
//           {selectedFile.type.startsWith('image/') ? (
//             <img key={`img-${previewUrl}`} src={previewUrl} alt="Preview" className='selected-file' />
//           ) : selectedFile.type.startsWith('audio/') ? (
//             <audio key={`aud-${previewUrl}`} src={previewUrl} controls className='selected-file' />
//           ) : selectedFile.type.startsWith('video/') ? (
//             <video key={`vid-${previewUrl}`} src={previewUrl} controls className='selected-file' />
//           ) : (
//             <p>File type not supported</p>
//           )}
//         </div>
//       ) : (
//         <div className='preview-cont'>
//           <label for='all-main-input'>
//             <div key='preview-empty' id='preview-empty' name='preview-empty' className='preview-empty' />{' '}
//             <IoIosAddCircleOutline className='add-icon' color='white' size={'8em'} />
//           </label>
//           <input
//             type="file"
//             id="all-main-input"
//             name="file"
//             accept="audio/*,image/*,video/*"
//             onChange={allFileSelectedHandler}
//             hidden={true}
//             multiple
//           />
//         </div>
//       )}
//       <div className='selected-list'>
//         {files.length && (
//           <div className='add-cont'>
//             <label for='all-input'>
//               <div key='add-empty' id='add-empty' name='add-empty' className='add-empty' />{' '}
//               <IoIosAddCircleOutline className='add-small-icon' color='white' size={'4em'} />
//             </label>
//             <input
//               type="file"
//               id="all-input"
//               name="file"
//               accept="audio/*,image/*,video/*"
//               onChange={allFileSelectedHandler}
//               hidden={true}
//               multiple
//             />
//           </div>
//         )}
//         <div key={`div-uploaded}`} className='uploaded-files' style={{ cursor: 'pointer' }}>
//           {files.length > 0 &&
//             files.map((fileUrl, groupIndex) => (
//               <>
//                 <div
//                   key={`div-${groupIndex}}`}
//                   onClick={() => filePreviewHandler(groupIndex)}
//                   className='uploaded-files-items'
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {selectedFiles[groupIndex]?.type?.split('/')[0] === 'image' && (
//                     <img key={`img-${groupIndex}`} src={fileUrl} alt="Loading or corrupted try again" className='uploaded-files-img' />
//                   )}
//                   {selectedFiles[groupIndex]?.type?.split('/')[0] === 'audio' && (
//                     <SiAudioboom size={'5em'} className='uploaded-files-aud' />
//                   )}
//                   {selectedFiles[groupIndex]?.type?.split('/')[0] === 'video' && (
//                     <video key={`vid-${groupIndex}`} src={fileUrl} className='uploaded-files-vid' />
//                   )}
//                   <button key={`butn-${groupIndex}`} className='remove-button' onClick={() => fileRemoveHandler(groupIndex)}>
//                     <VscChromeClose size={'2em'} />
//                   </button>
//                 </div>
//               </>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadFile;
