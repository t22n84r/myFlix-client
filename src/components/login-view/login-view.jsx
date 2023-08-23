import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./login-view.scss";

export const LoginView = (props) => {
  const [username, setUsername] = useState(""); // State for storing username
  const [password, setPassword] = useState(""); // State for storing password

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    const data = {
      username: username,
      password: password
    };

    // Send POST request to login endpoint
    fetch("https://high-triode-348322.lm.r.appspot.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => response.json()) // Parse response as JSON

      .then((data) => {
        console.log("Login response: ", data);

        if (data.user) {
          // If login successful, store user and token in local storage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          // Call parent component's callback function to indicate successful login
          props.onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed"); // Display alert for failed login
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    // Login form using React Bootstrap components
    <Card className="p-5 custom-card-loginView">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
