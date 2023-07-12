import React from 'react'

const ProfilePage = () => {
  return (
    <div className='rounded-xl w-full flex-col max-h-fit bg-gray-dark'>
        <div className="w-full rounded-t-xl flex items-center h-52 bg-orange">
            <div className="w-full h-44 bg-stock-coverphoto bg-center bg-cover p-5">
                <div className="bg-stock-profpic bg-center bg-contain flex-1 m-5 h-24 w-24 rounded-full">
                </div>
            </div>
        </div>
        <div className="flex-col p-10 space-y-3 text-white"> 
            <div className="w-full flex justify-between">
                <h1 className='text-3xl'>ProfileName</h1>
                <h2>ProfileTagline</h2>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est vitae, labore inventore unde voluptatem corporis?</p>
        </div>
    </div>
  )
}

export default ProfilePage