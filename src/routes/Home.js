import React, { useEffect, useState } from "react";
import { appAuth, fire_db, fire_storage } from "fbase";
import { signOut } from "@firebase/auth";
import { collection, addDoc, onSnapshot } from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweetsList, setNweetsList] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [fileLink, setFileLink] = useState("")

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
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(fire_db, "nweets"), {
        nweetContents: nweet,
        createdAt: Date.now(),
        creator: appAuth.currentUser.email,
        creatorID: appAuth.currentUser.uid,
        creatorPhoto: appAuth.currentUser.photoURL,
        uploadedPhotoURL : fileLink
      });
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("tweethere").value = "";
      //   window.location.reload();
      setFileLink(null)

    } catch (e) {
      console.error("Error adding doc: ", e);
    }
  };

  const onFileChange = (event) => {
    try {
      const {
        target: { files },
      } = event;

      const theFile = files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = (finishedEvent) => {
        setAttachment(finishedEvent.target.result);
      };
      fileReader.readAsDataURL(theFile);
    } catch (e) {
      console.error("Error adding doc: ", e);
    }
  };

  const clearAttachment = () => {
    setAttachment(null);
  };

  const onFileUpload = async () => {
    try {
    const fileRef = ref(fire_storage, `${appAuth.currentUser.uid}/${uuidv4()}`);
    await uploadString(fileRef, attachment, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        alert('사진 업로드가 완료되었습니다.')
        setFileLink(downloadURL)
        setAttachment(null)
      });
    });
  } catch (e){
    console.error("Error on FileUploadc: ", e);

  }
  };

  return (
    <>
      <p className="m-5">Home</p>

      <div className="input-group mb-2 mx-auto" style={{ width: 60 + "%" }}>
        <input
          type="file"
          className="form-control"
          id="inputGroupFile01"
          onChange={onFileChange}
        />

        <input
          type="submit"
          className="btn btn-outline-secondary"
          value="upload File"
          onClick={onFileUpload}
        />
      </div>

      <form className="input-group mb-5 mx-auto" style={{ width: 60 + "%" }}>
        <input
          type="text"
          className="form-control"
          name=""
          id="tweethere"
          maxLength={120}
          placeholder="What's on Your Mind?"
          onChange={onChange}
        />
        <input
          type="submit"
          className="btn btn-outline-secondary"
          value="Nweet Now"
          onClick={onSubmit}
        />
      </form>

      {attachment && (
        <div className="container">
          <img
            src={attachment}
            width="200px"
            heigh="auto"
            style={{ position: "static", zIndex: 92 }}
            alt="preview"
          />{" "}
          <button
            className="btn btn-secondary btn-sm m-1"
            onClick={clearAttachment}
            style={{ position: "relative", left: -30, zIndex: 99 }}
          >
            {" "}
            <i className="fas fa-window-close"></i>{" "}
          </button>{" "}
        </div>
      )}

      <div>
        {nweetsList.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorID === appAuth.currentUser.uid}
          />
        ))}
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
