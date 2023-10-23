import React from 'react'
import PageItem from './PageItem'

const PageList = () => {

    const pages = [
        {
            label: "Home",
            path: "/"
        },{
            label: "About",
            path: "/about"
        },{
            label: "Profile",
            path: "/profile"
        },
        // {
        //     label: "Store",
        //     path: "/stores"
        // },
        {
            label: "Search",
            path: "/search"
        }
    ]
  return (
    <ul>
        {pages.map((page, index) => (
            <PageItem key={index} label={page.label} path={page.path} />
        ))}
    </ul>
  )
}

export default PageList