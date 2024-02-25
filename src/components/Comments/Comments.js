import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getParentComments } from "../../actions/commentActions";
import { buildCommentTree } from "../../utils/commentTree";
import Loader from "../Loader";
import CommentList from "./CommentList";

const Comments = ({ post_id, type }) => {
  const dispatch = useDispatch();
  

  const { loading, error, Comments } = useSelector((state) => state.commentReducer);
  
  useEffect(() => {
    
  }, [ dispatch,Comments]);
  
  useEffect(() => {
    dispatch(getParentComments(post_id));
  }, [post_id, dispatch]);

  

  const commentTree = buildCommentTree(Comments);

  return (
    <Container>
      {loading && <Loader />}
      {commentTree != null && commentTree.length > 0 && (
        <CommentList comments={commentTree} />
      )}
    </Container>
  );
};

export default Comments;
