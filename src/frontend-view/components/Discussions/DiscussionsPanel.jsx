import React, { useState } from 'react'
import formatFirestoreTimestamp from '../Functions/calculationFunctions';
import IndividualDiscussionPanel from './SubDiscussion Components/IndividualDiscussionPanel';

const DiscussionsPanel = ({reFetch, discussions, user, gameId}) => {


  return (
    <div className='bg-gray-dark sh border-b-4 md:border-r-4 md:border-b-4 border-orange w-full p-5 pt-10 md:p-10 rounded-xl space-y-8'>
        {discussions.map(discussion => (
        <React.Fragment key={discussion.id}>
                <IndividualDiscussionPanel reFetch={reFetch} user={user} gameId={gameId} discussion={discussion} time={formatFirestoreTimestamp(discussion.timestamp)}/>
        </React.Fragment>
        ))}
    </div>
  )
}

export default DiscussionsPanel