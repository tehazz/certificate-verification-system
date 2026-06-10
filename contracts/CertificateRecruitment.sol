// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRecruitment {
    address public owner;

    enum ApplicationStatus {
        Pending,
        Approved,
        Rejected
    }

    struct Certificate {
        string certificateId;
        string recipientName;
        string issuerName;
        string certificateTitle;
        string issueDate;
        string certificateHash;
        bool isValid;
        bool exists;
    }

    struct JobseekerProfile {
        address wallet;
        string fullName;
        string email;
        string skills;
        uint256 experienceYears;
        bool exists;
    }

    struct JobApplication {
        uint256 applicationId;
        address applicant;
        string jobTitle;
        string certificateId;
        uint256 evaluationScore;
        string strength;
        string weakness;
        ApplicationStatus status;
        bool exists;
    }

    mapping(string => Certificate) private certificates;
    mapping(address => JobseekerProfile) private profiles;
    mapping(uint256 => JobApplication) private applications;

    uint256 public applicationCount;

    event CertificateIssued(string certificateId, string recipientName, string issuerName);
    event CertificateRevoked(string certificateId);
    event ProfileRegistered(address wallet, string fullName);
    event JobApplied(uint256 applicationId, address applicant, string jobTitle);
    event CandidateEvaluated(uint256 applicationId, uint256 score, string strength, string weakness);
    event ApplicationDecision(uint256 applicationId, ApplicationStatus status);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function issueCertificate(
        string memory _certificateId,
        string memory _recipientName,
        string memory _issuerName,
        string memory _certificateTitle,
        string memory _issueDate,
        string memory _certificateHash
    ) public onlyOwner {
        require(!certificates[_certificateId].exists, "Certificate already exists");

        certificates[_certificateId] = Certificate({
            certificateId: _certificateId,
            recipientName: _recipientName,
            issuerName: _issuerName,
            certificateTitle: _certificateTitle,
            issueDate: _issueDate,
            certificateHash: _certificateHash,
            isValid: true,
            exists: true
        });

        emit CertificateIssued(_certificateId, _recipientName, _issuerName);
    }

    function verifyCertificate(string memory _certificateId) public view returns (bool) {
        return certificates[_certificateId].exists && certificates[_certificateId].isValid;
    }

    function getCertificate(
        string memory _certificateId
    )
        public
        view
        returns (
            string memory certificateId,
            string memory recipientName,
            string memory issuerName,
            string memory certificateTitle,
            string memory issueDate,
            string memory certificateHash,
            bool isValid,
            bool exists
        )
    {
        Certificate memory cert = certificates[_certificateId];

        return (
            cert.certificateId,
            cert.recipientName,
            cert.issuerName,
            cert.certificateTitle,
            cert.issueDate,
            cert.certificateHash,
            cert.isValid,
            cert.exists
        );
    }

    function revokeCertificate(string memory _certificateId) public onlyOwner {
        require(certificates[_certificateId].exists, "Certificate not found");
        require(certificates[_certificateId].isValid, "Certificate already revoked");

        certificates[_certificateId].isValid = false;

        emit CertificateRevoked(_certificateId);
    }

    function registerProfile(
        string memory _fullName,
        string memory _email,
        string memory _skills,
        uint256 _experienceYears
    ) public {
        profiles[msg.sender] = JobseekerProfile({
            wallet: msg.sender,
            fullName: _fullName,
            email: _email,
            skills: _skills,
            experienceYears: _experienceYears,
            exists: true
        });

        emit ProfileRegistered(msg.sender, _fullName);
    }

    function getProfile(
        address _wallet
    )
        public
        view
        returns (
            address wallet,
            string memory fullName,
            string memory email,
            string memory skills,
            uint256 experienceYears,
            bool exists
        )
    {
        JobseekerProfile memory profile = profiles[_wallet];

        return (
            profile.wallet,
            profile.fullName,
            profile.email,
            profile.skills,
            profile.experienceYears,
            profile.exists
        );
    }

    function applyForJob(
        string memory _jobTitle,
        string memory _certificateId
    ) public {
        require(profiles[msg.sender].exists, "Please register profile first");
        require(verifyCertificate(_certificateId), "Certificate is not valid");

        applicationCount++;

        applications[applicationCount] = JobApplication({
            applicationId: applicationCount,
            applicant: msg.sender,
            jobTitle: _jobTitle,
            certificateId: _certificateId,
            evaluationScore: 0,
            strength: "",
            weakness: "",
            status: ApplicationStatus.Pending,
            exists: true
        });

        emit JobApplied(applicationCount, msg.sender, _jobTitle);
    }

    function evaluateCandidate(uint256 _applicationId) public onlyOwner {
        require(applications[_applicationId].exists, "Application not found");

        JobApplication storage application = applications[_applicationId];
        JobseekerProfile memory profile = profiles[application.applicant];

        uint256 score = 0;
        string memory strength = "";
        string memory weakness = "";

        if (verifyCertificate(application.certificateId)) {
            score += 50;
        }

        if (profile.experienceYears >= 2) {
            score += 30;
        } else {
            score += 10;
        }

        bytes memory skillsBytes = bytes(profile.skills);

        if (skillsBytes.length >= 10) {
            score += 20;
        } else {
            score += 5;
        }

        if (score >= 80) {
            strength = "Strong verified certificate, relevant skills, and good experience.";
            weakness = "Minor improvement may be needed depending on job requirements.";
        } else if (score >= 60) {
            strength = "Has verified certificate and acceptable profile.";
            weakness = "Needs more experience or stronger skill evidence.";
        } else {
            strength = "Basic qualification exists.";
            weakness = "Profile does not meet the preferred threshold.";
        }

        application.evaluationScore = score;
        application.strength = strength;
        application.weakness = weakness;

        emit CandidateEvaluated(_applicationId, score, strength, weakness);
    }

    function approveApplication(uint256 _applicationId) public onlyOwner {
        require(applications[_applicationId].exists, "Application not found");

        applications[_applicationId].status = ApplicationStatus.Approved;

        emit ApplicationDecision(_applicationId, ApplicationStatus.Approved);
    }

    function rejectApplication(uint256 _applicationId) public onlyOwner {
        require(applications[_applicationId].exists, "Application not found");

        applications[_applicationId].status = ApplicationStatus.Rejected;

        emit ApplicationDecision(_applicationId, ApplicationStatus.Rejected);
    }

    function getApplication(
        uint256 _applicationId
    )
        public
        view
        returns (
            uint256 applicationId,
            address applicant,
            string memory jobTitle,
            string memory certificateId,
            uint256 evaluationScore,
            string memory strength,
            string memory weakness,
            ApplicationStatus status,
            bool exists
        )
    {
        JobApplication memory application = applications[_applicationId];

        return (
            application.applicationId,
            application.applicant,
            application.jobTitle,
            application.certificateId,
            application.evaluationScore,
            application.strength,
            application.weakness,
            application.status,
            application.exists
        );
    }
}