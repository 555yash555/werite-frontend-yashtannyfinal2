import React from "react";
import { useState } from "react";
import PostsCard from "../../components/PostsCard";

const PostsList = ({ posts }) => {
  const [showId, setShowId] = useState(null);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {posts.map((post) => (
        <PostsCard
          townHall={post}
          showId={showId}
          setShowId={setShowId}
          key={post.video_id}
        />
      ))}
    </div>
  );
};

export default PostsList;
