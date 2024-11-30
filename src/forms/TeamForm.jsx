import React, {useState, useEffect} from 'react';
import FormField from '../components/FormField.jsx';
import axios from 'axios';
import Teams from '../pages/Teams.jsx';
import './TeamForm.css';

function TeamForm() {
 const [formData, setFormData] = useState({
  name: '',
 });
 const [teams, setTeams] = useState([]);
 const [teamCreated, setTeamCreated] = useState('');
 const [isEditing, setIsEditing] = useState(false);
 const [editingTeamId, setEditingTeamId] = useState(null);
 const [errorMessage, setErrorMessage] = useState('');
 const [showTeams, setShowTeams] = useState(false);

 const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
 };

 const handleEdit = (team) => {
  if (editingTeamId === team.id) {
    setIsEditing(false);
    setFormData({
      name: ''
    });
    setEditingTeamId(null);
  } else {
    setIsEditing(true);
    setFormData({
      name: team.name
    });
    setEditingTeamId(team.id)
  }
 };

 useEffect(() => {
  const fetchData = async () => {
    try{
    const response = await axios.get('/api/teams');
    console.log(response.data.teams);
    setTeams(response.data.teams);
  } catch(error) {
    console.error("Error fetching teams:", error.message);
  }
}
  fetchData()
 },[])

 const submitTeam = async (e) => {
  e.preventDefault();
  try {
    if (isEditing) {
      const response = await axios.put(`/api/teams/${editingTeamId}`, formData)
      const updatedTeam = response.data.team;
      console.log('Team updated:', updatedTeam);
      setTeams((prev) => 
      prev.map((team) => 
      team.id === editingTeamId ? updatedTeam : team));
    setTeamCreated(`Team ${formData.name} updated successfully`)
  } else 
  {
   const response = await axios.post('/api/teams/createTeam', formData);
   console.log('Team created:', response.data.team);
   setTeams((prev) => [...prev, response.data.team]);
   setTeamCreated(`Team ${formData.name} created successfully`);
  }
  setFormData({ name: '' });
  setEditingTeamId(null);
  setIsEditing(false);
  setErrorMessage('')
   setTimeout(() => setTeamCreated(''), 3000);
  } catch (error) {
   console.log('Error creating team:', error);
   setErrorMessage('Failed to create team. Please try again.');
   setTeamCreated('');
  }
 };

 const handleDelete = async (teamId) => {
  try {
    await axios.delete(`/api/teams/${teamId}`);
    setTeams((prev) => prev.filter((team) => team.id !== teamId));
    console.log(`Team with id ${teamId} deleted successfuly`);
  } catch(error) {
    console.error(`Failed to delete team with ${teamId}:`, error.response?.data || error.message);
    setErrorMessage('Failed to delete team. Please try again.');
  }
 }

  return (
    <div>
      <form onSubmit={submitTeam} className="team-form">
       <h2>Create Team</h2>
        <FormField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        />
        <button type="submit" className="form-submit-button">
         {isEditing ? 'UPDATE' : 'CREATE'}
        </button>
      </form>

      {teamCreated && <p className="succes-message">{teamCreated}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    <div className="show-teams-container">
     <button
      className="show-teams-button"
      onClick={() => setShowTeams((prev) => !prev)}
      >
       {showTeams ? 'Hide Teams' : 'Show All Teams'}
      </button>
    </div>

     {showTeams && (
      <div className="teams-list">
      {teams.map((team) => 
      <div key={team.id}>
        <h2>
          {team.name}
        </h2>
        <button onClick={() => handleEdit(team)}>{editingTeamId === team.id ? 'Unedit' : 'Edit'}</button>
        <button onClick={() => handleDelete(team.id)}>Delete</button>
      </div> 
    )}
       </div>
     )}
    </div>
  );
}

export default TeamForm
