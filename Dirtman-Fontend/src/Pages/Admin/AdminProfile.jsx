import { useState } from "react";
import { userProfile } from "../../data/userProfileData";

// Main Container Component

// Navigation Buttons Component
const PageNavButtons = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className="flex gap-4 mt-5">
        {/* This is the profile button */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-3 py-1 rounded-md hover:bg-gray-100 ${
            activeTab === "profile" ? "bg-green-700 text-white" : "bg-gray-100"
          }`}
        >
          Profile
        </button>
        {/* This is the security button */}
        <button
          onClick={() => setActiveTab("security")}
          className={`px-3 py-1 rounded-md hover:bg-gray-100 ${
            activeTab === "security" ? "bg-green-700 text-white" : "bg-gray-100"
          }`}
        >
          Security
        </button>
      </div>
    </>
  );
};

// Reusable Input Field Component
const UserInputField = ({ label, value, isEditing, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-gray-600 font-light font-roboto block mb-2">
        {label}
      </label>
      <input
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!isEditing}
        className={`p-2 w-full border border-gray-300 rounded-md focus:border-green-700 focus:ring-0 outline-none focus:outline-none transition-colors duration-200 ${
          !isEditing ? "bg-gray-50" : "bg-white"
        }`}
      />
    </div>
  );
};

// User Profile Component
const UserProfile = ({ userObj, isEditing, onUpdateField, handleSave }) => {
  const {} = userObj;
  return (
    <div className="mt-6 w-full">
      <div className="bg-white rounded-xl">
        <div>
          <div className="space-y-4">
            <UserInputField
              label="Name"
              value={userObj.name}
              isEditing={isEditing}
              onChange={(value) => onUpdateField("name", value)}
            />
            <UserInputField
              label="Email Address"
              value={userObj.email}
              isEditing={isEditing}
              onChange={(value) => onUpdateField("email", value)}
            />
            <UserInputField
              label="Phone Number"
              value={userObj.phone}
              isEditing={isEditing}
              onChange={(value) => onUpdateField("phone", value)}
            />
            <UserInputField
              label="Home Address"
              value={userObj.Address}
              isEditing={isEditing}
              onChange={(value) => onUpdateField("Address", value)}
            />
            <UserInputField
              label="Role"
              value={userObj.role}
              isEditing={false}
              onChange={() => {}}
            />
          </div>

          {isEditing && (
            <button className="px-6 mt-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors duration-200">
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Profile Information Component
const ProfileInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userProfile[0]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData(userProfile[0]);
  };

  const handleUpdateField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="mt-5 bg-white shadow-xl py-10 px-8 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-black text-2xl font-bold">Profile Information</h3>
          <span className="text-gray-500 text-sm block">
            Update your account profile information here.
          </span>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors duration-200"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span className="bg-gray-100 w-16 h-16 rounded-full text-gray-600 font-medium flex items-center justify-center text-xl">
          {profileData.name.charAt(0)}
        </span>
      </div>

      <UserProfile
        userObj={profileData}
        isEditing={isEditing}
        onUpdateField={handleUpdateField}
        handleSave={handleSave}
      />
    </div>
  );
};

// Update Password Information Component
const UpdatePasswordInformation = () => {
  return (
    <div className="mt-5 bg-white shadow-xl py-10 px-8 rounded-lg border border-gray-200">
      <div>
        <h3 className="text-black text-2xl font-bold">Security Settings</h3>
        <span className="text-gray-500 text-sm block">
          Manage your account security settings here.
        </span>
      </div>
      <UpdatePassword />
    </div>
  );
};

// Update Password Component
const UpdatePassword = () => {
  return (
    <div className="mt-6 w-full">
      <div className="bg-white rounded-xl">
        <div className="space-y-4">
          <div className="mb-4">
            <label className="text-gray-600 font-light font-roboto block mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="p-2 w-full border border-gray-300 rounded-md focus:border-green-700  focus:ring-0 outline-none focus:outline-none transition-colors duration-200"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 font-light font-roboto block mb-2">
              New Password
            </label>
            <input
              type="password"
              className="p-2 w-full border border-gray-300 rounded-md focus:border-green-700  focus:ring-0 outline-none focus:outline-none transition-colors duration-200"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 font-light font-roboto block mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="p-2 w-full border border-gray-300 rounded-md focus:border-green-700  focus:ring-0 outline-none focus:outline-none transition-colors duration-200"
            />
          </div>

          <button className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors duration-200">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminProfileContainer = () => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="flex">
      <aside className="md:w-[20%] lg:w-[23%] h-screen " />
      <main className="md:w-[80%] lg:w-[90%] w-full px-3 mt-20">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Admin Profile</h2>
        </div>

        {/* This is the button compnent */}
        <PageNavButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Show different components based on active tab */}
        {activeTab === "profile" && <ProfileInformation />}
        {activeTab === "security" && <UpdatePasswordInformation />}
      </main>
    </div>
  );
};

export default AdminProfileContainer;
