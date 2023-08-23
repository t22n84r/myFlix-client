/** @format */

import { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel
} from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
  // State variables for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [inputType, setInputType] = useState("text");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      birthday: birthday
    };

    // POST request to create new user
    fetch("https://high-triode-348322.lm.r.appspot.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  // Handle focus event for birth date input
  const handleFocus = () => {
    setInputType("date");
  };

  return (
    // Signup form card
    <Card className="p-5 custom-card-signupView">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Username field */}
          <FormGroup controlId="formUsername" className="mb-3">
            <FormControl
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={5}
              maxLength={10}
              placeholder="Username"
            />
          </FormGroup>

          {/* Password field */}
          <FormGroup controlId="formPassword" className="mb-3">
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={16}
              placeholder="Password"
            />
          </FormGroup>

          {/* Confirm Password field */}
          <FormGroup controlId="formConfirmPassword" className="mb-3">
            <FormControl
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              maxLength={16}
              placeholder="Confirm Password"
            />
          </FormGroup>

          {/* Email field */}
          <FormGroup controlId="formEmail" className="mb-3">
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </FormGroup>

          {/* Birth Date field */}
          <FormGroup controlId="formBirthday" className="mb-3">
            <FormControl
              type={inputType}
              placeholder="Birth Date"
              onFocus={handleFocus}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </FormGroup>

          {/* Submit button */}
          <div className="d-grid gap-2">
            <Button type="Submit">Sign Up</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
