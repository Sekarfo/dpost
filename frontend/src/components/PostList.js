import React, { useState, useEffect } from "react";
import Upvote from "./Upvote";

const PostList = ({ dPostContract }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    if (!dPostContract) return;

    try {
      const postCount = (await dPostContract.postCounter()).toString();
      const postsArray = [];

      for (let i = 1; i <= parseInt(postCount); i++) {
        const post = await dPostContract.posts(i);
        postsArray.push({
          postId: post.postId.toString(),
          author: post.author,
          content: post.content,
          upvotes: post.upvotes.toString(),
          timestamp: new Date(Number(post.timestamp) * 1000).toLocaleString(),
        });
      }

      setPosts(postsArray.reverse());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    if (!dPostContract) return;
    const handleNewPost = (postId, author, content) => {
      setPosts((prevPosts) => [
        {
          postId: postId.toString(),
          author,
          content,
          upvotes: "0",
          timestamp: new Date().toLocaleString(),
        },
        ...prevPosts,
      ]);
    };
    dPostContract.on("PostCreated", handleNewPost);
    return () => {
      dPostContract.off("PostCreated", handleNewPost);
    };
  }, [dPostContract]);

  return (
    <div className="card">
      <h2>Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.postId} className="post-card">
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Content:</strong> {post.content}</p>
            <p><strong>Upvotes:</strong> {post.upvotes}</p>
            <p><strong>Posted on:</strong> {post.timestamp}</p>
            <Upvote dPostContract={dPostContract} postId={post.postId} updatePosts={fetchPosts} />
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
