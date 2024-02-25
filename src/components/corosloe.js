// AttachmentCarousel.js
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import { Modal } from 'react-bootstrap';

const AttachmentCarousel = ({ attachments, post_id, live }) => {
  const [showModal, setShowModal] = useState(false);
 const [selectedAttachment, setSelectedAttachment] = useState(null);

 const handleItemClick = (attachment, type) => {
  // Only set the selected attachment and show the modal if the attachment type is not 'video'
  if (type !== 'video') {
    setSelectedAttachment({ data: attachment, type: type });
    setShowModal(true);
  }
};
const totalAttachments = attachments.video_attachments.length + attachments.image_attachments.length + attachments.audio_attachments.length;
  return (
    <>
     <Carousel showThumbs={false} showStatus={totalAttachments !== 1} width="100%">
      {live
        ? attachments.video_attachments.map((video_url, index) => (
          <div key={index} onClick={() => handleItemClick(video_url, 'video')}>
              <VideoPlayer
                video_rec_url={video_url.video_url}
                frameBorder="0"
                post_id={post_id}
                live={live}
              />
            </div>
          ))
        : [
            ...attachments.video_attachments.map((video_url, index) => (
              <div key={index} onClick={() => handleItemClick(video_url, 'video')}>
                <VideoPlayer
                  video_rec_url={video_url.video_url}
                  frameBorder="0"
                  post_id={post_id}
                  live={live}
                  
                  
                />
              </div>
            )),
            ...attachments.image_attachments.map((image, index) => (
              <div key={index} 
              style={{width: '100%', height: '100%', minWidth:'300px',
              minHeight: '300px',position: 'relative'}}
              onClick={() => handleItemClick(image, 'image')}>
                <img
                  src={image.image_url}
                  alt={` ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )),
            ...attachments.audio_attachments.map((audio_url, index) => (
              <div key={index} onClick={() => handleItemClick(audio_url, 'audio')}>
                <AudioPlayer audio_url={audio_url.audio_url} />
              </div>
            )),
          ]}
    </Carousel>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Attachment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedAttachment && selectedAttachment.type === 'video' && (
          <VideoPlayer
            video_rec_url={selectedAttachment.data.video_url}
            frameBorder="0"
            post_id={post_id}
            live={live}
          />
        )}
        {selectedAttachment && selectedAttachment.type === 'image' && (
          <img
            src={selectedAttachment.data.image_url}
            alt="Attachment"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        {selectedAttachment && selectedAttachment.type === 'audio' && (
          <AudioPlayer audio_url={selectedAttachment.data.audio_url} />
        )}
      </Modal.Body>
    </Modal>
  </>
  );
};

export default AttachmentCarousel;
