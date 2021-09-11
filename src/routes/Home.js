import React, { useState } from "react";
import { appAuth, fire_db } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "@firebase/auth";

const Home = () => {
  const signOut = () => {
    console.log("signout!");
    signOut(appAuth);
  };

  return (
    <button
      name="signout"
      className="btn btn-primary btn-lg px-4 gap-3 m-2"
      onClick={signOut}
    >
      signOut
    </button>
  );
};

export default Home;
