// src/components/UserProfile/UserProfile.jsx
import Header from "../components/UserProfile/Header";
import BasicInfo from "../components/UserProfile/BasicInfo";
import AboutSection from "../components/UserProfile/AboutSection";
import ActivityStats from "../components/UserProfile/ActivityStatus";

const UserProfile = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Header user={user} />
      <BasicInfo user={user} />
      <AboutSection user={user} />
      <ActivityStats user={user} />
    </div>
  );
};

export default UserProfile;