import { useState, useEffect } from "react";

export const LoginView = ({ onLoggedIn }) => {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movieflixapi-267bf627ca0c.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};