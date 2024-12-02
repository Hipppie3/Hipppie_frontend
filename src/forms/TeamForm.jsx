import React, { useState, useEffect } from 'react';
import TeamFormInput from './teamForm/TeamFormInput';
import TeamSearch from './teamForm/TeamSearch';
import TeamList from './teamForm/TeamList';
import axios from 'axios';
import './teamForm/TeamForm.css';

function TeamForm() {
  const [formData, setFormData] = useState({ name: '' });
  const [teams, setTeams] = useState([]);
  const [teamCreated, setTeamCreated] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTeams, setShowTeams] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/teams');
        setTeams(response.data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitTeam = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `/api/teams/${editingTeamId}`,
          formData
        );
        const updatedTeam = response.data.team;
        setTeams((prev) =>
          prev.map((team) =>
            team.id === editingTeamId ? updatedTeam : team
          )
        );
        setTeamCreated(`Team "${formData.name}" updated successfully`);
      } else {
        const response = await axios.post('/api/teams/createTeam', formData);
        setTeams((prev) => [...prev, response.data.team]);
        setTeamCreated(`Team "${formData.name}" created successfully`);
      }
      setFormData({ name: '' });
      setEditingTeamId(null);
      setIsEditing(false);
      setErrorMessage('');
      setTimeout(() => setTeamCreated(''), 3000);
    } catch (error) {
      console.error('Error creating/updating team:', error);
      setErrorMessage('Failed to create/update team. Please try again.');
    }
  };

  const handleEdit = (team) => {
    if (editingTeamId === team.id) {
      setIsEditing(false);
      setFormData({ name: '' });
      setEditingTeamId(null);
    } else {
      setIsEditing(true);
      setFormData({ name: team.name });
      setEditingTeamId(team.id);
    }
  };

    const handleDelete = async (teamId) => {
    try {
      await axios.delete(`/api/teams/${teamId}`);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
    } catch (error) {
      console.error(
        `Failed to delete team with id:${teamId}:`,
        error.response?.data || error.message
      );
      setErrorMessage('Failed to delete team. Please try again.');
    }
  };


  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="team-form-container">
      <TeamFormInput
        formData={formData}
        handleChange={handleChange}
        submitTeam={submitTeam}
        isEditing={isEditing}
      />
      {teamCreated && (
        <p className="team-form-success-message">{teamCreated}</p>
      )}
      {errorMessage && (
        <p className="team-form-error-message">{errorMessage}</p>
      )}
      <div className="team-form-show-teams-container">
        <button
          className="team-form-show-teams-button"
          onClick={() => setShowTeams((prev) => !prev)}
        >
          {showTeams ? 'Hide Teams' : 'Show Teams'}
        </button>
      </div>
      {showTeams && (
        <>
          <TeamSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TeamList
            teams={filteredTeams}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editingTeamId={editingTeamId}
          />
        </>
      )}
    </div>
  );
}

export default TeamForm;
