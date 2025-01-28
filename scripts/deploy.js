async function main() {
    const dPost = await ethers.getContractFactory("dPost");
    const dPostContract = await dPost.deploy();
    console.log("dPost deployed to:", dPostContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
