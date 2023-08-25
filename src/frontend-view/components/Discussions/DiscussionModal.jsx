import { Modal } from '@mui/material'
import React from 'react'
import ReplyDisplayComponent from './SubReply Components/ReplyDisplayComponent'
import DialogueHeaderComponent from './DialogueHeaderComponent'

const DiscussionModal = ({discussion, open, handleClose, time}) => {
    return (
    <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby={"modal-modal-" + discussion.id}
            aria-describedby="modal-modal-description"
          >
            <div className='transition p-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-5/6 md:w-3/6 md:h-5/6 rounded-xl bg-gray-dark sh'>
                    <DialogueHeaderComponent userName={discussion.userName} time={time} />
                <div className="rounded-xl bg-white p-5 pl-2 pr-2">
                    {discussion.content}
                </div>
                <h2 className='linear-ore font-semibold mt-4 text-center text-lg'>Replies</h2>
                <div className=" h-4/6 p-5 overflow-auto custom-scroll space-y-4">
                {discussion.replies ? 
                    discussion.replies.map((reply, index) => (
                        <ReplyDisplayComponent reply={reply} key={index}/>
                    ))
                    :   
                        <div className="w-full flex mt-10">
                            <p className="m-auto p-5 bg-white text-white bg-opacity-20 rounded-xl">No replies to this discussion yet, start one now!</p>
                        </div>     
                }
                </div>
              </div>
          </Modal>
  )
}

export default DiscussionModal