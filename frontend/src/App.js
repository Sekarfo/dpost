import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import CreatePost from "./components/CreatePost";

const App = () => {
  const [dPostContract, setDPostContract] = useState(null);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>dPost - Ethereum Social Media</h1>
      <WalletConnect setDPostContract={setDPostContract} />
      {dPostContract && <CreatePost dPostContract={dPostContract} />}
    </div>
  );
};

export default App;
