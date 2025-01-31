import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import WithdrawEarnings from "./components/WithdrawEarnings";
import "./styles.css";

const App = () => {
  const [dPostContract, setDPostContract] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>dPost - Ethereum Social Media</h1>
      </header>
      <div className="content-container">
        <WalletConnect setDPostContract={setDPostContract} />
        {dPostContract && (
          <>
            <CreatePost dPostContract={dPostContract} />
            <PostList dPostContract={dPostContract} />
            <WithdrawEarnings dPostContract={dPostContract} />
          </>
        )}
      </div>
      <footer className="app-footer">
        <p>&copy; 2025 dPost. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
