import React, {useState} from 'react'
import { addReply } from '../../../controller/HelperFetch';
import { db } from '../../../Firebase/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

const ReplyComponent = ({discussion, user, gameId}) => {

    const [val, setVal] = useState("");
    const [invalidMessage, setInvalidMessage] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // State to track focus
                
    console.log("In reply component:",user)
    const handleDiscussionChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setVal(value);
    }

    const showError = () => {
        setInvalidMessage(true);
        setTimeout(() => {
          setInvalidMessage(false);
        }, 2000);
    };

    const submitReply = async () => {
        if (val.trim() === "") {
            showError();
            return
          }
        if (!user) {
          return;
        }
        try {
         addReply(db, gameId, discussion.id, val, user.uid, user.displayName).then(() => {
            console.log("Data written")
            setVal("");
            // fetchDiscussions(db, gameId ).then(setDiscussions);
          });
        } catch (error) {
          console.error("Error adding Discussion:", error);
        }
      };
      return (
          <div className={`flex justify-center h-8 mt-4 ${isFocused ? "expanded" : "expanding"}`}>
              <textarea className={invalidMessage ? "w-full flex text-white border-4 bg-black border-red-700 transition rounded-l-xl pl-2 resize-none" : "w-full flex text-white border-4 border-black bg-black rounded-l-xl  pl-2 resize-none"} value={val} onChange={handleDiscussionChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              />
              <button className="rounded-r-xl bg-orange font-semibold border-2 border-l-0 flex items-center border-orange hover:border-black pl-4 pr-4 transition" onClick={() => submitReply()}>reply<FontAwesomeIcon className='ml-2' icon={faReply}/></button>
          </div>
  )
}

export default ReplyComponent