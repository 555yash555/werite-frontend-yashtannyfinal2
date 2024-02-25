import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { BsFillReplyFill } from "react-icons/bs";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";
import "../ProfileCard.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCommentUpvote,addCommentDownvote } from "../../actions/commentActions";

const Comment = (props) => {
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  
  const onCommentReply = () => {
    setIsReplying((prev) => !prev);
  };
  const onUpvoteClick = () => {
    // Dispatch the upvote action here
    dispatch(addCommentUpvote(commentInfo.comment_id));
  };

  const onDownvoteClick = () => {
    // Dispatch the downvote action here
    dispatch(addCommentDownvote(commentInfo.comment_id));
  };
  const childComments = props.children;
  const commentInfo = props.comment;


  return (
    <>
      <div className="comment" key={commentInfo?.comment_id}>
        <div className="header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to={`/app/user/${commentInfo?.user_id}/posts`}
              style={{ font: "inherit", textDecoration: "inherit" }}
            >
              <div
                className="image_container"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                }}
              >
                <img
                  className="user_round"
                  src={
                    commentInfo?.profile_pic ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt="user"
                />
              </div>
              <span className="name">{commentInfo?.user.username}</span>
            </Link>
          </div>
          <div
            style={{
              color: "black",
              fontSize: ".8rem",
              fontWeight: "500",
            }}
          >
            {moment(commentInfo?.created_at).fromNow()}
          </div>
        </div>
        <div className="comment-content">
  <div className="message-and-vote-buttons">
    <div className="message">{commentInfo?.comment}</div>
    {/* <div className="vote-buttons">
      <button
        onClick={onUpvoteClick}
        className="btn icon-btn"
        aria-label="Upvote"
      >
        <TbArrowBigUpLines color="black" size={20} />
      </button>
      <span className="vote-count">{commentInfo?.upvotes}</span>
      <button
        onClick={onDownvoteClick}
        className="btn icon-btn"
        aria-label="Downvote"
      >
        <TbArrowBigDownLines color="black" size={20} />
      </button>
      <span className="vote-count">{commentInfo?.downvotes}</span>
         
    </div> */}
  </div>

  <div className="footer">
    <BsFillReplyFill
      onClick={() => onCommentReply()}
      className={`btn icon-btn ${
        isReplying === true ? "icon-btn-active" : ""
      } ${"danger" || ""}`}
      style={{ marginLeft: "1.5rem" }}
      size={30}
      aria-label={isReplying ? "Cancel Reply" : "Reply"}
    />
  </div>
</div>
        </div>
      

      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            post_id={commentInfo?.post_id}
            reply_of_comment_id={commentInfo?.comment_id}
            setIsReplying={setIsReplying}
            setAreChildrenHidden={setAreChildrenHidden}
          />
        </div>
      )}
      <button
        className={`${
          childComments?.length > 0 && areChildrenHidden ? "btn " : "hide"
        } ${!areChildrenHidden ? "hide" : ""} `}
        onClick={() => setAreChildrenHidden(false)}
        style={{
          marginLeft: "1rem",
          fontSize: ".95rem",
          fontWeight: "bold",
        }}
      >
        <span className="opacity">
          {childComments?.length > 0 && areChildrenHidden
            ? "Continue this thread ->"
            : ""}
        </span>
      </button>

      {!areChildrenHidden && childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden((prev) => !prev)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comment;