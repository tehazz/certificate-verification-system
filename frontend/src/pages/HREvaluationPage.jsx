import { useState } from "react";

function HREvaluationPage({ contract, setMessage }) {
  const [applicationId, setApplicationId] = useState("");
  const [application, setApplication] = useState(null);

  async function viewApplication() {
    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    if (!applicationId) {
      setMessage("Please enter an application ID.");
      return;
    }

    try {
      const appData = await contract.getApplication(Number(applicationId));

      setApplication({
        applicationId: appData[0].toString(),
        applicant: appData[1],
        jobTitle: appData[2],
        certificateId: appData[3],
        evaluationScore: appData[4].toString(),
        strength: appData[5],
        weakness: appData[6],
        status: Number(appData[7]),
        exists: appData[8],
      });

      if (!appData[8]) {
        setMessage("Application not found.");
      } else {
        setMessage("Application loaded successfully.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to view application.");
    }
  }

  async function evaluateCandidate() {
    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    if (!applicationId) {
      setMessage("Please enter an application ID.");
      return;
    }

    try {
      setMessage("Evaluating candidate. Please confirm in MetaMask.");

      const tx = await contract.evaluateCandidate(Number(applicationId));
      await tx.wait();

      setMessage("Candidate evaluated successfully.");
      await viewApplication();
    } catch (error) {
      console.error(error);
      setMessage("Failed to evaluate candidate. Only owner/HR can evaluate.");
    }
  }

  async function approveApplication() {
    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      const tx = await contract.approveApplication(Number(applicationId));
      await tx.wait();

      setMessage("Application approved successfully.");
      await viewApplication();
    } catch (error) {
      console.error(error);
      setMessage("Failed to approve application. Only owner/HR can approve.");
    }
  }

  async function rejectApplication() {
    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      const tx = await contract.rejectApplication(Number(applicationId));
      await tx.wait();

      setMessage("Application rejected successfully.");
      await viewApplication();
    } catch (error) {
      console.error(error);
      setMessage("Failed to reject application. Only owner/HR can reject.");
    }
  }

  function getStatusText(status) {
    if (status === 0) return "Pending";
    if (status === 1) return "Approved";
    if (status === 2) return "Rejected";
    return "Unknown";
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h2>HR Evaluation and Decision Module</h2>
        <p>
          HR/company users can review applications, evaluate candidates, and
          approve or reject applications.
        </p>
      </div>

      <div className="card">
        <h3>Application Review</h3>

        <input
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          placeholder="Enter Application ID"
        />

        <div className="button-row">
          <button onClick={viewApplication} className="secondary-btn">
            View Application
          </button>

          <button onClick={evaluateCandidate} className="primary-btn">
            Evaluate Candidate
          </button>

          <button onClick={approveApplication} className="success-btn">
            Approve
          </button>

          <button onClick={rejectApplication} className="danger-btn">
            Reject
          </button>
        </div>

        {application && application.exists && (
          <div className="result">
            <h4>Application Details</h4>

            <p><strong>Application ID:</strong> {application.applicationId}</p>
            <p><strong>Applicant Wallet:</strong> {application.applicant}</p>
            <p><strong>Job Title:</strong> {application.jobTitle}</p>
            <p><strong>Certificate ID:</strong> {application.certificateId}</p>
            <p><strong>Evaluation Score:</strong> {application.evaluationScore}</p>
            <p><strong>Strength:</strong> {application.strength}</p>
            <p><strong>Weakness:</strong> {application.weakness}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="badge neutral">
                {getStatusText(application.status)}
              </span>
            </p>
          </div>
        )}

        {application && !application.exists && (
          <div className="result">
            <h4>Application Not Found</h4>
            <p>No application exists with this ID.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HREvaluationPage;