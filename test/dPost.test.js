const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers"); // Ensure this is imported

describe("dPost Smart Contract", function () {
  let dPost, deployer, user1, user2;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();

    const DPost = await ethers.getContractFactory("dPost");
    dPost = await DPost.deploy();
    await dPost.waitForDeployment();
  });

  //  Convert BigInt to Number
  it("Should deploy the contract with correct initial values", async function () {
    expect(Number(await dPost.postCounter())).to.equal(0);
  });

  it("Should return the correct post count", async function () {
    await dPost.connect(user1).createPost("My first post");
    expect(Number(await dPost.postCounter())).to.equal(1);
  });

  it("Should update the post mapping correctly", async function () {
    await dPost.connect(user1).createPost("Test Post");
    const post = await dPost.posts(1);
    expect(post.content).to.equal("Test Post");
    expect(post.author).to.equal(user1.address);
  });

  //  Ensure Chai matchers are properly used
  it("Should emit PostCreated event", async function () {
    await expect(dPost.connect(user1).createPost("Event Test"))
      .to.emit(dPost, "PostCreated")
      .withArgs(1, user1.address, "Event Test");
  });

  it("Should emit Upvoted event", async function () {
    await dPost.connect(user1).createPost("Upvote Event");
    await expect(dPost.connect(user2).upvotePost(1, { value: ethers.parseEther("0.01") }))
      .to.emit(dPost, "Upvoted")
      .withArgs(1, user2.address, 1);
  });

  // Ensure Chai properly detects reverts
  it("Should fail when trying to create an empty post", async function () {
    await expect(dPost.connect(user1).createPost(""))
      .to.be.revertedWith("Content cannot be empty");
  });

  it("Should fail when upvoting a non-existent post", async function () {
    await expect(dPost.connect(user1).upvotePost(99, { value: ethers.parseEther("0.01") }))
      .to.be.revertedWith("Post does not exist");
  });

  it("Should fail when upvoting without sending enough ETH", async function () {
    await dPost.connect(user1).createPost("Upvote Test");
    await expect(dPost.connect(user2).upvotePost(1, { value: ethers.parseEther("0.001") }))
      .to.be.revertedWith("Upvote requires 0.01 ETH");
  });

  // Convert ETH balances from BigInt to Number
  it("Should allow post author to withdraw earnings", async function () {
    await dPost.connect(user1).createPost("Withdraw Test");
    await dPost.connect(user2).upvotePost(1, { value: ethers.parseEther("0.01") });

    const balanceBefore = Number(await ethers.provider.getBalance(user1.address));
    const tx = await dPost.connect(user1).withdrawEarnings();
    await tx.wait();
    const balanceAfter = Number(await ethers.provider.getBalance(user1.address));

    expect(balanceAfter).to.be.above(balanceBefore);
  });

  it("Should prevent withdrawing with zero balance", async function () {
    await expect(dPost.connect(user1).withdrawEarnings())
      .to.be.revertedWith("No earnings to withdraw");
  });
});
