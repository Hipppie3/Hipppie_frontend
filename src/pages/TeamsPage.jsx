import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { navigateToPlayer } from '../utility/Navigation.jsx'
import axios from 'axios'

function TeamsPage() {
  const {id} = useParams();
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`/api/teams/${id}`);
        setTeam(response.data.team)
        console.log(response.data.team)
      } catch(error) {
      console.error('Error fetching team', error);
      setError("Failed to load team details");
    } finally {
      setLoading(false);
    }
  };
  fetchTeam();
  },[id]);

  if (!team) return <div>No team found</div>;
  if (loading) return <div>Loading team details...</div>;
  if (error) return <div>{error}</div>;



  return (
    <div>
      <h1>{team.name}</h1>
      <h2>Players</h2>
      {team.players.map((player) => (
        <div key={player.id} onClick={() => {navigateToPlayer(navigate, player.id)}}
        style={{cursor: 'pointer'}}>
        <h3>{`${player.firstName} ${player.lastName}`}</h3>
        </div>
      ))}
    </div>
  )
}

export default TeamsPage
