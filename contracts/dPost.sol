// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract dPost {
    struct Post {
        uint postId;
        address author;
        string content;
        uint upvotes;
        uint timestamp;
    }

    uint public postCounter;
    mapping(uint => Post) public posts;
    mapping(address => uint) public balances;

    event PostCreated(uint indexed postId, address indexed author, string content);
    event Upvoted(uint indexed postId, address indexed voter, uint newUpvoteCount);

    //  Function to create a post
    function createPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        postCounter++;
        posts[postCounter] = Post(postCounter, msg.sender, _content, 0, block.timestamp);
        emit PostCreated(postCounter, msg.sender, _content);
    }

    //  Function to upvote a post
    function upvotePost(uint _postId) public payable {
    require(msg.value >= 0.01 ether, "Upvote requires 0.01 ETH"); 
    require(posts[_postId].postId != 0, "Post does not exist");  

    Post storage post = posts[_postId];
    post.upvotes += 1; 
    balances[post.author] += msg.value; 

    emit Upvoted(_postId, msg.sender, post.upvotes); 
}

    //  Function to withdraw earnings
    function withdrawEarnings() public {
        uint balance = balances[msg.sender];
        require(balance > 0, "No earnings to withdraw");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }
}
