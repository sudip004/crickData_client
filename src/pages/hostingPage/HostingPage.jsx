import React, { useEffect, useState } from 'react'
import styles from './HostingPage.module.css'
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { cricketMatchh } from "../../utils/Api"
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import { useParams } from "react-router-dom"
import Loading from '../../utils/lodding/Loading';


const HostingPage = () => {

  const { id } = useParams()

  const { wholedata, setWholedata } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/findcurrentmatch/${id}`, {
          withCredentials: true
        });
        setWholedata(response.data);

        console.log("first", response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    }
    fetchData();
  }, [id])

  const [teamSelect, setTeamSelect] = useState(0)
  const [whichBatter, setwhichBatter] = useState(0)
  const [playerSelect, setPlayerSelect] = useState(true)
  const [bowlercontainer, setbowlercontainer] = useState(true)
  const [playerName1, setPlayerName1] = useState(0)
  const [playerName2, setPlayerName2] = useState(0)
  const [bowlerName, setbowlerName] = useState(0)
  const [teamA, setteamA] = useState(null)
  const [cricketMatch, setcricketMatch] = useState(cricketMatchh)
  const [matchData, setMatchData] = useState(null); // Holds match data
  const [winningTeam, setWinningTeam] = useState("");

  console.log("wholedata", wholedata);

  useEffect(() => {
    if (wholedata && wholedata.teams) {  // ✅ Ensure teams exist before setting
      setMatchData(wholedata);
    }
  }, [wholedata]);




  useEffect(() => {
    if (matchData) {
      setWholedata(matchData);
      const timer = setTimeout(async () => {
        try {
          await axios.patch(
            `${import.meta.env.VITE_BACKENDURL}/api/matchupdate/${id}`,
            matchData,
            { withCredentials: true }
          );
          console.log("API Updated:", matchData);

        } catch (error) {
          console.error("API Error:", error);
        }
      }, 800); // 🛑 Prevents rapid requests

      return () => clearTimeout(timer);
    }
  }, [matchData]);  // ✅ Runs only when `matchData` updates




  const handelteamSelect = (teamIndex) => {
    if (!matchData) return;

    const updatedMatchData = { ...matchData };

    updatedMatchData.teams = updatedMatchData.teams.map((team, index) => ({
      ...team,
      isBatting: index === teamIndex,
    }));

    setMatchData(updatedMatchData);
    setTeamSelect(teamIndex);
  };

  const handelWhichBatter = () => {
    setwhichBatter(0)
  }
  const handelWhichBattersecond = () => {
    setwhichBatter(1)
  }

  const handelPlayercontainerOprnbtn = (data) => {
    setPlayerSelect((prev) => !prev)
    setteamA(data);

  }
  const handelBowlerbtn = () => {
    setbowlercontainer(pre => !pre)
  }
  const closeDrawer1 = (i) => {
    setPlayerSelect((prev) => !prev)
    setPlayerName1(i)
  }
  const closeDrawer2 = (i) => {
    setPlayerSelect((prev) => !prev)
    setPlayerName2(i)
  }
  const bowlerDrawer = (i) => {
    setbowlercontainer((prev) => !prev)
    setbowlerName(i)
  }

  const increaseRunByOne = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };

      const batterIndex = whichBatter === 0 ? playerName1 : playerName2;

      // Update runs and balls faced for the selected batter
      updatedMatch.teams[teamSelect].players[batterIndex].runs += 1;
      updatedMatch.teams[teamSelect].totalRuns += 1; // Update total runs
      updatedMatch.teams[teamSelect].players[batterIndex].ballsFaced += 1;

      return updatedMatch;
    });
  };


  const decreaseRunByOne = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };
      updatedMatch.teams[teamSelect].players[whichBatter === 0 ? playerName1 : playerName2].runs -= 1;
      updatedMatch.teams[teamSelect].totalRuns -= 1;
      updatedMatch.teams[teamSelect].players[whichBatter === 0 ? playerName1 : playerName2].ballsFaced -= 1;

      return updatedMatch;
    });
  };


  const increaseRunByTwo = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };
      updatedMatch.teams[teamSelect].players[whichBatter === 0 ? playerName1 : playerName2].runs += 2;
      updatedMatch.teams[teamSelect].totalRuns += 2;
      updatedMatch.teams[teamSelect].players[whichBatter === 0 ? playerName1 : playerName2].ballsFaced += 1;

      return updatedMatch;
    });
  };

  const increaseRunByThree = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };
      const batterIndex = whichBatter === 0 ? playerName1 : playerName2;

      // Update the batter's runs and balls faced
      updatedMatch.teams[teamSelect].players[batterIndex].runs += 3;
      updatedMatch.teams[teamSelect].players[batterIndex].ballsFaced += 1;

      // Update the team's total runs
      updatedMatch.teams[teamSelect].totalRuns += 3;

      return updatedMatch;
    });
  };

  const increaseRunByFour = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };
      const batterIndex = whichBatter === 0 ? playerName1 : playerName2;

      updatedMatch.teams[teamSelect].players[batterIndex].runs += 4;
      updatedMatch.teams[teamSelect].players[batterIndex].ballsFaced += 1;
      updatedMatch.teams[teamSelect].totalRuns += 4;

      return updatedMatch;
    });
  };

  const increaseRunBySix = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };
      const batterIndex = whichBatter === 0 ? playerName1 : playerName2;

      updatedMatch.teams[teamSelect].players[batterIndex].runs += 6;
      updatedMatch.teams[teamSelect].players[batterIndex].ballsFaced += 1;
      updatedMatch.teams[teamSelect].totalRuns += 6;

      return updatedMatch;
    });
  };


  const increaseRunByOut = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };
      updatedMatch.teams[teamSelect].players[whichBatter === 0 ? playerName1 : playerName2].isOut = true;
      updatedMatch.teams[teamSelect].totalWickets += 1;

      // Switch strike to the other batter
      setwhichBatter(whichBatter === 0 ? 1 : 0);
      return updatedMatch;
    });
  };



  const increaseBallCount = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = structuredClone(prevMatchData);

      // Ensure totalOvers is initialized if it doesn't exist
      let totalOvers = updatedMatch.teams[teamSelect].totalOvers || "0.0";

      let [overs, balls] = totalOvers
        .toString()
        .split('.')
        .map(num => Number(num) || 0);

      // Convert to total balls to avoid float issues
      let totalBalls = overs * 6 + balls + 1;

      // Check if the overs exceed max overs before incrementing the ball count
      const maxOvers = updatedMatch.overs; // Assuming maxOvers is per team

      if (overs >= maxOvers) {
        // Prevent further ball increment if max overs is reached
        console.log(`Team ${updatedMatch.teams[teamSelect].teamName} has completed their overs.`);
        return prevMatchData; // Return the previous state without making changes
      }

      // Convert back to "overs.balls" format
      overs = Math.floor(totalBalls / 6);
      balls = totalBalls % 6;

      // If overs exceed maxOvers after incrementing, stop the match
      if (overs >= maxOvers) {
        updatedMatch.teams[teamSelect].isMatchEnded = true;
        updatedMatch.target = updatedMatch.teams[teamSelect].totalRuns + 1;
        console.log(`Team ${updatedMatch.teams[teamSelect].teamName} has finished their overs.`);
      }

      updatedMatch.teams[teamSelect].totalOvers = `${overs}.${balls}`; // Store as a string for safety

      return updatedMatch;
    });
  };



  const decreaseBallCount = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      // Create a deep copy
      const updatedMatch = JSON.parse(JSON.stringify(prevMatchData));

      let [overs, balls] = updatedMatch.teams[teamSelect].totalOvers.toString().split('.').map(Number);

      if (balls === 0) {
        if (overs > 0) {
          overs -= 1;
          balls = 5;
        }
      } else {
        balls -= 1;
      }

      updatedMatch.teams[teamSelect].totalOvers = parseFloat(`${overs}.${balls}`);

      return updatedMatch;
    });
  };


  const handleNoBall = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };

      // Add 1 run to the team’s total runs
      updatedMatch.teams[teamSelect].totalRuns += 1;

      // No-ball doesn’t count as a legitimate delivery, so we don't increase totalOvers (balls count remains same)

      return updatedMatch;
    });
  };

  const handleWideBall = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };

      // Add 1 run to the team’s total runs
      updatedMatch.teams[teamSelect].totalRuns += 1;

      // Wide ball does not count as a legitimate delivery
      return updatedMatch;
    });
  };


  const handleFreeHit = () => {
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };

      // Mark the next delivery as a Free Hit (You may need to handle this in UI logic)
      updatedMatch.isFreeHit = true;

      return updatedMatch;
    });
  };

  const handleChangestatus = (e) => {
    const { value } = e.target;
    
    setMatchData((prevMatchData) => {
      if (!prevMatchData) return prevMatchData;

      const updatedMatch = { ...prevMatchData };

      updatedMatch.status = value;

      return updatedMatch;
    });

  };



  const handleWinningTeamChange = (e) => {
    const { value } = e.target;
    setWinningTeam(value);
  }

  const handleWinningTeamSelect = async () => {
    if (!winningTeam) {
      alert("Please select a team before submitting.");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKENDURL}/api/matchupdate/${id}`,
        { WiningTeam: winningTeam },
        { withCredentials: true }
      );
      console.log("Winning team updated successfully:", response.data);
      alert("Winning team updated successfully!");
    } catch (error) {
      console.error("Error updating winning team:", error);
      alert("Failed to update the winning team.");
    }
  };


  return (
    <>
      {matchData && matchData.teams ? (
        <div className={styles.mainContainer}>
          <div className={styles.logoContainer}>
            <h1>LoGo</h1>
          </div>
          <div className={styles.cameraContainer}>
            <h1>Camera</h1>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.firstDataContainer}>
              {/* Bat container start */}
              <div className={styles.runsContainer}>
                <div className={styles.runcontainerfirstBox}>
                  <button onClick={decreaseRunByOne} ><HiMinus className={styles.plusicon} /></button>
                  <div className={styles.runBox}>{matchData.teams[teamSelect].totalRuns}/{cricketMatch.teams[teamSelect].totalWickets}</div>
                  <button onClick={increaseRunByOne}><FaPlus className={styles.plusicon} /></button>
                </div>
                <div className={styles.extrabolscontainer}>
                  <button onClick={increaseRunByTwo}>2</button>
                  <button onClick={increaseRunByThree}>3</button>
                  <button onClick={increaseRunByFour}>4</button>
                  <button onClick={increaseRunBySix}>6</button>
                  <button onClick={increaseRunByOut}>Out</button>
                </div>
              </div>
              {/* Bat container END */}
              {/* Boals container start */}
              <div className={styles.runsContainer}>
                <div className={styles.runcontainerfirstBox}>
                  <button onClick={decreaseBallCount}><HiMinus className={styles.plusicon} /></button>
                  <div className={styles.runBox}>{matchData.teams[teamSelect].totalOvers}</div>
                  <button onClick={increaseBallCount}><FaPlus className={styles.plusicon} /></button>
                </div>
                <div className={styles.extrabolscontainer}>
                  <button onClick={handleNoBall}>No</button>
                  <button onClick={handleWideBall}>wi</button>
                  <button onClick={handleFreeHit}>Fhit</button>
                </div>
              </div>
              {/* Boals container end */}
              {/* current batters name  start*/}
              <div className={styles.currentBatterContainer}>
                <div className={playerSelect ? styles.playerBoxes : styles.disnone}>
                  {
                    (teamA == "teamA") ? (
                      matchData.teams[teamSelect]?.players?.map((item, i) => (

                        i % 2 == 0 ? (
                          <div className={styles.onlyplayername} key={i} onClick={() => closeDrawer1(i)}>{item.name}</div>
                        ) : ""

                      ))
                    ) : (
                      matchData.teams[teamSelect]?.players?.map((item, i) => (
                        i % 2 == !0 ? (
                          <div className={styles.onlyplayername} key={i} onClick={() => closeDrawer2(i)}>{item.name}</div>
                        ) : ""
                      ))
                    )
                  }
                </div>
                <h2 className={styles.currentbattheading}>Currents Batters</h2>
                <div className={whichBatter == 0 ? styles.player1containermark : styles.player1container} onClick={handelWhichBatter}>
                  <h2>{matchData.teams[teamSelect].players[playerName1].isOut == !true ? matchData.teams[teamSelect].players[playerName1].name : ""}</h2>
                  <div>{matchData.teams[teamSelect].players[playerName1]?.runs}</div>
                  <button className={styles.selectPlayerbtn} onClick={() => handelPlayercontainerOprnbtn("teamA")}>SP</button>
                </div>
                {/* second player */}
                <div className={whichBatter == 1 ? styles.player1containermark : styles.player1container} onClick={handelWhichBattersecond}>
                  <h2>{matchData.teams[teamSelect].players[playerName2].isOut == !true ? matchData.teams[teamSelect].players[playerName2].name : ""}</h2>
                  <div>{matchData.teams[teamSelect].players[playerName2]?.runs}</div>
                  <button className={styles.selectPlayerbtn} onClick={handelPlayercontainerOprnbtn}>SP</button>
                </div>
              </div>
              {/* current batters name End */}
              {/* current bolwer name ------*/}
              <div className={styles.currentBatterContainer}>
                <div className={bowlercontainer ? styles.playerBoxes : styles.disnone}>
                  {
                    matchData.teams[teamSelect == 0 ? 1 : 0]?.players?.map((item, i) => (

                      <div className={styles.onlyplayername} key={i} onClick={() => bowlerDrawer(i)}>{item.name}</div>
                    ))}
                </div>
                <h2 className={styles.currentbattheading}>Currents Bowler</h2>
                <div className={styles.player1container}>
                  <h2>{matchData.teams[teamSelect == 0 ? 1 : 0].players[bowlerName].name}</h2>
                  <div>2.3</div>
                  <button className={styles.selectPlayerbtn} onClick={handelBowlerbtn}>SP</button>
                </div>

              </div>
            </div>

            <div className={styles.SecondDataContainer}>
              <div className={styles.secBox}>
                <label htmlFor="matchStatus">Match Status:</label>
                <select id="matchStatus" value={status} onChange={handleChangestatus} className={styles.selectBox}>
                  <option value="">Status</option>
                  <option value="draft">Draft</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>

                <label htmlFor="WiningTeam">Winning Team:</label>
                <select
                  id="WiningTeam"
                  value={winningTeam}
                  onChange={handleWinningTeamChange}
                  className={styles.selectBox}
                >
                  <option value="">Select Team</option>
                  {matchData &&
                    matchData.teams.map((item, i) => (
                      <option key={i} value={item.teamName}>{item.teamName}</option>
                    ))
                  }
                </select>
                <button onClick={handleWinningTeamSelect} className={styles.bbtn}>Confirm Winner</button>
              </div>
              {
                matchData.teams.map((item, i) => (
                  <div key={i} className={teamSelect === i ? styles.teamContainerSelected : styles.teamContainer}>
                    <h3>Team : {item.teamName} <span onClick={() => handelteamSelect(i)}>select</span></h3>
                    <div className={styles.playerlistContainer}>
                      {
                        item.players.map((player, j) => (
                          <div key={j} className={styles.playerNameContainer}>
                            <p>{player.name}</p>
                            <div><HiMinus className={styles.playerIcon} /></div>
                            <div><FaPlus className={styles.playerIcon} /></div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )
      }
    </>
  )
}

export default HostingPage





