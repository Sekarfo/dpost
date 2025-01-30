import React, { useState } from "react";

const CreatePost = ({ dPostContract }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createPost = async () => {
    if (!dPostContract) {
      setMessage("Smart contract is not connected. Please connect your wallet.");
      return;
    }
    if (!content.trim()) {
      setMessage("Post content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const tx = await dPostContract.createPost(content);
      await tx.wait(); // Wait for transaction confirmation
      setMessage("Post created successfully!");
      setContent(""); // Clear input field
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Create a Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        rows="3"
        cols="50"
        style={{ display: "block", marginBottom: "10px", padding: "10px" }}
      />
      <button onClick={createPost} disabled={loading}>
        {loading ? "Posting..." : "Create Post"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePost;
