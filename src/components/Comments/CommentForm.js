import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { addComment, addReply } from "../../actions/commentActions";
import { getParentComments } from "../../actions/commentActions";
import Comments from "./Comments";
const CommentForm = ({
  post_id,
  autoFocus = false,
  reply_of_comment_id,
  initialValue = "",
  setIsReplying,
  setAreChildrenHidden,
}) => {
  const [message, setMessage] = useState(initialValue);
  const dispatch = useDispatch();

  

function handleSubmit(e) {
  e.preventDefault();
  if (reply_of_comment_id === 0)
    dispatch(addComment(post_id, message, reply_of_comment_id));
  
  else {
    dispatch(addReply(post_id, message, reply_of_comment_id));
  }
  setTimeout(() => {
    dispatch(getParentComments(post_id));
  }, 500); 
  setMessage(initialValue);
  
  setIsReplying(false);
  setAreChildrenHidden(false);
  
  // Fetch updated comments
  // Set newCommentAdded to true when a comment is added
}


  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <Button style={{backgroundColor:"#6940aa"}} type="submit">Comment</Button>
      </div>
    </form>
    
              </>
  );
};

export default CommentForm;
