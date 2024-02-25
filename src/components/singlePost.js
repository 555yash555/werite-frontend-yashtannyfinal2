import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPostById, getAllPosts } from "../actions/postsAction";
import PostsCard from "./PostsCard";
import Loader from "./Loader";

const SinglePostCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Use useEffect to dispatch getAllPosts only once when the component mounts
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  
  const { posts, loading } = useSelector((state) => state.getAllPosts);
  console.log("Redux State:", posts);
  console.log("loading:", loading);

  const post = posts ? posts.find((post) => Number(post.post_id) === Number(id)) : null;

  return (
    <div>
      
      
      {loading || loading===undefined ? (
        <Loader />
      ) : (
        <div style={{ maxWidth: '1100px' }}>
        <PostsCard townHall={post} showId={null} setShowId={() => {}} />
        </div>
      )}
    </div>
  );
};

export default SinglePostCard;
