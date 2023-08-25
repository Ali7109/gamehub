import React from 'react'
import DialogueHeaderComponent from '../DialogueHeaderComponent'
import formatFirestoreTimestamp from '../../Functions/calculationFunctions'

const ReplyDisplayComponent = ({reply}) => {

  return (
    <div className="bg-white rounded-xl p-2 pt-10 relative custom-scroll">
        <DialogueHeaderComponent userName={reply.userName} time={formatFirestoreTimestamp(reply.timestamp)}/>
        <div className="max-h-24 overflow-auto">
        {reply.content}
        </div>
    </div>

  )
}

export default ReplyDisplayComponent