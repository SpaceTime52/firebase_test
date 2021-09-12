import React, { useEffect, useState } from "react";
import { appAuth, fire_db } from "fbase";
import { signOut } from "@firebase/auth";
import { collection, addDoc, onSnapshot } from "@firebase/firestore";
import Nweet from "components/Nweet";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweetsList, setNweetsList] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(fire_db, "nweets"),
      (snapshot) => {
        const nweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweetsList(nweetsArray);
      },
      (error) => {
        // ...
      }
    );
  }, []);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(fire_db, "nweets"), {
        nweetContents: nweet,
        createdAt: Date.now(),
        creator: appAuth.currentUser.email,
        creatorID: appAuth.currentUser.uid,
        creatorPhto: appAuth.currentUser.photoURL,
      });
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("tweethere").value = "";
      //   window.location.reload();
    } catch (e) {
      console.error("Error adding doc: ", e);
    }
  };

  return (
    <>
      <p className="m-5">Home</p>

      <form className="form-group">
        <input
          type="text"
          className="form-control m-4"
          name=""
          id="tweethere"
          maxLength={120}
          placeholder="What's on Your Mind?"
          onChange={onChange}
          style={{ width: 96 + "%" }}
        />

        <div>
          {nweetsList.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorID === appAuth.currentUser.uid}
            />
          ))}
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-lg px-4 gap-3 m-2"
          value="Nweet Now"
          onClick={onSubmit}
        />
      </form>

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
