import React from 'react'

const DiscussionsPanel = ({discussions}) => {
  return (
    <div className='border border-white w-full p-10 rounded-xl'>
        {discussions.map(discussion => (
            <div className="w-full m-3 mt-2">   
                <h1>{discussion.content}</h1>
                <p>{discussion.userName}</p>
            </div>
        ))}
    </div>
  )
}

export default DiscussionsPanel