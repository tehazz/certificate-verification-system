# Guestbook — Blockchain Integration Lesson

A fully working on-chain guestbook. Anyone can post a message; all messages are stored permanently on the Ethereum Sepolia testnet.

---

## Before Class — Checklist

Complete this **before the class session**.

### Accounts & Wallets
- [ ] **MetaMask** installed as a browser extension → https://metamask.io
- [ ] **MetaMask wallet created** — save your seed phrase somewhere safe
- [ ] **Alchemy account** → https://alchemy.com (free tier is enough)
  - Create a new app → select chain **Ethereum** → network **Sepolia** → copy the HTTPS URL
  - It looks like: `https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY`

### Testnet ETH
- [ ] **Sepolia ETH in your wallet** — you need this to pay gas for deploying
  - Faucet : https://cloud.google.com/application/web3/faucet/ethereum/sepolia
  - You need at least **0.05 ETH** — try multiple faucets if one is dry
  - In MetaMask: switch to **Sepolia Test Network** (Add Network if not listed)

### Dev Tools
- [ ] **Node.js v18+** → https://nodejs.org (download LTS)
- [ ] **VS Code** → https://code.visualstudio.com

### Verify
```bash
node --version   # v18.x.x or higher
npm --version    # 9.x.x or higher
```

---

## In Class — Commands to Run

### 1. Deploy your contract to Sepolia

```bash
cd contract
cp .env.example .env
# Open .env and fill in your ALCHEMY Sepolia URL and PRIVATE_KEY
npm install
npx hardhat compile
npm run deploy:sepolia
```

Copy the address printed: `Guestbook deployed to: 0xABC...`

Open Sepolia Etherscan to see your live contract:
`https://sepolia.etherscan.io/address/0xYOUR_ADDRESS`

### 2. Run the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open http://localhost:5173

Paste your deployed contract address into `src/constants/contract.js`:
```js
export const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_ADDRESS";
```

### 3. Swap addresses with a classmate

Replace `CONTRACT_ADDRESS` with your classmate's address — you're now reading from their contract.

---

## Project Structure

```
contract/                  — Solidity contract + Hardhat deploy
frontend/                  — React + ethers.js frontend
```

## Key Concepts

| Concept | What it is |
|---------|-----------|
| `BrowserProvider` | Wraps MetaMask. Lets you read from the chain. |
| `getSigner()` | Gets the connected wallet. Lets you write to the chain. |
| `ethers.Contract(address, abi, signer)` | Your contract instance. |
| `contract.getMessages()` | Read call — free, no gas. |
| `contract.postMessage(text)` | Write call — costs gas, returns a tx. |
| `tx.wait()` | Waits for the transaction to be confirmed on-chain. |
