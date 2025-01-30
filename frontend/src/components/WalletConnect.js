import React, { useState } from "react";
import { getBlockchain } from "../ethers";

const WalletConnect = ({ setDPostContract }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      const { dPostContract, signer } = await getBlockchain();
      const address = await signer.getAddress();
      setWalletAddress(address); // Display the connected wallet
      setDPostContract(dPostContract); // Pass contract instance to parent
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
