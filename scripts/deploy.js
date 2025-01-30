const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const dPost = await hre.ethers.getContractFactory("dPost");

    // Deploy the contract
    const dPostContract = await dPost.deploy();
    await dPostContract.waitForDeployment(); // <- Fix: Use this instead of .deployed()

    // Get deployed contract address
    const contractAddress = await dPostContract.getAddress();
    console.log(" dPost deployed to:", contractAddress);
}

// Run the script
main().catch((error) => {
    console.error(" Deployment failed:", error);
    process.exitCode = 1;
});
