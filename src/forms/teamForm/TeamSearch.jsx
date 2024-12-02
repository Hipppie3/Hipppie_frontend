import React from 'react';

function TeamSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="team-form-controls">
      <input
        type="text"
        placeholder="Search by team name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="team-form-search"
      />
      <button
        onClick={() => setSearchTerm('')}
        className="team-form-clear-button"
      >
        Clear Search
      </button>
    </div>
  );
}

export default TeamSearch;
