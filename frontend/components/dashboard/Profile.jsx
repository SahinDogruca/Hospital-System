import React from "react";
import { useUser } from "../../context/UserContext";

const Profile = () => {
  const { user, userType } = useUser();
  return (
    <div className="profile">
      <div className="row">
        <div className="col-lg-4 col align-items-center">
          <div className="profile-image">
            <img src="https://i.pravatar.cc/250" alt="profile" />
          </div>
        </div>
        <div className="col-lg-8 col align-items-center">
          <div className="profile-details">
            <h3>Name: {user.name}</h3>
            <p>tc: {user.tc}</p>
            {userType === "doctors" && <p>specialty: {user.specialty}</p>}
            <p>password: {user.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
