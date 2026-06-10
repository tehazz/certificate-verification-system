function Header({ account, connectWallet }) {
  return (
    <header className="topbar">
      <div>
        <h1>Blockchain Certificate Verification and Recruitment System</h1>
        <p>
          A trusted system for certificate verification, job applications,
          candidate evaluation, and HR decision-making.
        </p>
      </div>

      <button onClick={connectWallet} className="connect-btn">
        {account ? "Wallet Connected" : "Connect MetaMask"}
      </button>
    </header>
  );
}

export default Header;