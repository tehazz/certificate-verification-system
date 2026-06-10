import { useState } from "react";

function JobApplicationPage({ contract, setMessage }) {
  const [jobForm, setJobForm] = useState({
    jobTitle: "",
    certificateId: "",
  });

  function updateJobForm(event) {
    setJobForm({
      ...jobForm,
      [event.target.name]: event.target.value,
    });
  }

  async function applyForJob(event) {
    event.preventDefault();

    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      setMessage("Submitting job application. Please confirm in MetaMask.");

      const tx = await contract.applyForJob(
        jobForm.jobTitle,
        jobForm.certificateId
      );

      await tx.wait();

      setMessage(
        "Job application submitted successfully. Use Application ID 1 for the first application, 2 for the second, and so on."
      );

      setJobForm({
        jobTitle: "",
        certificateId: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(
        "Failed to apply. Make sure your profile exists and your certificate is valid."
      );
    }
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h2>Job Application Module</h2>
        <p>
          Jobseekers apply for jobs using verified certificate records.
        </p>
      </div>

      <div className="card">
        <h3>Apply for Job</h3>
        <p className="helper">
          Register your profile first, then use a valid certificate ID to apply.
        </p>

        <form onSubmit={applyForJob}>
          <input
            name="jobTitle"
            value={jobForm.jobTitle}
            placeholder="Job Title: Blockchain Developer"
            onChange={updateJobForm}
            required
          />

          <input
            name="certificateId"
            value={jobForm.certificateId}
            placeholder="Verified Certificate ID: CERT001"
            onChange={updateJobForm}
            required
          />

          <button className="primary-btn">Submit Job Application</button>
        </form>
      </div>

      <div className="card info-card">
        <h3>Application Notes</h3>
        <p>
          The first submitted application will normally be Application ID 1.
          The next application will be ID 2, and so on.
        </p>
        <p>
          HR can use the Application ID in the HR Evaluation page to view,
          evaluate, approve, or reject the application.
        </p>
      </div>
    </section>
  );
}

export default JobApplicationPage;