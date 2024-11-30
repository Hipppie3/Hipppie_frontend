import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField.jsx';
import axios from 'axios';
import './PlayerForm.css';

function PlayerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    teamId: ''
  });

  const [playerCreated, setPlayerCreated] = useState('');
  const [showPlayers, setShowPlayers] = useState(false);
  const [players, setPlayers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [teams, setTeams] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (player) => {
  if (editingPlayerId === player.id) {
    setIsEditing(false);
    setFormData({
      firstName: '',
      lastName: '',
      teamId: ''
    });
    setEditingPlayerId(null);
  } else{
    setIsEditing(true);
    setFormData({
      firstName: player.firstName,
      lastName: player.lastName,
      teamId: player.teamId || '',
    });
    setEditingPlayerId(player.id)
  }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersResponse, teamsResponse] = await Promise.all([
          axios.get('/api/players'),
          axios.get('/api/teams')
        ]);
        setPlayers(playersResponse.data.players);
        setTeams(teamsResponse.data.teams);

        console.log('Players:', playersResponse.data.players);
        console.log('Teams:', teamsResponse.data.teams);
      } catch(error) {
        console.error('Error fetching players and teams:', error)
        setError('Failed to load data. Please try again later.')
      }
    };
    fetchData();
  },[]);

  const submitPlayer = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(`/api/players/${editingPlayerId}`, formData)
        const updatedPlayer = response.data.player
        console.log('Player updated:', updatedPlayer);
        setPlayers((prev) => 
        prev.map((player) => 
        player.id === editingPlayerId ? updatedPlayer : player)
      );
      setPlayerCreated(`Player " ${formData.firstName} ${formData.lastName} ${formData.teamId} updated successfully`)
      } else 
      {
      const response = await axios.post('/api/players/createPlayer', formData);
      console.log('Player created:', response.data);
      setPlayers((prev) => [...prev, response.data.player]);
      setPlayerCreated(`Player "${formData.firstName} ${formData.lastName} ${formData.teamId} " created successfully`);
      }
      setFormData({ firstName: '', lastName: '', teamId: ''});
      setEditingPlayerId(null);
      setIsEditing(false);
      setErrorMessage(''); 
      setTimeout(() => setPlayerCreated(''), 3000);
    } catch (error) {
      console.error('Error creating player:', error.response?.data || error.message);
      setErrorMessage('Failed to create player. Please try again.');
    }
  };


  const handleDelete = async (playerId) => {
    try {
      await axios.delete(`/api/players/${playerId}`);
      setPlayers((prev) => prev.filter((player) => player.id !== playerId));
      console.log(`PLayer with id ${playerId} deleted successfully`);
    } catch(error) {
      console.error(`Failed to delete player with id ${playerId}:`, error.response?.data || error.message);
      setErrorMessage('Failed to delete player. Please try again.');
    }
  }


return (
  <div className="player-form-container">
    <form onSubmit={submitPlayer} className="player-form">
      <h2>Create Player</h2>
      <FormField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <FormField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <div className="form-field">
      <label>Team</label>
      <select
      name="teamId"
      value={formData.teamId}
      onChange={handleChange}
      >
      <option value="">Select a Team</option>
      {teams.map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ))}
      </select>
      </div>
      <button type="submit" className="form-submit-button">
        {isEditing ? 'UPDATE' : 'CREATE'}
      </button>
    </form>

    {/* Conditional message rendering */}
    {playerCreated && <p className="success-message">{playerCreated}</p>}
    {errorMessage && <p className="error-message">{errorMessage}</p>}

    {/* Show Players Button */}
    <div className="show-players-container">
      <button
        className="show-players-button"
        onClick={() => setShowPlayers((prev) => !prev)}
      >
        {showPlayers ? 'Hide Players' : 'Show All Players'}
      </button>
    </div>

    {error && <p className="error-player-message">{error}</p>}
    {showPlayers && (
      <div className="players-list">
        {players.map(player => (
          <div key={player.id}>
            <h2>{`${player.firstName} ${player.lastName}`}</h2>
            <button onClick={() => handleEdit(player)}>{editingPlayerId === player.id ? 'Unedit' : 'Edit' }</button>
            <button onClick={() => handleDelete(player.id)}>Delete</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default PlayerForm;
