import React from 'react';
import FormField from '../../components/FormField';

function TeamFormInput({ formData, handleChange, submitTeam, isEditing }) {
  return (
    <form onSubmit={submitTeam} className="team-form">
      <h2 className="team-form-title">{isEditing ? 'Edit Team' : 'Create Team'}</h2>
      <FormField
        label="Team Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <button type="submit" className="team-form-submit-button">
        {isEditing ? 'Update Team' : 'Create Team'}
      </button>
    </form>
  );
}

export default TeamFormInput;
