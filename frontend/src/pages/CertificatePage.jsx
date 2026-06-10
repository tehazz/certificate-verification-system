import { useState } from "react";

function CertificatePage({ contract, setMessage }) {
  const [certificateForm, setCertificateForm] = useState({
    certificateId: "",
    recipientName: "",
    issuerName: "",
    certificateTitle: "",
    issueDate: "",
    certificateHash: "",
  });

  const [verifyId, setVerifyId] = useState("");
  const [certificate, setCertificate] = useState(null);

  function updateCertificateForm(event) {
    setCertificateForm({
      ...certificateForm,
      [event.target.name]: event.target.value,
    });
  }

  async function issueCertificate(event) {
    event.preventDefault();

    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      setMessage("Issuing certificate. Please confirm in MetaMask.");

      const tx = await contract.issueCertificate(
        certificateForm.certificateId,
        certificateForm.recipientName,
        certificateForm.issuerName,
        certificateForm.certificateTitle,
        certificateForm.issueDate,
        certificateForm.certificateHash
      );

      await tx.wait();

      setMessage("Certificate issued and stored on blockchain successfully.");

      setCertificateForm({
        certificateId: "",
        recipientName: "",
        issuerName: "",
        certificateTitle: "",
        issueDate: "",
        certificateHash: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(
        "Failed to issue certificate. Only owner can issue and certificate ID must be unique."
      );
    }
  }

  async function verifyCertificate(event) {
    event.preventDefault();

    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      const isValid = await contract.verifyCertificate(verifyId);
      const certData = await contract.getCertificate(verifyId);

      const certObject = {
        certificateId: certData[0],
        recipientName: certData[1],
        issuerName: certData[2],
        certificateTitle: certData[3],
        issueDate: certData[4],
        certificateHash: certData[5],
        isValid: certData[6],
        exists: certData[7],
      };

      setCertificate(certObject);

      if (!certObject.exists) {
        setMessage("Certificate not found. This may indicate a fake or unregistered certificate.");
      } else if (isValid) {
        setMessage("Certificate is valid and verified on blockchain.");
      } else {
        setMessage("Certificate exists but has been revoked or marked invalid.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to verify certificate.");
    }
  }

  async function revokeCertificate() {
    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    if (!verifyId) {
      setMessage("Please enter a certificate ID first.");
      return;
    }

    try {
      setMessage("Revoking certificate. Please confirm in MetaMask.");

      const tx = await contract.revokeCertificate(verifyId);
      await tx.wait();

      setMessage("Certificate revoked successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to revoke certificate. Only owner can revoke.");
    }
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h2>Certificate Verification Module</h2>
        <p>
          This module allows certificate registration, blockchain verification,
          and revocation.
        </p>
      </div>

      <div className="two-column">
        <div className="card">
          <h3>Issue Certificate</h3>
          <p className="helper">
            Admin/issuer registers a certificate record on-chain.
          </p>

          <form onSubmit={issueCertificate}>
            <input
              name="certificateId"
              value={certificateForm.certificateId}
              placeholder="Certificate ID: CERT001"
              onChange={updateCertificateForm}
              required
            />

            <input
              name="recipientName"
              value={certificateForm.recipientName}
              placeholder="Recipient Name"
              onChange={updateCertificateForm}
              required
            />

            <input
              name="issuerName"
              value={certificateForm.issuerName}
              placeholder="Issuer Name"
              onChange={updateCertificateForm}
              required
            />

            <input
              name="certificateTitle"
              value={certificateForm.certificateTitle}
              placeholder="Certificate Title"
              onChange={updateCertificateForm}
              required
            />

            <input
              name="issueDate"
              value={certificateForm.issueDate}
              placeholder="Issue Date: 2026-06-01"
              onChange={updateCertificateForm}
              required
            />

            <input
              name="certificateHash"
              value={certificateForm.certificateHash}
              placeholder="Certificate Hash"
              onChange={updateCertificateForm}
              required
            />

            <button className="primary-btn">Issue Certificate</button>
          </form>
        </div>

        <div className="card">
          <h3>Verify Certificate</h3>
          <p className="helper">
            HR/company verifies whether the applicant certificate is authentic.
          </p>

          <form onSubmit={verifyCertificate}>
            <input
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              placeholder="Enter Certificate ID"
              required
            />

            <button className="secondary-btn">Verify Certificate</button>
          </form>

          <button onClick={revokeCertificate} className="danger-btn">
            Revoke Certificate
          </button>

          {certificate && certificate.exists && (
            <div className="result">
              <h4>Certificate Details</h4>
              <p><strong>ID:</strong> {certificate.certificateId}</p>
              <p><strong>Recipient:</strong> {certificate.recipientName}</p>
              <p><strong>Issuer:</strong> {certificate.issuerName}</p>
              <p><strong>Title:</strong> {certificate.certificateTitle}</p>
              <p><strong>Issue Date:</strong> {certificate.issueDate}</p>
              <p><strong>Hash:</strong> {certificate.certificateHash}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={certificate.isValid ? "badge valid" : "badge invalid"}>
                  {certificate.isValid ? "Valid" : "Revoked / Invalid"}
                </span>
              </p>
            </div>
          )}

          {certificate && !certificate.exists && (
            <div className="result">
              <h4>Certificate Not Found</h4>
              <p>No blockchain record exists for this certificate ID.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CertificatePage;