import React, {useState} from 'react';
import FormField from '../components/FormField.jsx';
import axios from 'axios';
import Teams from '../pages/Teams.jsx';
import './TeamForm.css';

function TeamForm() {
 const [formData, setFormData] = useState({
  name: '',
 });
 const [teamCreated, setTeamCreated] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const [showTeams, setShowTeams] = useState(false);

 const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
 }

 const submitTeam = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post('/api/teams/createTeam', formData);
   console.log('Team created:', response.data);

   setTeamCreated(`Team ${formData.name} created successfully`)
   setErrorMessage('')

   setFormData({ name: '' });

   setTimeout(() => setTeamCreated(''), 3000);
  } catch (error) {
   console.log('Error creating team:', error);

   setErrorMessage('Failed to create team. Please try again.');
   setTeamCreated('');
  }
 };

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
         CREATE
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
       <Teams />
       </div>
     )}
    </div>
  );
}

export default TeamForm
