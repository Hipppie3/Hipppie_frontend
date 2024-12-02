// import React, { useState, useEffect } from 'react';
// import FormField from '../components/FormField.jsx';
// import axios from 'axios';
// import './TeamForm.css';

// function TeamForm() {
//   const [formData, setFormData] = useState({ name: '' });
//   const [teams, setTeams] = useState([]);
//   const [teamCreated, setTeamCreated] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingTeamId, setEditingTeamId] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showTeams, setShowTeams] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEdit = (team) => {
//     if (editingTeamId === team.id) {
//       setIsEditing(false);
//       setFormData({ name: '' });
//       setEditingTeamId(null);
//     } else {
//       setIsEditing(true);
//       setFormData({ name: team.name });
//       setEditingTeamId(team.id);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/teams');
//         setTeams(response.data.teams);
//       } catch (error) {
//         console.error('Error fetching teams:', error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   const submitTeam = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await axios.put(
//           `/api/teams/${editingTeamId}`,
//           formData
//         );
//         const updatedTeam = response.data.team;
//         setTeams((prev) =>
//           prev.map((team) =>
//             team.id === editingTeamId ? updatedTeam : team
//           )
//         );
//         setTeamCreated(`Team "${formData.name}" updated successfully`);
//       } else {
//         const response = await axios.post('/api/teams/createTeam', formData);
//         setTeams((prev) => [...prev, response.data.team]);
//         setTeamCreated(`Team "${formData.name}" created successfully`);
//       }
//       setFormData({ name: '' });
//       setEditingTeamId(null);
//       setIsEditing(false);
//       setErrorMessage('');
//       setTimeout(() => setTeamCreated(''), 3000);
//     } catch (error) {
//       console.error('Error creating/updating team:', error);
//       setErrorMessage('Failed to create/update team. Please try again.');
//     }
//   };

//   const handleDelete = async (teamId) => {
//     try {
//       await axios.delete(`/api/teams/${teamId}`);
//       setTeams((prev) => prev.filter((team) => team.id !== teamId));
//     } catch (error) {
//       console.error(
//         `Failed to delete team with id:${teamId}:`,
//         error.response?.data || error.message
//       );
//       setErrorMessage('Failed to delete team. Please try again.');
//     }
//   };

//   // Filter teams based on the search term
//   const filteredTeams = teams.filter((team) =>
//     team.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="team-form-container">
//       <form onSubmit={submitTeam} className="team-form">
//         <h2 className="team-form-title">Create Team</h2>
//         <FormField
//           label="Team Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <button type="submit" className="team-form-submit-button">
//           {isEditing ? 'Update Team' : 'Create Team'}
//         </button>
//       </form>

//       {/* Messages */}
//       {teamCreated && (
//         <p className="team-form-success-message">{teamCreated}</p>
//       )}
//       {errorMessage && (
//         <p className="team-form-error-message">{errorMessage}</p>
//       )}

//       {/* Show Teams Button */}
//       <div className="team-form-show-teams-container">
//         <button
//           className="team-form-show-teams-button"
//           onClick={() => setShowTeams((prev) => !prev)}
//         >
//           {showTeams ? 'Hide Teams' : 'Show Teams'}
//         </button>
//       </div>

//       {/* Teams List with Search */}
//       {showTeams && (
//         <div className="team-form-teams-list-container">
//           <div className="team-form-controls">
//             <input
//               type="text"
//               placeholder="Search by team name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="team-form-search"
//             />
//             <button
//               onClick={() => setSearchTerm('')}
//               className="team-form-clear-button"
//             >
//               Clear Search
//             </button>
//           </div>

//           <table className="team-form-table">
//             <thead>
//               <tr>
//                 <th className="team-form-header">Team Name</th>
//                 <th className="team-form-header">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTeams.map((team) => (
//                 <tr key={team.id} className="team-form-row">
//                   <td className="team-form-cell">{team.name}</td>
//                   <td className="team-form-cell team-form-actions">
//                     <button
//                       onClick={() => handleEdit(team)}
//                       className="team-form-edit-button"
//                     >
//                       {editingTeamId === team.id ? 'Unedit' : 'Edit'}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(team.id)}
//                       className="team-form-delete-button"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TeamForm;
