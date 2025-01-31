import React, { useState } from "react";
import { ethers } from "ethers"; // Ensure ethers is imported

const WithdrawEarnings = ({ dPostContract }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("0");

  const fetchBalance = async () => {
    if (!dPostContract) {
      setMessage("Smart contract not connected.");
      return;
    }

    try {
      // Fetch the signer from the contract
      const signer = dPostContract.signer;
      const signerAddress = await signer.getAddress(); // Ensure signer is valid
      const userBalance = await dPostContract.balances(signerAddress); // Fetch user balance
      setBalance(ethers.formatEther(userBalance)); // Convert Wei to ETH
    } catch (error) {
      console.error("Error fetching balance:", error);
      setMessage("Failed to fetch balance.");
    }
  };

  const withdrawEarnings = async () => {
    if (!dPostContract) {
      setMessage("Smart contract not connected.");
      return;
    }

    try {
      setLoading(true);
      const tx = await dPostContract.withdrawEarnings(); // Call withdrawEarnings from contract
      await tx.wait(); // Wait for transaction confirmation
      setMessage("Withdrawal successful!");
      setBalance("0"); // Reset balance
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setMessage("Failed to withdraw earnings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Withdraw Earnings</h2>
      <button className="button" onClick={fetchBalance}>Check Balance</button>
      <p><strong>Your Earnings:</strong> {balance} ETH</p>
      <button
        className="button"
        onClick={withdrawEarnings}
        disabled={loading || balance === "0"}
      >
        {loading ? "Withdrawing..." : "Withdraw Earnings"}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default WithdrawEarnings;
