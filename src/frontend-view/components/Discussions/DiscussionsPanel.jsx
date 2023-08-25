import React, { useState } from 'react'
import ReplyComponent from './ReplyComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import DiscussionModal from './DiscussionModal';
import DialogueHeaderComponent from './DialogueHeaderComponent';
import formatFirestoreTimestamp from '../Functions/calculationFunctions';

const DiscussionsPanel = ({discussions, user, gameId}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className='bg-gray-dark sh border-r-4 border-b-4 border-orange w-full p-10 rounded-xl space-y-8'>
        {discussions.map(discussion => 
        {
          const time = formatFirestoreTimestamp(discussion.timestamp);
        
        return  <React.Fragment key={discussion.id}>
                <div className="relative w-full mt-2 min-h-fit text-black bg-white bg-opacity p-3 rounded-xl">
                <DialogueHeaderComponent userName={discussion.userName} time={time}/>
                
                  <div className="h-6 w-full"></div>
                  <div className="">
                    <h1>{discussion.content}</h1>
                  </div>   
                
                  {/* Reply component here */}
                  <ReplyComponent gameId={gameId} user={user}  discussion={discussion}/>
                  <button disabled={discussion.replies.length===0} onClick={handleOpen} className=' bg-orange disabled:bg-opacity-20 mt-2 text-sm rounded-xl border-2 border-black pl-2 pr-5 flex items-center justify-between transition'><FontAwesomeIcon className='mr-2' icon={!open ? faChevronDown : faChevronUp}/>{!open ? discussion.replies.length === 0 ? "No Replies yet":"Show Replies" : "Showing Replies"} ({discussion.replies.length})</button>
                  <DiscussionModal  open={open} handleClose={handleClose} time={time} discussion={discussion}/>
                      
                </div>
            </React.Fragment>
      })}
    </div>
  )
}

export default DiscussionsPanel