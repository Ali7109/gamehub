// AddDiscussionForm.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../Firebase/Firebase";
import { addDiscussion, fetchDiscussions } from "./HelperFetch";
import DiscussionsPanel from "./DiscussionsPanel";

const AddDiscussionForm = ({ gameId, userId }) => {
  const [newDiscussion, setNewDiscussion] = useState("");
  const [discussions, setDiscussions] = useState(null);
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    }
  });
  const submitDiscussion = async () => {
    if (newDiscussion.trim() === "") return;
    try {
      addDiscussion(db, gameId, newDiscussion, userId, user.displayName).then(() => {
        console.log("Data written")
        setNewDiscussion("")
      });
    } catch (error) {
      console.error("Error adding Discussion:", error);
    }
  };
  useEffect(() => {
    fetchDiscussions(db, gameId ).then(data => 
      setDiscussions(data));
  }, [])
  
  return (
    <>
    <div className="bg-gray-dark rounded-lg flex">
      <textarea
      className="w-full rounded-l-xl p-2"
        value={newDiscussion}
        onChange={(e) => setNewDiscussion(e.target.value)}
      />
      <button className="rounded-r-xl bg-orange font-bold p-2" onClick={submitDiscussion}>Add Discussion</button>
    </div>
    <div className="mt-5 bg-black rounded-xl pt-5 pl-2 text-white">
      {discussions ? 
        <DiscussionsPanel discussions={discussions}/>
      :
      <div className="w-full flex">
        <p className="m-auto p-5 bg-white bg-opacity-20 rounded-xl">No discussions for this title yet, start one now!</p>
      </div>  
    }
    </div>
    </>
  );
};

export default AddDiscussionForm;
