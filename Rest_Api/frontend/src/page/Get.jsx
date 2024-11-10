import React, { useEffect, useState } from 'react';

function Get() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:9000/Data')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Name: {user.name}, Email: {user.email}, Password: {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Get;
