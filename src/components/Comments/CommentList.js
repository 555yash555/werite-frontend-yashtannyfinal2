import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getReplies } from "../../actions/commentActions";
import Comment from "./Comment";
import "./styles.css";

const CommentList = (props) => {
  const [limit, setLimit] = useState(5);

  const handleShowMore = () => {
    setLimit(limit + 5);
  };

  const comments = Object.values(props?.comments)
    ?.slice(0, limit)
    .map((comment) => {
      return (
        <div key={comment?.comment_id} className="comment-stack">
          <Comment {...comment} />
        </div>
      );
    });

  return (
    <>
      {comments}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          {limit < Object.values(props.comments)?.length && (
            <Button
              variant="outline-primary"
              style={{ fontSize: "0.9rem" }}
              onClick={handleShowMore}
            >
              Show more
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentList;
