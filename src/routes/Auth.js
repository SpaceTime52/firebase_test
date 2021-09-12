import React, { useState } from "react";
import { appAuth } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "@firebase/auth";
// import { collection, addDoc } from "@firebase/firestore";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  console.log(
    "currentUser:",
    appAuth.currentUser ? appAuth.currentUser.email : appAuth.currentUser
  );
  console.log("---------");

  // const onAdd = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const docRef = await addDoc(collection(fire_db, "clients"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

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

    console.log("newAccount:", newAccount);

    try {
      if (newAccount) {
        //create account
        await createUserWithEmailAndPassword(appAuth, email, password);
      } else {
        //login
        await signInWithEmailAndPassword(appAuth, email, password);
      }
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  };

  const onSocialLoginClick = async (event) => {
    console.log(event.target.name);

    const {
      target: { name },
    } = event;

    let provider;

    if (name === "google") {
      console.log("google provider!");
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      console.log("github provider!");
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(appAuth, provider)
      .then((result) => {
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        console.log(provider.providerId, " Signed In");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        // const email = error.email;
        // const credential = GithubAuthProvider.credentialFromError(error);

        console.log(errorMessage);
        // ...
      });
  };

  return (
    <div className="col-lg-6 mx-auto">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="form-control mb-3 mt-5"
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

        <input
          type="submit"
          className="btn btn-primary btn-lg px-4 gap-3 m-2"
          value={newAccount ? "Create Account" : "Log In"}
        />
      </form>

      <span onClick={toggleAccount}>
        <a href="#">{newAccount ? "Sign in here" : "Create Account"}</a>
      </span>

      <div>
        <button
          name="google"
          className="btn btn-primary btn-lg px-4 gap-3 m-2"
          onClick={onSocialLoginClick}
        >
          <i className="fab fa-google m-2"></i>Continue with Google
        </button>
        <button
          name="github"
          className="btn btn-primary btn-lg px-4 gap-3 m-2"
          onClick={onSocialLoginClick}
        >
          <i className="fab fa-github m-2"></i> Continue with Github
        </button>
      </div>

      <span>{error}</span>
    </div>
  );
};

export default Auth;
