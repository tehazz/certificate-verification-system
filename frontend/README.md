# Frontend Folder

This folder contains the frontend interface for the **Blockchain Certificate Verification and Recruitment System**.

The frontend is built using **React + Vite** and connects to the deployed smart contract using **ethers.js** and **MetaMask**.

---

## Folder Structure

```text
frontend/
│
├── src/
│   ├── abi/
│   │   └── CertificateRecruitment.json
│   │
│   ├── constants/
│   │   └── contract.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── CertificatePage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── JobApplicationPage.jsx
│   │   └── HREvaluationPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── README.md
```

---

## Frontend Purpose

The frontend provides a user-friendly interface for users to interact with the blockchain smart contract.

Users can:

* Connect MetaMask wallet
* Issue certificate records
* Verify certificates
* Revoke certificates
* Register jobseeker profiles
* Apply for jobs
* View applications
* Evaluate candidates
* Approve or reject applications

---

## Technologies Used

| Technology   | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| React        | Builds the frontend user interface                      |
| Vite         | Runs and builds the React project                       |
| ethers.js    | Connects frontend to the blockchain smart contract      |
| MetaMask     | Allows users to connect wallet and confirm transactions |
| React Router | Provides page navigation                                |
| CSS          | Styles the frontend pages                               |

---

## Main Files

### `src/main.jsx`

This is the entry point of the React application.

It renders the `App.jsx` component into the HTML root element.

---

### `src/App.jsx`

This file controls the main frontend logic.

It handles:

* MetaMask connection
* Contract connection
* Routing between pages
* Shared state such as wallet account, contract, and messages

---

### `src/constants/contract.js`

This file stores the deployed smart contract address.

Example:

```js
export const CONTRACT_ADDRESS = "0xd3C2aE6703A7C3509730af8f56e8b3620275bF02";
```

If the smart contract is redeployed, update this file with the new contract address.

---

### `src/abi/CertificateRecruitment.json`

This file contains the ABI of the deployed smart contract.

The ABI allows the frontend to understand and call the smart contract functions.

If the smart contract is changed and compiled again, copy the updated ABI from:

```text
contract/artifacts/contracts/CertificateRecruitment.sol/CertificateRecruitment.json
```

to:

```text
frontend/src/abi/CertificateRecruitment.json
```

---

## Components

### `src/components/Layout.jsx`

Controls the main layout of the system.

It displays:

* Sidebar
* Header
* Wallet information
* System message
* Current page content

---

### `src/components/Sidebar.jsx`

Displays the navigation menu.

Pages included:

* Dashboard
* Certificate Verification
* Jobseeker Profile
* Job Application
* HR Evaluation

---

### `src/components/Header.jsx`

Displays the system title, short description, and **Connect MetaMask** button.

---

## Pages

### `src/pages/Dashboard.jsx`

The dashboard gives an overview of the system.

It shows the main modules:

* Certificate Trust
* Recruitment Flow
* Candidate Evaluation
* Audit Trail

---

### `src/pages/CertificatePage.jsx`

This page handles certificate-related functions.

Users can:

* Issue a certificate
* Verify a certificate
* Revoke a certificate

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

### `src/pages/ProfilePage.jsx`

This page allows jobseekers to register and view their profile.

Profile information includes:

* Full name
* Email
* Skills
* Experience years
* Wallet address

Example profile data:

```text
Full Name: Ahmad Ali
Email: ahmad@example.com
Skills: React, Solidity, Blockchain
Experience Years: 2
```

---

### `src/pages/JobApplicationPage.jsx`

This page allows jobseekers to apply for a job using a valid certificate ID.

The job application requires:

* Job title
* Certificate ID

Example:

```text
Job Title: Blockchain Developer
Certificate ID: CERT001
```

The smart contract only allows application if:

* The jobseeker profile exists
* The certificate ID is valid

---

### `src/pages/HREvaluationPage.jsx`

This page is used by HR or company users to review applications.

HR/company can:

* View application
* Evaluate candidate
* Approve application
* Reject application

The evaluation result includes:

* Evaluation score
* Strength
* Weakness
* Application status

---

## Install Dependencies

Open terminal inside the `frontend` folder:

```bash
cd frontend
npm install
```

If needed, install the required packages manually:

```bash
npm install ethers react-router-dom
```

---

## Run the Frontend

Inside the `frontend` folder, run:

```bash
npm run dev
```

Then open the local website:

```text
http://localhost:5173
```

---

## MetaMask Requirement

Before using the frontend, make sure:

* MetaMask is installed
* MetaMask is connected to **Sepolia Test Network**
* The wallet has Sepolia ETH for transactions
* The contract address in `contract.js` is correct

---

## Connect to Smart Contract

The frontend connects to the deployed smart contract using:

```js
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const systemContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  signer
);
```

The `CONTRACT_ADDRESS` comes from:

```text
src/constants/contract.js
```

The ABI comes from:

```text
src/abi/CertificateRecruitment.json
```

---

## Read and Write Functions

The frontend calls both read and write functions from the smart contract.

### Read Functions

Read functions do not require gas fees.

Examples:

```text
verifyCertificate()
getCertificate()
getProfile()
getApplication()
```

### Write Functions

Write functions require MetaMask confirmation and gas fees.

Examples:

```text
issueCertificate()
revokeCertificate()
registerProfile()
applyForJob()
evaluateCandidate()
approveApplication()
rejectApplication()
```

---

## Demo Flow

Use this flow to test the frontend:

```text
1. Open the frontend website
2. Connect MetaMask
3. Go to Certificate Verification
4. Issue certificate
5. Verify certificate
6. Go to Jobseeker Profile
7. Register profile
8. Go to Job Application
9. Apply for job using valid certificate ID
10. Go to HR Evaluation
11. View application
12. Evaluate candidate
13. Approve or reject application
```

---

## Test Data

### Certificate

```text
Certificate ID: CERT001
Recipient Name: Ahmad Ali
Issuer Name: IIUM
Certificate Title: Bachelor of Information Technology
Issue Date: 2026-06-01
Certificate Hash: HASH123456
```

### Fake Certificate ID

```text
CERT999
```

### Jobseeker Profile

```text
Full Name: Ahmad Ali
Email: ahmad@example.com
Skills: React, Solidity, Blockchain
Experience Years: 2
```

### Job Application

```text
Job Title: Blockchain Developer
Certificate ID: CERT001
```

---

## Common Errors and Fixes

### MetaMask is not detected

Possible cause:

```text
MetaMask is not installed or disabled.
```

Fix:

Install or enable MetaMask, then refresh the page.

---

### Wallet connected but wrong network

Possible cause:

```text
MetaMask is not on Sepolia Test Network.
```

Fix:

Switch MetaMask to:

```text
Sepolia Test Network
```

---

### Failed to connect wallet or contract

Possible causes:

```text
Wrong contract address
Wrong ABI file
MetaMask not connected
Network is not Sepolia
```

Fix:

Check:

```text
src/constants/contract.js
src/abi/CertificateRecruitment.json
```

---

### Failed to issue certificate

Possible causes:

```text
Connected wallet is not the deployer wallet
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

### Failed to apply for job

Possible causes:

```text
Profile is not registered
Certificate ID is invalid
Certificate has been revoked
Wrong wallet is connected
```

Fix:

Register a profile first and use a valid certificate ID.

---

### Application not found

Possible causes:

```text
Wrong application ID
Application was not submitted successfully
```

Fix:

Try checking different application IDs:

```text
1
2
3
```

---

### Only owner can perform this action

Possible cause:

```text
The connected wallet is not the wallet that deployed the contract.
```

Fix:

Use the deployer wallet for owner-only functions.

Owner-only actions include:

```text
Issue certificate
Revoke certificate
Evaluate candidate
Approve application
Reject application
```

---

## Styling

The frontend design is controlled by:

```text
src/index.css
```

This file controls:

* Background color
* Sidebar style
* Card design
* Button colors
* Page layout
* Responsive design

To edit page content, update the files inside:

```text
src/pages/
```

To edit navigation, update:

```text
src/components/Sidebar.jsx
```

To edit the header title, update:

```text
src/components/Header.jsx
```

---

## Build Frontend

To build the frontend for production:

```bash
npm run build
```

This will generate the production files inside:

```text
dist/
```

The `dist` folder does not need to be uploaded to GitHub because it can be generated again.

---

## Summary

The `frontend` folder contains the user interface for the Blockchain Certificate Verification and Recruitment System.

It allows users to interact with the deployed smart contract through MetaMask. The frontend supports certificate verification, jobseeker profile registration, job application, HR evaluation, and application approval or rejection.

