import React from 'react'

function practice() {
  return (
    <div>
      
      {showPlayers && (
        <div className="players-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Team</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{`${player.firstName} ${player.lastName}`}</td>
                  <td>{player.team ? player.team.name : 'No Team'}</td>
                  <td>
                    <button onClick={() => console.log('Edit player', player.id)}>Edit</button>
                    <button onClick={() => console.log('Delete player', player.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );


}

export default practice
