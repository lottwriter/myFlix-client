import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import React from 'react';

export const LoginView = ({ onLoggedIn, user, token }) => {
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
      console.log(data.token)
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3" />
      </Form.Group>
    
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};