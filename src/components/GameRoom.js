import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetailsPage = () => {
  const [gameDetails, setGameDetails] = useState(null);
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  // An array of users
  const users = [
    { id: 'jay123', username: 'Jay' },
    { id: 'shivam546', username: 'Shivam' },
    // Add more users here
  ];

  useEffect(() => {
    fetchGameDetails();
  }, []);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/game/${gameId}`);
      setGameDetails(response.data);
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const handleStartGame = () => {
    // Select a random user from the users array
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Redirect the user to the new page with the game ID and random user ID as path parameters
    navigate(`/room/${gameId}/${randomUser.id}`);
  };

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Game Details</h1>
      <p>Description: {gameDetails.description}</p>
      <p>Category: {gameDetails.category}</p>
      <p>Difficulty: {gameDetails.difficulty}</p>

      {/* Display other game details */}
      {/* You can add more game-related information here */}
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          onClick={handleStartGame}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default GameDetailsPage;
