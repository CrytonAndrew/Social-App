import React from 'react'
import "./Home.css"

import Navbar from '../../components/Navbar/Navbar'
import Sidebar from "../../components/SideBar/Sidebar"
import Feed from "../../components/Feed/Feed"
import Rightbar from "../../components/RightBar/RightBar"

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}

export default Home
