// GameDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../GameDetails.css'

const GameDetailsPage = () => {
  const [gameDetails, setGameDetails] = useState(null);
  const [additionalData, setAdditionalData] = useState(null); // State for additional data
  const { gameId, userId } = useParams();


  useEffect(() => {
    fetchGameDetails();
    fetchAdditionalData(); // Call the function to fetch additional data
  }, []);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`https://mdlbsby4nd.execute-api.us-east-1.amazonaws.com/dev/game/${gameId}`);
      setGameDetails(response.data);
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      // Make another API call to fetch additional data using axios
      const response = await axios.post(`https://2w627hva83.execute-api.us-east-1.amazonaws.com/test/fetchteams`, {
        userId: userId,
      });
    //   console.log("response", response.data.teams);
      const teams = response.data.teams;
      const teamsWithUsers = await Promise.all(
        teams.map(async (team) => {
          const response1 = await axios.post(`https://ewfh5bupzi.execute-api.us-east-1.amazonaws.com/user/getteamusers`, {
            teamId: team.id,
          });
          return {
            ...team,
            users: response1.data,
          };
        })
      );
  
      setAdditionalData({ teams: teamsWithUsers });
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  if (!gameDetails || !additionalData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Game Details</h1>
      <p>Description: {gameDetails.description}</p>
      <p>Category: {gameDetails.category}</p>
      <p>Difficulty: {gameDetails.difficulty}</p>

      <div className="teams-section">
        <h2>Teams</h2>
        <div className="team-card-container">
          {additionalData.teams.map((team) => (
            <div key={team.id} className="team-card">
              <div className="team-name">{team.team_name}</div>
              {team.users && (
                <ul className="user-list">
                  {team.users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Display other game details */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={handleJoinButton}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Join
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default GameDetailsPage;
