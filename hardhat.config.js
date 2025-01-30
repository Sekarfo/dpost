require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env file

module.exports = {
    solidity: "0.8.18",
    networks: {
        sepolia: {
            url: "https://rpc.ankr.com/eth_sepolia", // Reliable RPC URL for Sepolia
            accounts: [process.env.PRIVATE_KEY], // Use your private key from .env
        },
    }
};
