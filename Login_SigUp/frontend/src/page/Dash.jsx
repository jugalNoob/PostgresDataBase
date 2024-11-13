import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Dash() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const callAbout = async () => {
      let token = localStorage.getItem("usersdatatoken");


      const res = await fetch("http://localhost:9000/protected", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

      const data = await res.json();
      setUserData(data)
console.log(data)

if (data.status === 401 || !data) {
        
      } else {
          console.log("user verify");
       
      }
    };

    callAbout();
  }, []);

  return (
    <div>

<h1>name: {userData ? userData.name : 'Name not available'}</h1>
<h1>email: {userData ? userData.email : 'Email not available'}</h1>
<h3>password: {userData ? userData.password : 'Password not available'}</h3>

</div>

         




  );
}

export default Dash;