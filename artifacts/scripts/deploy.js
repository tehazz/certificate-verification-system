const hre = require("hardhat");

async function main() {
  const CertificateRecruitment = await hre.ethers.getContractFactory(
    "CertificateRecruitment"
  );

  const certificateRecruitment = await CertificateRecruitment.deploy();

  await certificateRecruitment.waitForDeployment();

  const contractAddress = await certificateRecruitment.getAddress();

  console.log("CertificateRecruitment deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});