import React,{useState,useEffect} from 'react'
import styles from "../liveMatches/LiveMatchData.module.css"
import { IoSearch } from "react-icons/io5";
import { GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiAlignRight } from "react-icons/fi";
import { NavLink , useNavigate} from "react-router-dom"
import axios from 'axios';

const UpCommingMatch = () => {
    const navigate = useNavigate()

    const [matchdata, setmatchdata] = useState([])
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/draftmatches`, {
                    withCredentials: true
                });
                setmatchdata(response.data)

            } catch (error) {
                console.error('API Error:', error);
            }
        }
        fetchData();
    }, [])
  return (
    <div className={styles.maincontainer}>
                <div className={styles.headbarcontainer}>
                    <div className={styles.headBox}>
                        <IoSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Search Live Matches" className={styles.searchInput} />
                        <FiAlignRight className={styles.searchIcon}/>
                    </div>
                </div>
                <div className={styles.navbarBox}>
                    <NavLink to="/" className={styles.navbarLink} >Live Matches</NavLink>
                    <NavLink to="/liveMatches" className={styles.navbarLink} >Upcomming Matches</NavLink>
                    <NavLink to="/" className={styles.navbarLink} >Turnaments</NavLink>
                    <NavLink to="/balance" className={styles.navbarLink} >Account Balance</NavLink>
                    <NavLink to="/login" className={styles.navbarLink} >Logout</NavLink>
                    <NavLink to="/playerlistcreate" className={styles.navbarLink} >Hosting</NavLink>
                </div>
    
                <div className={styles.scrollcontainer}>
                    {/* main container Box Working */}
                    {
                        (matchdata) ?  matchdata
                        .map((item, i) => (
                            <div className={styles.mainBoxContainer} key={i}>
                                <div className={styles.Boxnavber}>
                                    <div className={styles.datecontainer}>Date: NOT YET </div>
                                    <div className={styles.sharecontainer}>share with : <span><FaFacebook className={styles.faicon} /></span><span><FaInstagram className={styles.faicon} /></span><span><FaSquareXTwitter className={styles.faicon} /></span></div>
                                </div>
                                <h2>Samudragarh premirer ligues</h2>
                                <div className={styles.boxBody}>
                                    <div className={styles.leftBox}>
                                        <div className={styles.logo}></div>
                                        <p className={styles.teamname}>{item.teams[0].teamName} (group-A)</p>
                                        <div className={styles.runscontainer}>{item.teams[0].totalRuns}/{item.teams[0].totalWickets}</div>
                                        <p className={styles.overscon}>({item.teams[0].totalOvers}.overs)</p>
                                    </div>
                                    <div className={styles.vs}>V/S</div>
                                    <div className={styles.leftBox}>
                                        <div className={styles.logo1}></div>
                                        <p className={styles.teamname}>{item.teams[1].teamName} (group-B)</p>
                                        <div className={styles.runscontainer}>{item.teams[1].totalRuns}/{item.teams[1].totalWickets}</div>
                                        <p className={styles.overscon}>({item.teams[1].totalOvers}.overs)</p>
                                    </div>
                                </div>
                                {/* <button onClick={}>VIEW DETAILS</button> */}
                            </div>
                        )) : <h1>Loading...</h1>
    
                    }
                    {/*  Box Working END */}
                </div>
            </div>
  )
}

export default UpCommingMatch