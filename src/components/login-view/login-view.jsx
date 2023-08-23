/** @format */

import { useState } from "react";

export const LoginView = (props) => {
	const [username, setUsername] = useState(""); // hooks to change component state

	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		// POST request & response for credentials

		event.preventDefault();

		const data = {
			username: username,
			password: password,
		};

		fetch("https://high-triode-348322.lm.r.appspot.com/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())

			.then((data) => {
				console.log("Login response: ", data);

				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));

					localStorage.setItem("token", data.token);

					props.onLoggedIn(data.user, data.token);
				} else {
					alert("Login failed");
				}
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	};

	return (
		// Login form

		<form onSubmit={handleSubmit}>
			<label>
				Username:{" "}
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</label>

			<label>
				Password:{" "}
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>

			<button type="submit">Submit</button>
		</form>
	);
};
