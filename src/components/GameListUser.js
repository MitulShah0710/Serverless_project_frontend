// GameList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const {userId} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/games')
      .then(response => {
        setGames(response.data);
        console.log("API Response:", response.data); // Print the response
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter the games based on the search term
    const filtered = games.filter(game =>
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [games, searchTerm]);

  const handleStartButtonClick = async (gameId, userId) => {
    // Get the teamId from the user input or any other source
    const teamId = 'shivam546'; // Replace with the actual team ID

    try {
      // Make a POST API request with the gameId and teamId in the request body
      const response = await axios.post(
        'https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/gameTeam', // Replace with your actual POST API endpoint
        { gameId, teamId }
      );

      // Handle the response from the server (if needed)
      console.log('POST API Response:', response.data);
    } catch (error) {
      console.error('Error making POST API request:', error);
    }

    // Redirect the user to the new page with the game ID as a path parameter
    navigate(`/game/${gameId}/user/${userId}`);
  };

  return (
    <div>
      <h1>Game List</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredGames.map(game => (
          <div
            key={game.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '5px',
              flex: '0 0 30%',
            }}
          >
            <h3>{game.description}</h3>
            <p>Category: {game.category}</p>
            <p>Difficulty: {game.difficulty}</p>
            <p>Description: {game.description}</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button
                onClick={() => handleStartButtonClick(game.id, userId)}
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
