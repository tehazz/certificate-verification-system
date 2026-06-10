function Dashboard({ account }) {
  return (
    <section className="page-section">
      <div className="section-header">
        <h2>System Dashboard</h2>
        <p>
          Overview of the blockchain-based certificate verification and
          recruitment system.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Certificate Trust</h3>
          <p>Stores certificate records and hashes on blockchain.</p>
        </div>

        <div className="stat-card">
          <h3>Recruitment Flow</h3>
          <p>Supports job applications using verified credentials.</p>
        </div>

        <div className="stat-card">
          <h3>Candidate Evaluation</h3>
          <p>Generates strength and weakness based on verified data.</p>
        </div>

        <div className="stat-card">
          <h3>Audit Trail</h3>
          <p>Important actions are recorded as blockchain transactions.</p>
        </div>
      </div>

      <div className="card overview-card">
        <h3>Project Flow</h3>

        <div className="flow">
          <div>Jobseeker Profile</div>
          <span>→</span>
          <div>Certificate Verification</div>
          <span>→</span>
          <div>Job Application</div>
          <span>→</span>
          <div>HR Evaluation</div>
          <span>→</span>
          <div>Approve / Reject</div>
        </div>

        <p className="helper">
          This follows the project idea where jobseekers provide verified
          credentials, blockchain ensures trust, and HR/company users make
          recruitment decisions using verified data.
        </p>

        {!account && (
          <p className="warning-text">
            Please connect MetaMask before using the system modules.
          </p>
        )}
      </div>
    </section>
  );
}

export default Dashboard;