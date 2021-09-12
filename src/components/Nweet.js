import React, { useState } from "react";
import { fire_db } from "fbase";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newToEdit, setNewToEdit] = useState(nweetObj.nweetContents);

  const onClickDelete = async () => {
    const isOKtoDelete = window.confirm("Are you sure to Delete?");
    if (isOKtoDelete) {
      await deleteDoc(doc(fire_db, "nweets", nweetObj.id));
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const onChangingEdit = (e) => {
    const {
      target: { value },
    } = e;
    setNewToEdit(value);
  };

  const onClickEdit = async (e) => {
    console.log("edit!");
    e.preventDefault();
    console.log(newToEdit);
    const isOKtoEdit = window.confirm("Are you sure to Edit?");
    if (isOKtoEdit) {
      await updateDoc(doc(fire_db, "nweets", nweetObj.id), {
        nweetContents: newToEdit,
        lastEditedAt: Date.now(),
      });
    }
    console.log("edit!");
    toggleEdit();
  };

  const cancelEdit = () => {
    toggleEdit();
    setNewToEdit(nweetObj.nweetContents);
  };

  return (
    <div className="m-3">
      {isEditing ? (
        <>
          <form>
            <input
              type="text"
              placeholder={newToEdit}
              value={newToEdit}
              onChange={onChangingEdit}
              required
            ></input>

            <button
              type="submit"
              className="btn btn-secondary btn-sm m-1"
              onClick={onClickEdit}
            >
              {" "}
              <i className="fas fa-check-circle"></i>{" "}
            </button>
            <button
              className="btn btn-secondary btn-sm m-1"
              onClick={cancelEdit}
            >
              {" "}
              <i className="fas fa-window-close"></i>{" "}
            </button>
          </form>
        </>
      ) : (
        <>
          <span className="m-3">
            {" "}
            {nweetObj.nweetContents} _ {nweetObj.creator}
          </span>
          {isOwner && (
            <>
              <button
                className="btn btn-secondary btn-sm m-1"
                onClick={onClickDelete}
              >
                {" "}
                <i className="fas fa-trash"></i>{" "}
              </button>
              <button
                className="btn btn-secondary btn-sm m-1"
                onClick={toggleEdit}
              >
                {" "}
                <i className="fas fa-edit"></i>{" "}
              </button>{" "}
            </>
          )}
          <br></br>
        </>
      )}
    </div>
  );
};

export default Nweet;
