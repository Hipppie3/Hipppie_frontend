import React from 'react';

function TeamList({ teams, handleEdit, handleDelete, editingTeamId }) {
  return (
    <table className="team-form-table">
      <thead>
        <tr>
          <th className="team-form-header">Team Name</th>
          <th className="team-form-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team.id} className="team-form-row">
            <td className="team-form-cell">{team.name}</td>
            <td className="team-form-cell team-form-actions">
              <button
                onClick={() => handleEdit(team)}
                className="team-form-edit-button"
              >
                {editingTeamId === team.id ? 'Unedit' : 'Edit'}
              </button>
              <button
                onClick={() => handleDelete(team.id)}
                className="team-form-delete-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamList;
