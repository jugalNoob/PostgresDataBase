import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const timeoutRef = useRef(null); // useRef to persist timeout between renders
  const [count, setCount] = useState(0); // useState to keep track of clicks

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting
    setCount(count + 1); // Update count state
    console.log("Count:", count + 1); // Track click count

    clearTimeout(timeoutRef.current); // Clear previous timeout if it exists
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:9000/add-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({  email, password: pass })
        });

        const res = await response.json();
        console.log(res , 'i am result')
        localStorage.setItem("usersdatatoken" , res.token)

        if (res.status === 201) {
          alert("Check your form");
        } else {
          console.log(res, 'user information'); // Assuming 'user' is part of the response
          // Uncomment and use local storage or navigate as needed
          // localStorage.setItem("usersdatatoken", res.result.token);
          // localStorage.setItem("usersdatatokens", res.result.name);
          navigate("/dash");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div>
      <form>
       
        <br />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Click form</button>
      </form>
    </div>
  );
}

export default Login;