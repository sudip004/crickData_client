import React,{useContext, useState} from 'react'
import axios from "axios"
import styles from "./PlayerListCreate.module.css"
import { useAppContext } from '../../context/AppContext'
import {useNavigate} from "react-router-dom"

const PlayerListCreate = () => {

   const navigate = useNavigate()

  const [overs, setOvers] = useState(0);
  const [teams, setTeams] = useState([
    { teamName: '', players: [{ name: '' }] },
    { teamName: '', players: [{ name: '' }] },
  ]);

  const handleOversChange = (e) => {
    setOvers(e.target.value);
  };

  const handleTeamNameChange = (teamIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].teamName = value;
    setTeams(updatedTeams);
  };

  const handlePlayerNameChange = (teamIndex, playerIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players[playerIndex].name = value;
    setTeams(updatedTeams);
  };

  const addPlayer = (teamIndex) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players.push({ name: '' });
    setTeams(updatedTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      overs,
      teams,
    };

    try {
      // const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    
      // if (!token) {
      //     throw new Error('No token found. Please log in.');
      // }

      // console.log('Token:', token);
      
      
      const response = await axios.post(
          `${import.meta.env.VITE_BACKENDURL}/api/matchcreate`,
          data,
          { withCredentials: true }
      );
      alert('Match created successfully!');
      console.log(response.data);
      const pathId = response?.data?._id
      navigate(`/${pathId}`)
    } catch (error) {
      console.error('Error creating match:', error.response?.data || error.message);
    }
  };


  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Create Match</h1>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Overs:</label>
        <input
          type="number"
          className={styles.input}
          value={overs}
          onChange={handleOversChange}
          required
        />
      </div>
      <div className={styles.teamsWrapper}>
        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className={styles.teamContainer}>
            <h2 className={styles.teamTitle}>
              {teamIndex === 0 ? 'Team A' : 'Team B'}
            </h2>
            <label className={styles.label}>Team Name:</label>
            <input
              type="text"
              className={styles.input}
              value={team.teamName}
              onChange={(e) => handleTeamNameChange(teamIndex, e.target.value)}
              required
            />
            <h3 className={styles.subTitle}>Players</h3>
            {team.players.map((player, playerIndex) => (
              <div key={playerIndex} className={styles.playerGroup}>
                <label className={styles.label}>
                  Player {playerIndex + 1} Name:
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerNameChange(teamIndex, playerIndex, e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={() => addPlayer(teamIndex)}
            >
              Add Player
            </button>
          </div>
        ))}
      </div>
      <button type="submit" className={styles.submitButton}>
        Create Match
      </button>
    </form>
  );
  
}

export default PlayerListCreate

