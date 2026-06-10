// Paste your deployed contract address here after running the deploy script
// Example: "0xAbC123..."
//export const CONTRACT_ADDRESS = "0x17Dc5469b6d6A8C465195b344A7AB51363c07EbA";
export const CONTRACT_ADDRESS = "0xd3C2aE6703A7C3509730af8f56e8b3620275bF02";

// ABI (Application Binary Interface) — tells ethers.js what functions exist on the contract
// These must match exactly what's in Guestbook.sol
export const CONTRACT_ABI = [
  // Write function — costs gas, requires a signer
  "function postMessage(string calldata _text) external",

  // Read function — free, returns all messages as an array of structs
  "function getMessages() external view returns (tuple(address sender, string text, uint256 timestamp)[])",

  // Read function — free, returns total number of messages
  "function getMessageCount() external view returns (uint256)",

  // Event — emitted every time a message is posted (useful for real-time listening)
  "event MessagePosted(address indexed sender, string text, uint256 timestamp)",
];
