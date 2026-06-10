import { useState } from "react";

function ProfilePage({ account, contract, setMessage }) {
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    skills: "",
    experienceYears: "",
  });

  const [profile, setProfile] = useState(null);

  function updateProfileForm(event) {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value,
    });
  }

  async function registerProfile(event) {
    event.preventDefault();

    if (!contract) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      setMessage("Registering jobseeker profile. Please confirm in MetaMask.");

      const tx = await contract.registerProfile(
        profileForm.fullName,
        profileForm.email,
        profileForm.skills,
        Number(profileForm.experienceYears)
      );

      await tx.wait();

      setMessage("Jobseeker profile registered successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to register profile.");
    }
  }

  async function viewMyProfile() {
    if (!contract || !account) {
      setMessage("Please connect MetaMask first.");
      return;
    }

    try {
      const profileData = await contract.getProfile(account);

      setProfile({
        wallet: profileData[0],
        fullName: profileData[1],
        email: profileData[2],
        skills: profileData[3],
        experienceYears: profileData[4].toString(),
        exists: profileData[5],
      });

      if (!profileData[5]) {
        setMessage("Profile not found. Please register first.");
      } else {
        setMessage("Profile loaded successfully.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load profile.");
    }
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h2>Jobseeker Profile Module</h2>
        <p>
          Jobseekers register their profile before applying for jobs.
        </p>
      </div>

      <div className="two-column">
        <div className="card">
          <h3>Register Profile</h3>
          <p className="helper">
            This profile represents the jobseeker or employee in the recruitment process.
          </p>

          <form onSubmit={registerProfile}>
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={updateProfileForm}
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={updateProfileForm}
              required
            />

            <input
              name="skills"
              placeholder="Skills: React, Solidity, Blockchain"
              onChange={updateProfileForm}
              required
            />

            <input
              name="experienceYears"
              type="number"
              placeholder="Experience Years"
              onChange={updateProfileForm}
              required
            />

            <button className="primary-btn">Register Profile</button>
          </form>
        </div>

        <div className="card">
          <h3>View My Profile</h3>

          <button onClick={viewMyProfile} className="secondary-btn">
            Load My Profile
          </button>

          {profile && profile.exists && (
            <div className="result">
              <h4>Profile Details</h4>
              <p><strong>Wallet:</strong> {profile.wallet}</p>
              <p><strong>Name:</strong> {profile.fullName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Skills:</strong> {profile.skills}</p>
              <p><strong>Experience:</strong> {profile.experienceYears} years</p>
            </div>
          )}

          {profile && !profile.exists && (
            <div className="result">
              <h4>Profile Not Found</h4>
              <p>Please register a jobseeker profile first.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;