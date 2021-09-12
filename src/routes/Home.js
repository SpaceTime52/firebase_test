import React from "react";
import { appAuth } from "fbase";
import { signOut } from "@firebase/auth";

const Home = () => {
  const authSignOut = () => {
    console.log("signout!");
    signOut(appAuth);
  };

  return (
    <button
      name="signout"
      className="btn btn-primary btn-lg px-4 gap-3 m-2"
      onClick={authSignOut}
    >
      Sign Out
    </button>
  );
};

export default Home;
