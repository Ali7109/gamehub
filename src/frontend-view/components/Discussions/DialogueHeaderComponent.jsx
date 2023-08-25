import React from 'react'

const DialogueHeaderComponent = ({userName, time=""}) => {
 
    return (
    <div className="absolute min-w-fit md:w-1/3 border-r-2 border-b-2 border-orange -top-2 p-2 pl-4 pr-4 -left-2 italic text-md flex justify-between items-baseline bg-black rounded-xl text-white">
        <p className='mr-2 font-bold'>{userName}</p>
        {time && 
        <p className='text-sm'>{time}</p>}
    </div>
  )
}

export default DialogueHeaderComponent