import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';
import axios from 'axios';
import Players from '../pages/Players.jsx';
import './PlayerForm.css';

function PlayerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const [playerCreated, setPlayerCreated] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPlayers, setShowPlayers] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/players/createPlayer', formData);
      console.log('Player created:', response.data);

      // Set success message
      setPlayerCreated(`Player "${formData.firstName} ${formData.lastName}" created successfully`);
      setErrorMessage(''); // Clear any previous error messages

      // Clear form
      setFormData({ firstName: '', lastName: '' });

      // Automatically clear success message after 3 seconds
      setTimeout(() => setPlayerCreated(''), 3000);
    } catch (error) {
      console.error('Error creating player:', error);

      // Set error message
      setErrorMessage('Failed to create player. Please try again.');
      setPlayerCreated(''); // Clear any previous success messages
    }
  };

return (
  <div className="player-form-container">
    <form onSubmit={submitPlayer} className="player-form">
      <h2>Create Player</h2>
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
      <button type="submit" className="form-submit-button">
        CREATE
      </button>
    </form>

    {/* Conditional message rendering */}
    {playerCreated && <p className="success-message">{playerCreated}</p>}
    {errorMessage && <p className="error-message">{errorMessage}</p>}

    {/* Show Players Button */}
    <div className="show-players-container">
      <button
        className="show-players-button"
        onClick={() => setShowPlayers((prev) => !prev)}
      >
        {showPlayers ? 'Hide Players' : 'Show All Players'}
      </button>
    </div>

    {/* Players List */}
    {showPlayers && (
      <div className="players-list">
        <Players />
      </div>
    )}
  </div>
);

}

export default PlayerForm;
