import React, { useState } from "react";
import { appAuth } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, serNewAccount] = useState(false);

  console.log("current:", appAuth.currentUser);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(appAuth, email, password);
      } else {
        //login
        data = await signInWithEmailAndPassword(appAuth, email, password);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="col-lg-6 mx-auto">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          required
          value={email}
          onChange={onChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          required
          value={password}
          onChange={onChange}
        />

        <input type="submit" className="btn btn-primary btn-lg px-4 gap-3 m-2" value={newAccount ? "Create Account" : "Log In"} />
      </form>

      <div>
        <button className="btn btn-primary btn-lg px-4 gap-3 m-2" >Continue with Google</button>
        <button className="btn btn-primary btn-lg px-4 gap-3 m-2" >Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
