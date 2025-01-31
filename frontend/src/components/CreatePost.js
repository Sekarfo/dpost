import React, { useState } from "react";

const CreatePost = ({ dPostContract }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createPost = async () => {
    if (!dPostContract) {
      setMessage("Smart contract is not connected.");
      return;
    }
    if (!content.trim()) {
      setMessage("Post content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const tx = await dPostContract.createPost(content);
      await tx.wait();
      setMessage("Post created successfully!");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create a Post</h2>
      <textarea
        className="textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <button className="button" onClick={createPost} disabled={loading}>
        {loading ? "Posting..." : "Create Post"}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePost;
