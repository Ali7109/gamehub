import React, { useState } from 'react'
import DialogueHeaderComponent from '../DialogueHeaderComponent';
import ReplyComponent from '../ReplyComponent';
import DiscussionModal from '../DiscussionModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


const IndividualDiscussionPanel = ({ reFetch, gameId, discussion, time, user}) => {
    
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="relative w-full mt-2 min-h-fit text-black bg-white bg-opacity p-3 rounded-xl">
        <DialogueHeaderComponent userName={discussion.userName} time={time}/>
        <div className="h-6 w-full"></div>
        <div className="">
          {/* {user.uid === discussion.userId 
            && 
            <p>
              Owned
            </p>
          } */}

            <h1>{discussion.content}</h1>
        </div>   
                
        {/* Reply component here */}
        <ReplyComponent reFetch={reFetch} gameId={gameId} user={user}  discussion={discussion}/>
        {
          discussion.replies &&
          <button disabled={discussion.replies.length===0} onClick={handleOpen} className=' bg-orange disabled:bg-opacity-20 mt-2 text-sm rounded-xl border-2 border-black pl-2 pr-5 flex items-center justify-between transition'><FontAwesomeIcon className='mr-2' icon={!open ? faChevronDown : faChevronUp}/>{!open ? discussion.replies.length === 0 ? "No Replies yet":"Show Replies" : "Showing Replies"} ({discussion.replies.length})</button>
        }
        <DiscussionModal  open={open} handleClose={handleClose} time={time} discussion={discussion}/>
                      
    </div>
  )
}

export default IndividualDiscussionPanel