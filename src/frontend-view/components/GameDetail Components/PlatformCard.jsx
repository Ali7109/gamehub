import React, { useState, useEffect } from 'react'

const PlatformCard = ({platform}) => {
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        let url = "";
        let name = platform.name.toLowerCase();
        if(name.includes("playstation")){
            url = require("../../images/psLogo.png");
        } else if(name.includes("xbox")){
            url = require("../../images/xboxLogo.png");
        } else if(name.includes("pc") || name.includes("macos")){
            url = require("../../images/pcLogo.png")
        } else if(name.includes("mobile")){
            url = "";
        } else {
            url = require("../../images/nintendoLogo.png")
        }
        setImgUrl(url)
    }, [])
    
  return (
    <div className="flex min-h-fit min-w-fit items-center mr-2 " key={platform.id}>
        {imgUrl && 
         <img className={imgUrl.includes("nintendoLogo") ? 'h-9 w-12' : 'h-6 w-6'} src={imgUrl} alt={`${platform.name} icon`} />}
         <h2 className='font-bold transition  max-w-fit bg-opacity-20 p-2 rounded-xl'>{platform.name}</h2>
    </div>
  )
}

export default PlatformCard