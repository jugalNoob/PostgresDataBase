import React, { useState } from 'react';

function DeleteUserForm() {
  // State to store the user id
  const [userId, setUserId] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9000/delete-user/${userId}`, {
        method: 'DELETE'
      });

      if (response.status === 404) {
        throw new Error('User not found');
      } else if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      console.log('User deleted successfully');
      
      // Optionally reset the form field
      setUserId('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={userId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
}

export default DeleteUserForm;
