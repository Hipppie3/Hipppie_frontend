import React, { useState, useEffect } from 'react';
import PlayerFormInput from './playerForm/PlayerFormInput';
import PlayerFilters from './playerForm/PlayerFilters';
import PlayerTable from './playerForm/PlayerTable';
import axios from 'axios';
import './playerForm/PlayerForm.css';

function PlayerForm() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', teamId: '', sportId: '' });
  const [playerCreated, setPlayerCreated] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersResponse, teamsResponse, sportsResponse] = await Promise.all([
          axios.get('/api/players'),
          axios.get('/api/teams'),
          axios.get('/api/sports'),
        ]);
        setPlayers(playersResponse.data.players);
        setTeams(teamsResponse.data.teams);
        setSports(sportsResponse.data.sports)
      } catch (error) {
        console.error('Error fetching players and teams:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTeamFilter = (e) => setSelectedTeam(e.target.value);
  const handleSportFilter = (e) => setSelectedSport(e.target.value);
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTeam('');
    setSelectedSport('');
  };

const submitPlayer = async (e) => {
  e.preventDefault();
  const sanitizedFormData = {
    ...formData,
    teamId: formData.teamId || null,
    sportId: formData.sportId || null,
  };
  try {
    if (isEditing) {
      const response = await axios.put(`/api/players/${editingPlayerId}`, sanitizedFormData);
      const updatedPlayer = response.data.player;
      console.log('Player updated:', updatedPlayer);
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === editingPlayerId ? updatedPlayer : player
        )
      );
      setPlayerCreated(
        `Player "${formData.firstName} ${formData.lastName}" updated successfully`
      );
    } else {
      const response = await axios.post('/api/players/createPlayer', sanitizedFormData);
      console.log('Player created:', response.data);
      setPlayers((prev) => [...prev, response.data.player]);
      setPlayerCreated(
        `Player "${formData.firstName} ${formData.lastName}" created successfully`
      );
    }
    setFormData({ firstName: '', lastName: '', teamId: '', sportId: '' });
    setEditingPlayerId(null);
    setIsEditing(false);
    setErrorMessage('');
    setTimeout(() => setPlayerCreated(''), 3000);
  } catch (error) {
    console.error('Error creating/updating player:', error.response?.data || error.message);
    setErrorMessage('Failed to create/update player. Please try again.');
  }
};

  const handleEdit = (player) => {
  if (editingPlayerId === player.id) {
    setIsEditing(false);
    setFormData({
      firstName: '',
      lastName: '',
      teamId: '',
      sportId: '',
    });
    setEditingPlayerId(null);
  } else{
    setIsEditing(true);
    setFormData({
      firstName: player.firstName,
      lastName: player.lastName,
      teamId: player.teamId || '',
      sportId: player.sportId || '',
    });
    setEditingPlayerId(player.id)
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

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam ? player.teamId === parseInt(selectedTeam) : true;
    const matchesSport = selectedSport ? player.sportId === parseInt(selectedSport) : true;
    return matchesSearch && matchesTeam && matchesSport;
  });

  return (
    <div className="player-form-container">
      <PlayerFormInput
        formData={formData}
        teams={teams}
        sports={sports}
        handleChange={handleChange}
        submitPlayer={submitPlayer}
        isEditing={isEditing}
      />
      {playerCreated && <p className="success-message">{playerCreated}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <PlayerFilters
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        selectedTeam={selectedTeam}
        handleTeamFilter={handleTeamFilter}
        selectedSport={selectedSport}
        handleSportFilter={handleSportFilter}
        clearFilters={clearFilters}
        teams={teams}
        sports={sports}
      />
      <PlayerTable
        players={filteredPlayers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editingPlayerId={editingPlayerId}
      />
    </div>
  );
}

export default PlayerForm;
