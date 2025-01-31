import React, { useState } from "react";
import { ethers } from "ethers"; // Import ethers library

const Upvote = ({ dPostContract, postId, updatePosts }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const upvotePost = async () => {
    if (!dPostContract) {
      setMessage("Smart contract not connected.");
      return;
    }

    try {
      setLoading(true);
      // Use ethers to parse Ether
      const tx = await dPostContract.upvotePost(postId, {
        value: ethers.parseEther("0.01"), // Convert 0.01 ETH to Wei
      });
      await tx.wait(); // Wait for transaction confirmation
      setMessage("Upvote successful!");
      updatePosts(); // Refresh posts
    } catch (error) {
      console.error("Upvote failed:", error);
      setMessage("Failed to upvote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={upvotePost} disabled={loading}>
        {loading ? "Upvoting..." : "Upvote (0.01 ETH)"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upvote;
