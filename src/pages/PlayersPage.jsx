import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {navigateToTeam} from '../utility/Navigation.jsx';
import './PlayersPage.css'

const PlayerPage = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`/api/players/${id}`);
        setPlayer(response.data.player);
        console.log(response.data.player)
      } catch (error) {
        console.error("Error fetching player", error);
        setError("Failed to load player details");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (!player) return <div>No player found</div>;
  if (loading) return <div>Loading player details...</div>;
  if (error) return <div>{error}</div>;


return (
  <div className="players-page-card">
    <img src={player.image || '/defaultPlayer.png'} alt={player.firstName} />
    <h1>{`${player.firstName} ${player.lastName}`}</h1>
    <h2 onClick={() => navigateToTeam(navigate, player?.team?.id)}>
      Team: {player?.team?.name || "No Team"}
    </h2>
  </div>
);

};

export default PlayerPage;