# Blockchain Certificate Verification and Recruitment System

This project is a **Blockchain-Based Certificate Verification and Recruitment System**.

The system allows certificate records to be stored and verified using blockchain technology. It also supports a simple recruitment process where jobseekers can register profiles, apply for jobs using verified certificates, and HR/company users can evaluate, approve, or reject applications.

The project uses:

* **Solidity** for the smart contract
* **Hardhat** for contract development and deployment
* **Ethereum Sepolia Test Network** for blockchain testing
* **React + Vite** for the frontend
* **ethers.js** to connect the frontend with the smart contract
* **MetaMask** as the blockchain wallet

---

## Project Purpose

The main purpose of this system is to improve trust and transparency in certificate verification and recruitment.

The system helps to solve problems such as:

* Fake or unverified certificates
* Manual certificate checking
* Lack of transparency in recruitment
* Difficulty verifying applicant credentials
* Inefficient candidate evaluation process

---

## Main Features

| Feature                  | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| Certificate Issuing      | Admin/issuer can issue certificate records on blockchain.    |
| Certificate Verification | HR/company can verify whether a certificate is valid.        |
| Certificate Revocation   | Admin/issuer can revoke invalid certificates.                |
| Jobseeker Profile        | Jobseekers can register their profile using MetaMask wallet. |
| Job Application          | Jobseekers can apply for jobs using a valid certificate ID.  |
| Candidate Evaluation     | HR/company can evaluate applicants based on verified data.   |
| Application Decision     | HR/company can approve or reject job applications.           |
| Blockchain Record        | Important actions are recorded as blockchain transactions.   |

---

## Project Structure

```text
certificate-verification-system/
│
├── contract/
│   ├── contracts/
│   │   └── CertificateRecruitment.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── hardhat.config.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── abi/
│   │   │   └── CertificateRecruitment.json
│   │   ├── constants/
│   │   │   └── contract.js
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CertificatePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── JobApplicationPage.jsx
│   │   │   └── HREvaluationPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Folder Explanation

### `contract/`

This folder contains the blockchain smart contract and deployment setup.

It includes:

* Solidity smart contract
* Hardhat configuration
* Deployment script
* Environment variable example file

Main contract:

```text
contract/contracts/CertificateRecruitment.sol
```

---

### `frontend/`

This folder contains the React frontend interface.

It includes:

* Dashboard page
* Certificate verification page
* Jobseeker profile page
* Job application page
* HR evaluation page
* Sidebar navigation
* MetaMask connection
* Smart contract interaction using ethers.js

Main frontend file:

```text
frontend/src/App.jsx
```

---

## Before Running the Project

Make sure these are installed or prepared:

* Node.js v18 or higher
* npm
* Git
* VS Code
* MetaMask browser extension
* Alchemy account
* Sepolia test ETH

---

## Check Node and npm Version

Run:

```bash
node --version
npm --version
```

Expected:

```text
node v18.x.x or higher
npm 9.x.x or higher
```

---

## MetaMask and Sepolia Setup

Before using the system:

1. Install MetaMask.
2. Create or import a wallet.
3. Switch network to **Sepolia Test Network**.
4. Get Sepolia test ETH from a faucet.
5. Use the same wallet for deployment if you want owner access.

Owner-only functions include:

```text
issueCertificate()
revokeCertificate()
evaluateCandidate()
approveApplication()
rejectApplication()
```

---

## Alchemy Setup

Create an Alchemy account:

```text
https://alchemy.com
```

Create a new app:

```text
Chain: Ethereum
Network: Sepolia
```

Copy the HTTPS RPC URL.

Example:

```text
https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

This URL will be used inside the contract `.env` file.

---

# Contract Setup

Go to the contract folder:

```bash
cd contract
```

Install dependencies:

```bash
npm install
```

---

## Create `.env` File

Inside the `contract` folder, create a file named:

```text
.env
```

Add:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=YOUR_TEST_WALLET_PRIVATE_KEY
```

Replace:

```text
YOUR_ALCHEMY_KEY
```

with your Alchemy Sepolia API key.

Replace:

```text
YOUR_TEST_WALLET_PRIVATE_KEY
```

with your MetaMask test wallet private key.

---

## Important Security Warning

Do not upload the real `.env` file to GitHub.

The `.env` file contains your private key. Anyone with your private key can control your wallet.

Only upload:

```text
.env.example
```

Do not upload:

```text
.env
```

Make sure `.gitignore` includes:

```gitignore
.env
contract/.env
node_modules/
contract/node_modules/
frontend/node_modules/
contract/artifacts/
contract/cache/
frontend/dist/
```

---

## Compile Smart Contract

Inside the `contract` folder, run:

```bash
npx hardhat compile
```

If successful, Hardhat will generate:

```text
artifacts/
cache/
```

These folders are generated automatically and do not need to be uploaded to GitHub.

---

## Deploy Smart Contract to Sepolia

Run:

```bash
npm run deploy:sepolia
```

or:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

After successful deployment, the terminal will display a contract address.

Example:

```text
CertificateRecruitment deployed to: 0xd3C2aE6703A7C3509730af8f56e8b3620275bF02
```

Copy the deployed contract address.

---

## Current Deployed Contract

Current deployed contract address:

```text
0xd3C2aE6703A7C3509730af8f56e8b3620275bF02
```

Sepolia Etherscan:

```text
https://sepolia.etherscan.io/address/0xd3C2aE6703A7C3509730af8f56e8b3620275bF02
```

---

# Frontend Setup

Go to the frontend folder:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

If needed, install these packages:

```bash
npm install ethers react-router-dom
```

---

## Update Contract Address

Open:

```text
frontend/src/constants/contract.js
```

Update the contract address:

```js
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

Example:

```js
export const CONTRACT_ADDRESS = "0xd3C2aE6703A7C3509730af8f56e8b3620275bF02";
```

---

## ABI File

The ABI file is needed so the frontend can communicate with the smart contract.

The ABI file should be located at:

```text
frontend/src/abi/CertificateRecruitment.json
```

If you compile the contract again, the generated ABI can be found at:

```text
contract/artifacts/contracts/CertificateRecruitment.sol/CertificateRecruitment.json
```

Copy it into:

```text
frontend/src/abi/CertificateRecruitment.json
```

---

## Run Frontend

Inside the `frontend` folder, run:

```bash
npm run dev
```

Open the local website:

```text
http://localhost:5173
```

---

# System Pages

## 1. Dashboard

The dashboard shows the overall project flow and main system modules.

It includes:

* Certificate Trust
* Recruitment Flow
* Candidate Evaluation
* Audit Trail

---

## 2. Certificate Verification Page

This page allows the admin/issuer to:

* Issue certificate
* Verify certificate
* Revoke certificate

Example certificate data:

```text
Certificate ID: CERT001
Recipient Name: Ahmad Ali
Issuer Name: IIUM
Certificate Title: Bachelor of Information Technology
Issue Date: 2026-06-01
Certificate Hash: HASH123456
```

---

## 3. Jobseeker Profile Page

This page allows jobseekers to register and view their profile.

Profile fields:

```text
Full Name
Email
Skills
Experience Years
Wallet Address
```

---

## 4. Job Application Page

This page allows jobseekers to apply for a job using a valid certificate ID.

Application fields:

```text
Job Title
Certificate ID
```

Example:

```text
Job Title: Blockchain Developer
Certificate ID: CERT001
```

---

## 5. HR Evaluation Page

This page allows HR/company users to:

* View application
* Evaluate candidate
* Approve application
* Reject application

The evaluation result includes:

```text
Evaluation Score
Strength
Weakness
Application Status
```

---

# Demo / Test Case Flow

Use the following flow to test the system.

---

## Test Case 1: Connect MetaMask

Steps:

1. Open the website.
2. Click **Connect MetaMask**.
3. Approve the connection.

Expected result:

```text
Wallet and contract connected successfully.
```

---

## Test Case 2: Issue Certificate

Page:

```text
Certificate Verification
```

Input:

```text
Certificate ID: CERT001
Recipient Name: Ahmad Ali
Issuer Name: IIUM
Certificate Title: Bachelor of Information Technology
Issue Date: 2026-06-01
Certificate Hash: HASH123456
```

Expected result:

```text
Certificate issued and stored on blockchain successfully.
```

---

## Test Case 3: Verify Valid Certificate

Input:

```text
CERT001
```

Expected result:

```text
Certificate is valid and verified on blockchain.
```

---

## Test Case 4: Verify Fake Certificate

Input:

```text
CERT999
```

Expected result:

```text
Certificate not found.
```

---

## Test Case 5: Register Jobseeker Profile

Page:

```text
Jobseeker Profile
```

Input:

```text
Full Name: Ahmad Ali
Email: ahmad@example.com
Skills: React, Solidity, Blockchain
Experience Years: 2
```

Expected result:

```text
Jobseeker profile registered successfully.
```

---

## Test Case 6: Apply for Job

Page:

```text
Job Application
```

Input:

```text
Job Title: Blockchain Developer
Certificate ID: CERT001
```

Expected result:

```text
Job application submitted successfully.
```

---

## Test Case 7: Apply with Fake Certificate

Input:

```text
Job Title: Software Engineer
Certificate ID: CERT999
```

Expected result:

```text
Failed to apply. Make sure your profile exists and your certificate is valid.
```

---

## Test Case 8: View Application

Page:

```text
HR Evaluation
```

Input:

```text
Application ID: 1
```

Expected result:

```text
Application details displayed.
Status: Pending
```

---

## Test Case 9: Evaluate Candidate

Input:

```text
Application ID: 1
```

Expected result example:

```text
Evaluation Score: 100
Strength: Strong verified certificate, relevant skills, and good experience.
Weakness: Minor improvement may be needed depending on job requirements.
Status: Pending
```

---

## Test Case 10: Approve Application

Input:

```text
Application ID: 1
```

Expected result:

```text
Status: Approved
```

---

## Test Case 11: Reject Application

Use another application ID if possible.

Expected result:

```text
Status: Rejected
```

---

## Test Case 12: Revoke Certificate

Input:

```text
CERT001
```

Expected result:

```text
Certificate exists but has been revoked or marked invalid.
Status: Revoked / Invalid
```

---

# Common Errors and Fixes

## MetaMask Not Detected

Cause:

```text
MetaMask is not installed or not enabled.
```

Fix:

Install MetaMask and refresh the page.

---

## Wrong Network

Cause:

```text
MetaMask is not connected to Sepolia.
```

Fix:

Switch MetaMask network to:

```text
Sepolia Test Network
```

---

## Failed to Issue Certificate

Possible causes:

```text
Not using deployer wallet
Certificate ID already exists
Not enough Sepolia ETH
Wrong contract address
```

Fix:

Use the deployer wallet and try a new certificate ID such as:

```text
CERT002
CERT003
CERT004
```

---

## Failed to Apply for Job

Possible causes:

```text
Profile is not registered
Certificate ID is invalid
Certificate was revoked
Wrong MetaMask wallet
```

Fix:

Register profile first and use a valid certificate ID.

---

## Application Not Found

Possible causes:

```text
Wrong application ID
Application was not submitted successfully
```

Fix:

Try checking application ID:

```text
1
2
3
```

---

## Only Owner Can Perform This Action

Cause:

```text
The connected wallet is not the deployer wallet.
```

Fix:

Use the wallet that deployed the contract.

---

# GitHub Upload Notes

Do not upload:

```text
.env
node_modules/
artifacts/
cache/
dist/
```

Upload:

```text
contract/
frontend/
.gitignore
README.md
```

Recommended `.gitignore`:

```gitignore
.env
contract/.env
frontend/.env

node_modules/
contract/node_modules/
frontend/node_modules/

contract/artifacts/
contract/cache/

frontend/dist/

*.log
.DS_Store
Thumbs.db
```

---

# Group Member Setup

After cloning the repository, group members should run:

```bash
git clone https://github.com/YOUR_USERNAME/certificate-verification-system.git
cd certificate-verification-system
```

Install contract dependencies:

```bash
cd contract
npm install
```

Create `.env` based on `.env.example`.

Install frontend dependencies:

```bash
cd ../frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Prototype Limitations

This prototype currently has some limitations:

* Certificate hash is entered manually.
* No file upload feature yet.
* No backend database such as MongoDB yet.
* Role management is simplified.
* The system uses Sepolia testnet, not Ethereum mainnet.
* Evaluation logic is simple and based on certificate validity, experience, and skills.

---

# Future Improvements

Possible improvements:

* Add real certificate PDF upload.
* Generate certificate hash automatically.
* Add backend using Node.js or Flask.
* Add MongoDB for off-chain storage.
* Add role-based access control for admin, HR, company, and jobseeker.
* Add company job posting module.
* Add QR code verification.
* Add email notification for application status.
* Improve candidate evaluation algorithm.

---

# Summary

This project demonstrates a blockchain-based system for certificate verification and recruitment.

The smart contract stores and verifies certificate records on the Sepolia blockchain. The React frontend allows users to interact with the contract through MetaMask. The system supports certificate verification, jobseeker profiles, job applications, candidate evaluation, and HR approval or rejection.
