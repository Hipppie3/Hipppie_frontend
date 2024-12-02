import React from 'react';

function PlayerTable({ players, handleEdit, handleDelete, editingPlayerId }) {
  return (
    <table className="player-form-table">
      <thead>
        <tr>
          <th className="player-form-header">First Name</th>
          <th className="player-form-header">Last Name</th>
          <th className="player-form-header">Team</th>
          <th className="player-form-header">Sport</th>
          <th className="player-form-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id} className="player-form-row">
            <td className="player-form-cell">{player.firstName}</td>
            <td className="player-form-cell">{player.lastName}</td>
            <td className="player-form-cell">{player?.team?.name || ''}</td>
            <td className="player-form-cell">{player?.sport?.name || ''}</td>
            <td className="player-form-cell">
              <button
                className="player-form-edit-button"
                onClick={() => handleEdit(player)}
              >
                {editingPlayerId === player.id ? 'Unedit' : 'Edit'}
              </button>
              <button
                className="player-form-delete-button"
                onClick={() => handleDelete(player.id)}
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

export default PlayerTable;
