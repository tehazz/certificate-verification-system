import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, account, message, connectWallet }) {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Header account={account} connectWallet={connectWallet} />

        {account && (
          <div className="wallet-box">
            Connected Wallet: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        )}

        {message && <div className="message-box">{message}</div>}

        {children}
      </main>
    </div>
  );
}

export default Layout;