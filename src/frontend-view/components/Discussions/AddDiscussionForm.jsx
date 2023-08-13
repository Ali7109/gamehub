// AddDiscussionForm.js
import React, { useState } from "react";
import { db } from "../../../Firebase/Firebase";
import { serverTimestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

const AddDiscussionForm = ({ gameId, userId }) => {
  const [newDiscussion, setNewDiscussion] = useState("");

  const submitDiscussion = async () => {
    if (newDiscussion.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "discussions"), {
        title: "Second one",
        content: "This worked, ive added view the app",
        timestamp: serverTimestamp(),
        gameId,
        userId,
      })
      console.log("Doc written, check firestore for:", docRef.id)
      
      setNewDiscussion("");
    } catch (error) {
      console.error("Error adding Discussion:", error);
    }
  };

  return (
    <div className="bg-gray-dark rounded-lg flex">
      <textarea
      className="w-full rounded-l-xl p-2"
        value={newDiscussion}
        onChange={(e) => setNewDiscussion(e.target.value)}
      />
      <button className="rounded-r-xl bg-orange font-bold p-2" onClick={submitDiscussion}>Add Discussion</button>
    </div>
  );
};

export default AddDiscussionForm;
