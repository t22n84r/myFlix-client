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
						<FormLabel htmlFor="formUsername">Username</FormLabel> 
						<FormControl
							type="text"
							id="formUsername"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							minLength={5}
							maxLength={10}
							placeholder="Enter your username"
							aria-describedby="usernameHelpBlock"
						/>
						<Form.Text id="usernameHelpBlock" className="text-warning">
							Must be between 5 and 10 characters.
						</Form.Text>
					</FormGroup>
		
					{/* Password field */}
					<FormGroup controlId="formPassword" className="mb-3">
						<FormLabel htmlFor="formPassword">Password</FormLabel> 
						<FormControl
							type="password"
							id="formPassword"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={8}
							maxLength={16}
							placeholder="Enter your password"
							aria-describedby="passwordHelpBlock"
						/>
						<Form.Text id="passwordHelpBlock" className="text-warning">
							Must be between 8 and 16 characters.
						</Form.Text>
					</FormGroup>
		
					{/* Confirm Password field */}
					<FormGroup controlId="formConfirmPassword" className="mb-3">
						<FormLabel htmlFor="formConfirmPassword">Confirm Password</FormLabel> 
						<FormControl
							type="password"
							id="formConfirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							minLength={8}
							maxLength={16}
							placeholder="Confirm your password"
							aria-describedby="confirmPasswordHelpBlock"
						/>
						<Form.Text id="confirmPasswordHelpBlock" className="text-warning">
							Must match the password above.
						</Form.Text>
					</FormGroup>
		
					{/* Email field */}
					<FormGroup controlId="formEmail" className="mb-3">
						<FormLabel htmlFor="formEmail">Email</FormLabel> 
						<FormControl
							type="email"
							id="formEmail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Enter your email"
						/>
					</FormGroup>
		
					{/* Birth Date field */}
					<FormGroup controlId="formBirthday" className="mb-3">
						<FormLabel htmlFor="formBirthday">Birth Date</FormLabel> 
						<FormControl
							type={inputType}
							id="formBirthday"
							placeholder="Select your birth date"
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
