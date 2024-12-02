import React from 'react';

function PlayerFilters({ searchTerm, handleSearch, selectedTeam, handleTeamFilter, selectedSport, handleSportFilter, clearFilters, teams, sports }) {
  return (
    <div className="player-filters">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="player-form-search"
      />
      <select value={selectedTeam} onChange={handleTeamFilter} className="player-form-filter">
        <option value="">All Teams</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <select value={selectedSport} onChange={handleSportFilter}
      className="player-form-filter">
        <option value="">All Sports</option>
        {sports.map((sport) => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>
      <button onClick={clearFilters} className="player-form-clear-button">
        Clear Filters
      </button>
    </div>
  );
}

export default PlayerFilters;
