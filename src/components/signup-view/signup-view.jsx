/** @format */

import { useState } from "react";

export const SignupView = () => {
	const [username, setUsername] = useState(""); // hooks to change component state

	const [password, setPassword] = useState("");

	const [confirmPassword, setconfirmPassword] = useState("");

	const [email, setEmail] = useState("");

	const [birthday, setBirthday] = useState("");

	const handleSubmit = (event) => {
		// POST request & response for new credential creation

		event.preventDefault();

		const data = {
			username: username,
			password: password,
			confirmPassword: confirmPassword,
			email: email,
			birthday: birthday,
		};

		fetch("https://high-triode-348322.lm.r.appspot.com/users", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		}).then((response) => {
			if (response.ok) {
				alert("Signup successful");
				window.location.reload();
			} else {
				alert("Signup failed");
			}
		});
	};

	return (
		// Signup form

		<form onSubmit={handleSubmit}>
			<label>
				{" "}
				Username:{" "}
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					minLength={5}
					maxLength={10}
				/>{" "}
			</label>

			<label>
				{" "}
				Password:{" "}
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength={8}
					maxLength={16}
				/>{" "}
			</label>

			<label>
				{" "}
				Confirm Password:{" "}
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setconfirmPassword(e.target.value)}
					required
					minLength={8}
					maxLength={16}
				/>{" "}
			</label>

			<label>
				{" "}
				Email:{" "}
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>{" "}
			</label>

			<label>
				{" "}
				Birth Date:{" "}
				<input
					type="date"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					required
				/>{" "}
			</label>

			<button type="Submit">submit</button>
		</form>
	);
};
