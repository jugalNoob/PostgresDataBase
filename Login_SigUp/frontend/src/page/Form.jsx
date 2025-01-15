import React, { useEffect, useRef, useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const timeoutRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCount((prevCount) => prevCount + 1); // Correct way to update count

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:9000/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password: pass }),
        });

        const res = await response.json();
        if (response.status === 201) {
          console.log(res)
          // alert("User added successfully");
        } else {
          console.error("Error adding user:", res);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("Failed to add user. Please try again.");
      }
    }, 2000);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Click form</button>
      </form>
      <p>Form submitted {count} times</p>
    </div>
  );
}

export default Form;
