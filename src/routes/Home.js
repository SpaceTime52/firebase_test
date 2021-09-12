import React, { useState } from "react";
import { appAuth } from "fbase";
import { signOut } from "@firebase/auth";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const authSignOut = () => {
    console.log("signout!");
    signOut(appAuth);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNweet(value);
    console.log(nweet);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(nweet);
  };

  return (
    <>
      <p className="m-5">Home</p>

      <div className="form-group">
        <input
          type="text"
          className="form-control m-4"
          name=""
          id=""
          maxLength={120}
          placeholder="What's on Your Mind?"
          onChange={onChange}
          style={{ width: 96 + "%" }}
        />

        <input
          type="submit"
          className="btn btn-primary btn-lg px-4 gap-3 m-2"
          value="Nweet Now"
          onClick={onSubmit}
        />
      </div>

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

export default Home;
