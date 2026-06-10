import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants/contract";
import ContractABI from "./abi/CertificateRecruitment.json";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CertificatePage from "./pages/CertificatePage";
import ProfilePage from "./pages/ProfilePage";
import JobApplicationPage from "./pages/JobApplicationPage";
import HREvaluationPage from "./pages/HREvaluationPage";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        setMessage("MetaMask is not detected. Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 11155111n) {
        setAccount(accounts[0]);
        setMessage("Wallet connected, but please switch to Sepolia Test Network.");
        return;
      }

      const signer = await provider.getSigner();
      const abi = ContractABI.abi || ContractABI;

      const systemContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );

      setAccount(accounts[0]);
      setContract(systemContract);
      setMessage("Wallet and contract connected successfully.");
    } catch (error) {
      console.error("Connection error:", error);
      setMessage("Failed to connect wallet or contract.");
    }
  }

  const sharedProps = {
    account,
    contract,
    message,
    setMessage,
    connectWallet,
  };

  return (
    <Layout
      account={account}
      message={message}
      connectWallet={connectWallet}
    >
      <Routes>
        <Route path="/" element={<Dashboard {...sharedProps} />} />
        <Route path="/certificates" element={<CertificatePage {...sharedProps} />} />
        <Route path="/profile" element={<ProfilePage {...sharedProps} />} />
        <Route path="/apply" element={<JobApplicationPage {...sharedProps} />} />
        <Route path="/hr" element={<HREvaluationPage {...sharedProps} />} />
      </Routes>
    </Layout>
  );
}

export default App;