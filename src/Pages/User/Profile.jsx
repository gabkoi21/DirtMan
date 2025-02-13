import { userProfile } from "../../data/userProfileData";
import UserNav from "../../routes/UserRoutes";

const ProfileContainer = () => {
  return (
    <div className="flex">
      <aside className="md:w-1/5 h-screen">
        <UserNav />
      </aside>
      <main className="flex-1 p-6 md:mt-16">
        <UserProfileDataFetch />
      </main>
    </div>
  );
};

const UserProfileDataFetch = () => {
  const UserProfileData = userProfile;
  return (
    <>
      {UserProfileData.map((user) => (
        <UserProfile key={user.username} userObj={user} />
      ))}
    </>
  );
};

const UserProfile = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, email, password, phone, username, Address } = props.userObj;
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mx-auto bg-white shadow-lg rounded-xl">
        <div className="p-6 space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Name" value={name} />
              <InputField label="Email Address" value={email} />
              <InputField label="Phone Number" value={phone} />
              <InputField label="Home Address" value={Address} />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Account Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Account Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Username" value={username} />
              <InputField label="Password" value={password} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, value } = props;
  return (
    <div className="grid gap-2">
      <label className="text-gray-600 font-medium">{label}</label>
      <input
        id={label}
        value={value}
        readOnly
        className="p-2 mt-1 border w-full border-gray-300 rounded-md focus:ring-0 outline-none focus:outline-none"
      />
    </div>
  );
};

export default ProfileContainer;
