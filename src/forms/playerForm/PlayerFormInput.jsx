import React from 'react';
import FormField from '../../components/FormField.jsx';

function PlayerFormInput({ formData, teams, sports, handleChange, submitPlayer, isEditing }) {
  return (
    <form onSubmit={submitPlayer} className="player-form">
      <h2>{isEditing ? 'Edit Player' : 'Create Player'}</h2>
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
        <label>Sport</label>
        <select name="sportId" value={formData.sportId || ''} onChange={handleChange}>
          <option value="">Select a Sport</option>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.id}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label>Team</label>
        <select name="teamId" value={formData.teamId || ''} onChange={handleChange}>
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
  );
}

export default PlayerFormInput;
