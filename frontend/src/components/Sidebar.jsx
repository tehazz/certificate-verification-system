import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">BC</div>
        <div>
          <h2>TrustChain</h2>
          <p>Certificate & Recruitment</p>
        </div>
      </div>

      <nav className="nav-menu">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/certificates">Certificate Verification</NavLink>
        <NavLink to="/profile">Jobseeker Profile</NavLink>
        <NavLink to="/apply">Job Application</NavLink>
        <NavLink to="/hr">HR Evaluation</NavLink>
      </nav>

      <div className="sidebar-note">
        <strong>Network</strong>
        <span>Ethereum Sepolia</span>
      </div>
    </aside>
  );
}

export default Sidebar;