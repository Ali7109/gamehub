// AddDiscussionForm.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../Firebase/Firebase";
import { addDiscussion, fetchDiscussions } from "../../../controller/HelperFetch";
import DiscussionsPanel from "./DiscussionsPanel";
import { cardClasses } from "@mui/material";

const AddDiscussionForm = ({ gameId, userId, user }) => {
  const [val, setVal] = useState("");
  const [discussions, setDiscussions] = useState(null);
  // const [user, setUser] = useState(null);
  const [invalidMessage, setInvalidMessage] = useState(false);

  const showError = () => {
    setInvalidMessage(true);

    setTimeout(() => {
      setInvalidMessage(false);
    }, 2000);
  };
  
  const submitDiscussion = async () => {
    if (val.trim() === "") {
      showError()
      return
    }
    if (!user) {
      return;
    }
    try {
      addDiscussion(db, gameId, val, userId, user.displayName).then(() => {
        console.log("Data written")
        setVal("");
        reFetch();
      });
    } catch (error) {
      console.error("Error adding Discussion:", error);
    }
  };
  
  useEffect(() => {
    fetchDiscussions(db, gameId ).then(setDiscussions)
  }, [])

  const reFetch = () => {
    fetchDiscussions(db, gameId).then(setDiscussions)
  }

  const handleDiscussionChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setVal(value);
  }
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  return (
    <>
    <div className={`bg-gray-dark rounded-lg md:flex transition ${isFocused ? "expanded" : "expanding"} justify-center items-center`}
      >
      <textarea
      className="w-full rounded-t-xl md:rounded-none md:rounded-l-xl p-2 resize-none h-full"
      value={val}
      onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleDiscussionChange}
      />
      <button className="rounded-b-xl md:rounded-none md:rounded-r-xl h-full bg-orange font-bold w-full md:min-w-fit md:w-1/2 p-2 text-sm" onClick={() => submitDiscussion()}>Start Discussion</button>
    </div>
    <div className="flex h-12 border mt-5">
      {invalidMessage &&
      <h1 className=" text-rose-400 m-auto font-yb font-bold ">Please add a valid message!</h1>
      }
    </div>
    <div className="relative w-full">
      <h1 className="absolute left-1/2 -translate-x-1/2 top-3 md:left-10 md:top-0 md:-translate-x-0 text-white font-bold text-center  text-4xl md:text-6xl linear-ore">Discussions</h1>
    </div>
    <div className="mt-5 bg-black rounded-xl pt-5 md:pl-2 text-white">
      {!discussions ? 
      <div className="w-full flex">
        <p className="m-auto p-5 bg-white bg-opacity-20 rounded-xl">No discussions for this title yet, start one now!</p>
      </div>  
      : discussions.length!==0 ? 
          <DiscussionsPanel reFetch={reFetch} gameId={gameId} discussions={discussions} user={user}/>
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
