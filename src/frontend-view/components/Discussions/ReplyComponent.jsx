import React, {useState} from 'react'
import { addReply, fetchDiscussions } from './HelperFetch';
import { db } from '../../../Firebase/Firebase';

const ReplyComponent = ({discussion, user, gameId}) => {

    const [val, setVal] = useState("");

    const handleDiscussionChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setVal(value);
    }
    const submitReply = async () => {
        if (val.trim() === "") {
            // showError()
            alert("Please enter valid text in reply")
            return
          }
        if (!user) {
          return;
        }
        // console.log(discussion)
        // return
        try {
         addReply(db, gameId, discussion.id, val, discussion.userId, discussion.userName).then(() => {
            console.log("Data written")
            setVal("");
            // fetchDiscussions(db, gameId ).then(setDiscussions);
          });
        } catch (error) {
          console.error("Error adding Discussion:", error);
        }
      };
    return (
        <div className="flex justify-center  h-8 mt-4">
            <textarea className="w-full flex text-white bg-black rounded-l-xl pt-1 pl-2 resize-none" value={val} onChange={handleDiscussionChange}
            />
            <button className="rounded-r-xl bg-orange font-semibold pl-6 pr-6 border-2 border-l-0 border-orange hover:border-black  transition" onClick={() => submitReply()}>reply</button>
        </div>
  )
}

export default ReplyComponent