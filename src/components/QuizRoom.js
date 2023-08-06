import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetailsPage = () => {
  const [gameDetails, setGameDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const { gameId } = useParams();
  const navigate = useNavigate();

  const users = [
    { id: 'jay123', username: 'Jay' },
    { id: 'shivam546', username: 'Shivam' },
    // Add more users here
  ];

  useEffect(() => {
    fetchGameDetails();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setSelectedOption(null);
      setIsCorrectAnswer(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameDetails) {
      setCurrentQuestionIndex(0);
      fetchQuestion(gameDetails.questions[0]);
    }
  }, [gameDetails]);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/game/${gameId}`);
      setGameDetails(response.data);
      if (response.data.questions.length > 0) {
        fetchQuestion(response.data.questions[0]);
      }
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const fetchQuestion = async (questionId) => {
    try {
      const response = await axios.get(`https://je9q7ypm4m.execute-api.us-east-1.amazonaws.com/dev/question/${questionId}`);
      setCurrentQuestion(response.data);
      setTimeLeft(response.data.timeframe);
      setSelectedOption(null);
      setIsCorrectAnswer(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleStartGame = () => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    navigate(`/room/${gameId}/${randomUser.id}`);
  };

  const handleNextQuestion = async () => {
    if (isCorrectAnswer !== null) {
      if (gameDetails && currentQuestionIndex < gameDetails.questions.length - 1) {
        const nextQuestionId = gameDetails.questions[currentQuestionIndex + 1];
        fetchQuestion(nextQuestionId);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log('End of questions');
      }
    }
  };

  const handleOptionClick = (optionKey) => {
    setSelectedOption(optionKey);
    if (optionKey === currentQuestion.answer) {
      setIsCorrectAnswer(true);
      setScore(score + 1);
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } else {
      setIsCorrectAnswer(false);
    }
  };

  if (!gameDetails || !currentQuestion) {
    return <div>Loading...</div>;
  }
  const isEndOfGame = currentQuestionIndex === gameDetails.questions.length - 1;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ flex: 2 }}>
        <h1>Game Details</h1>
        <p>Description: {gameDetails.description}</p>
        <p>Category: {gameDetails.category}</p>
        <p>Difficulty: {gameDetails.difficulty}</p>
  
        <div>
          <h2>Question: {currentQuestion.question}</h2>
          <div style={{ marginBottom: '20px' }}>
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                style={{
                  backgroundColor:
                    isCorrectAnswer !== null
                      ? selectedOption === key
                        ? isCorrectAnswer
                          ? 'lightgreen'
                          : 'red'
                        : currentQuestion.answer === key
                        ? 'lightgreen'
                        : 'pink'
                      : '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
              >
                {value}
              </button>
            ))}
          </div>
          {isCorrectAnswer !== null && (
            <p style={{ color: isCorrectAnswer ? 'green' : 'red' }}>
              {isCorrectAnswer ? 'Correct!' : 'Wrong!'} Moving to the next question...
            </p>
          )}
          <p>Time Left: {timeLeft} seconds</p>
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          {isEndOfGame ? (
            <div>
              <h3>Game Over</h3>
              <p>Total Questions: {gameDetails.questions.length}</p>
              <p>Correct Answers: {score}</p>
            </div>
          ) : (
            <button
              onClick={handleNextQuestion}
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginLeft: '20px' }}>
        <h3>User Progress</h3>
        <p>Total Questions: {gameDetails.questions.length}</p>
        <p>Correct Answers: {score}</p>
      </div>
    </div>
  );
};

export default GameDetailsPage;
