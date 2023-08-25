import React from 'react'
import formatFirestoreTimestamp from '../Functions/calculationFunctions';
import IndividualDiscussionPanel from './SubDiscussion Components/IndividualDiscussionPanel';

const DiscussionsPanel = ({discussions, user, gameId}) => {

  return (
    <div className='bg-gray-dark sh border-r-4 border-b-4 border-orange w-full p-10 rounded-xl space-y-8'>
        {discussions.map(discussion => (
        <React.Fragment key={discussion.id}>
                <IndividualDiscussionPanel user={user} gameId={gameId} discussion={discussion} time={formatFirestoreTimestamp(discussion.timestamp)}/>
        </React.Fragment>
        ))}
    </div>
  )
}

export default DiscussionsPanel