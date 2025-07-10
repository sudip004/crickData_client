import React, { useEffect, useState } from 'react'
import styles from './LiveMatchData.module.css'
import { IoSearch } from "react-icons/io5";
import { GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiAlignRight } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

import img0 from '../../assets/csk.jpg'
import img1 from '../../assets/kkr.jpg'
import img2 from '../../assets/mumbai.png'
import img3 from '../../assets/rcb.jpg'
import img4 from '../../assets/RR.jpg'

const LiveMatchData = () => {

    const imagApi = [
        img0,
        img1,
        img2,
        img3,
        img4
    ]

    const navigate = useNavigate()

    const [matchdata, setmatchdata] = useState([])
    const { user, setUser } = useAppContext() // Import user state from context
    console.log("user data in live match data", user);
    const [valID,setValID] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                if (user.length === 0) {
                    const ami = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/me`, {
                        withCredentials: true
                    });
                    console.log("ami iiiiiii data in live match data", ami.data);
                    setValID(ami.data._id)
                }
                
            } catch (error) {
                console.error('API Error:', error);
            }finally{
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/findlivematches`, {
                    withCredentials: true
                });
                setmatchdata(response.data)
            }
        }
        fetchData();
    }, [])

    const handeluserCheck = async (matchId, streamId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/checkuser`, {
                withCredentials: true // send cookies/session if needed
            });
            if (response.status === 200) {
                console.log("funnnnnnnnnnnnnnnnnnxxxxxxxxXXXXx response");
                console.log("User is authenticated, navigating to match details", matchId);
                navigate(`/home-matchdelails/${matchId}`, { state: { streamId } });
            }else{
                navigate('/')
            }
        } catch (error) {
            console.error('User not authenticated:', error);
             console.log("hore krishna");
                console.log("User is authenticated, navigating to match details", matchId);
                navigate(`/home-matchdelails/${matchId}`, { state: { streamId } });
        }
    };

    const handelGoingHosting = (matchID) => {
        navigate(`/hosting/${matchID}`) // Navigate to the hosting page with match ID;
    }
    console.log("match data in live match data", matchdata);

    return (
        <div className={styles.maincontainer}>
            <div className={styles.headbarcontainer}>
                <div className={styles.headBox}>
                    <IoSearch className={styles.searchIcon} />
                    <input type="text" placeholder="Search Live Matches" className={styles.searchInput} />
                    <FiAlignRight className={styles.searchIcon} />
                </div>
            </div>
            <div className={styles.navbarBox}>
                <NavLink to="/" className={styles.navbarLink} >Live Matches</NavLink>
                <NavLink to="/upcomming" className={styles.navbarLink} >complete Matches</NavLink>
                <NavLink to="/" className={styles.navbarLink} >Turnaments</NavLink>
                <NavLink to="/balance" className={styles.navbarLink} >Account Balance</NavLink>
                <NavLink to="/login" className={styles.navbarLink} >Login</NavLink>
                <NavLink className={styles.navbarLink} onClick={async () => {
                    try {
                        await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/logout`, {}, { withCredentials: true });
                        setUser([]); // Clear user data in context
                        navigate('/login'); // Redirect to login page
                    } catch (error) {
                        console.error('Logout error:', error);
                    }
                }
                }>
                    LogOut
                </NavLink>
                <NavLink to="/playerlistcreate" className={styles.navbarLink} >Hosting</NavLink>
            </div>

            <div className={styles.scrollcontainer}>
                {/* main container Box Working */}
                {
                    (matchdata) ? matchdata
                        .map((item, i) => (
                            <div className={styles.mainBoxContainer} key={i}>
                                <div className={styles.Boxnavber}>
                                    <div className={styles.datecontainer}>Date: Today <span className={styles.livebox}>{item.status}</span></div>
                                    <div className={styles.sharecontainer}>share with : <span><FaFacebook className={styles.faicon} /></span><span><FaInstagram className={styles.faicon} /></span><span><FaSquareXTwitter className={styles.faicon} /></span></div>
                                </div>
                                <h2>Samudragarh premirer ligues</h2>
                                <div className={styles.boxBody}>
                                    <div className={styles.leftBox}>

                                         {/* img purpose */}
                                        <img className={styles.logo} src={imagApi[Math.floor(Math.random() * 5)]}/>
                                        <p className={styles.teamname}>{item.teams[0].teamName} (group-A){item.teams[0].isBatting ? <GiCricketBat className={styles.icon} /> : <BiSolidCricketBall className={styles.icon} />}</p>
                                        <div className={styles.runscontainer}>{item.teams[0].totalRuns}/{item.teams[0].totalWickets}</div>
                                        <p className={styles.overscon}>({item.teams[0].totalOvers}.overs)</p>
                                    </div>
                                    <div className={styles.vs}>V/S</div>
                                    <div className={styles.leftBox}>
                                        <img className={styles.logo1} src={imagApi[Math.floor(Math.random() * 5)]}/>
                                        <p className={styles.teamname}>{item.teams[1].teamName} (group-B){item.teams[1].isBatting ? <GiCricketBat className={styles.icon} /> : <BiSolidCricketBall className={styles.icon} />}</p>
                                        <div className={styles.runscontainer}>{item.teams[1].totalRuns}/{item.teams[1].totalWickets}</div>
                                        <p className={styles.overscon}>({item.teams[1].totalOvers}.overs)</p>
                                    </div>
                                </div>
                                <button onClick={() => { (item.createdBy === user?.user?._id ? user?.user?._id : valID) ? handelGoingHosting(item._id) : handeluserCheck(item._id, item.streamId) }}>VIEW DETAILS</button>
                            </div>
                        )) : <h1>Loading...</h1>

                }
                {/*  Box Working END */}
            </div>
        </div>
    )
}

export default LiveMatchData
