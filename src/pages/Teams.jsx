import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { navigateToTeam } from '../utility/Navigation.jsx';
import './Teams.css'; 

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get('/api/teams');
        console.log(response.data.teams);
        setTeams(response.data.teams);
      } catch (error) {
        console.log('Error fetching teams', error.message);
        setError('Failed to load teams');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return <div className="teams-loading">Loading teams...</div>;
  }
  if (error) {
    return <div className="teams-error">{error}</div>;
  }
  if (teams.length === 0) {
    return <div className="no-teams">No Teams found</div>;
  }

  return (
    <div className="teams-container">
      <h2 className="teams-title">Teams</h2>
      {teams.map((team) => (
        <div className="team-item" key={team.id} onClick={() => navigateToTeam(navigate, team.id)} style={{cursor: 'pointer'}}>
          <h3>{team.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Teams;
