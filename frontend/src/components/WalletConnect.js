import React, { useState } from "react";
import { getBlockchain } from "../ethers"// Adjust the import path as needed

const WalletConnect = ({ setDPostContract }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      const { dPostContract, signer } = await getBlockchain();
      const address = await signer.getAddress();

      console.log("Wallet Address:", address);
      console.log("dPostContract:", dPostContract); // Debug contract instance
      

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
