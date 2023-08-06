import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import GameListUser from './components/GameListUser';
import GameDetailsAfterJoin from './components/GameDetailsAfterJoin';
import GameRoom from './components/GameRoom';
import QuizRoom from './components/QuizRoom';

const router = createBrowserRouter([
  {
    element: <GameList />,
    path: "/",
  },
  {
    element: <GameDetails />,
    path: "/game/:gameId",
  },
  {
    element: <GameListUser />,
    path: "/user/:userId",
  },
  {
    element: <GameDetailsAfterJoin />,
    path: "/game/:gameId/user/:userId",
  },
  {
    element: <GameRoom />,
    path: "/room/:gameId",
  },
  {
    element: <QuizRoom />,
    path: "/room/:gameId/:userId",
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
