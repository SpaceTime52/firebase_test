import React from "react";
import { appAuth } from "fbase";
import { signOut } from "@firebase/auth";

const Profile = () => {
  const authSignOut = () => {
    console.log("signout!");
    signOut(appAuth);
  };

  return (
    <>
      <p className="m-5">Profile</p>

      <button
        name="signout"
        className="btn btn-primary btn-lg px-4 gap-3 m-2"
        onClick={authSignOut}
      >
        Sign Out
      </button>
    </>
  );
};

export default Profile;
