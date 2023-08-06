// GameDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GameDetailsPage = () => {
  const [gameDetails, setGameDetails] = useState(null);
  const [gameTeams, setGameTeams] = useState(null); // State for additional data
  const { gameId } = useParams();

  useEffect(() => {
    fetchGameDetails();
    fetchGameTeams(); // Call the function to fetch additional data
  }, []);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/game/${gameId}`);
      setGameDetails(response.data);
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const fetchGameTeams = async () => {
    try {
      // Make another API call to fetch additional data using axios
      const response = await axios.get(`https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/gameTeams`);
      setGameTeams(response.data);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  if (!gameDetails || !gameTeams) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Game Details</h1>
      <p>Description: {gameDetails.description}</p>
      <p>Category: {gameDetails.category}</p>
      <p>Difficulty: {gameDetails.difficulty}</p>
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
      <div>
        <h2>Game Teams</h2>
        <ul>
          {gameTeams.map((team) => (
            <li key={team.id}>
              <h3>Team: {team.team_name}</h3>
              <p>Team ID: {team.id}</p>
              {/* You can add more details about each team here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameDetailsPage;
