import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { navigateToPlayer } from '../utility/Navigation.jsx';
import './Players.css';


const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultPlayer = '/defaultPlayer.png';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        setPlayers(response.data.players);
      } catch(error) {
        console.error("Error fetching players", error);
        setError("failed to load players. Please try again later.")
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
},[]);

  if (loading) {
    return <div className="loading">Loading players...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (players.length === 0) {
    return <div>No players found</div>;
  }

  return (
    <div className='players-container'>
      {players.map(player => (
        <div className='player-card' key={player.id} onClick={() => navigateToPlayer(navigate, player.id)} style={{cursor: 'pointer'}}>

          {!player.image ? 
          <img src={defaultPlayer} alt='Default Player' className='player-image' /> :
          <img src={player.image} alt={`${player.firstName} ${player.lastName}`} className='player-image' />}
          {console.log(player)}
          <h2 className='player-name'>{`${player.firstName} ${player.lastName}`}</h2>
          <h2>{player?.team?.name || "No Team"}</h2>
        </div>
      ))}
    </div>
  )
}

export default Players