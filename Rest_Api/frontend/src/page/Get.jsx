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
     <>


     <h1   key={index}>id::{user.id}</h1>
     <h1>{user.name}</h1>
     <h1>{user.email}</h1>
     <h1>{user.age}</h1>
     <h1>{user.country}</h1>
     <h1>{user.gender}</h1>
     </>
   
        ))}
      </ul>
    </div>
  );
}

export default Get;
