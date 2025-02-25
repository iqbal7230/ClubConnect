// src/components/UserProfile/UserProfile.jsx
import Header from "./Header";
import BasicInfo from "./BasicInfo";
import AboutSection from "./AboutSection";
import ActivityStats from "./ActivityStatus";

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