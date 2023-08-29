import { Form, FormGroup, FormLabel, FormControl, Button, Col, Row, Modal } from "react-bootstrap";
import "./profile-view.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = (props) => {

   // State variables
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [email, setEmail] = useState("");
   const [birthday, setBirthday] = useState("");
   const [inputType, setInputType] = useState("text");
   const [user, setUser] = useState(props.profileView.user);
   const [showConfirmModal, setShowConfirmModal] = useState(false);
   const navigate = useNavigate();

   // Handle form submission
   const handleSubmit = (event) => {
      event.preventDefault();

   // Create a new object with only non-empty values
   const requestData = {};
   if (username) requestData.username = username;
   if (password) requestData.password = password;
   if (confirmPassword) requestData.confirmPassword = confirmPassword;
   if (email) requestData.email = email;
   if (birthday) requestData.birthday = birthday;

   // Check if there are any properties in the requestData object
   if (Object.keys(requestData).length === 0) {
      alert("No changes to submit.");
      return;
   }

   // PUT request to update user
   fetch(`https://high-triode-348322.lm.r.appspot.com/users/${props.profileView.user.username}`, {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: { 
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}` 
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Return the response JSON data
        } else {
          throw new Error("Change failed"); // Throw an error for failed requests
        }
      })
      .then((updatedUser) => {
        // Update the user details in your state based on the updatedUserData
        setUser((prevUser) => {
         return {
           ...prevUser, // Copy existing user properties
           ...updatedUser, // Update with new user properties
         };
         });

         // Update user data in localStorage
         localStorage.setItem("user", JSON.stringify({ ...props.profileView.user, ...updatedUser }));
         alert("Change successful");
         window.location.reload();
      })
      .catch((error) => {
        alert(error.message); // Handle error messages here
      });
    
  };

   // Human-readable date format
   const bDay = props.profileView.user.birthday;
   const formattedDate = bDay.split('T')[0];
   // Handle focus event for birth date input
   const handleFocus = () => {
      setInputType("date");
   };

   // Handle modal open & close event
   const openConfirmModal = () => {
      setShowConfirmModal(true);
   };
   const closeConfirmModal = () => {
      setShowConfirmModal(false);
   };

   const handleDeleteAccount = () => {

      fetch(
         "https://high-triode-348322.lm.r.appspot.com/users",
         {
           method: 'DELETE',
           headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.profileView.token}`
           },
           body: JSON.stringify({"username": props.profileView.user.username})
         })
         .then((response) => {
           if (response.ok) {
            return response.text(); 
           } else {
             throw new Error('Delete account failed');
           }
         })
         .then((responseText) => {
            closeConfirmModal();
            alert(responseText);
            props.onAccountDeleted();
         })
         .catch((error) => {
            alert(error.message);
         });
   };

   return (

      <Col className="custom-profileView my-5 w-100">

         <Form className="custom-form my-5" onSubmit={handleSubmit}>
            {/* Username field */}
            <FormGroup className="mb-3">
               <FormLabel htmlFor="formUsername">Username</FormLabel>
               <div>
                  <Form.Text id="currentUsername" className="fs-6 fw-semibold bg-info rounded p-1">Current username: {props.profileView.user.username}</Form.Text>
               </div>
               <FormControl
                  type="text"
                  id="formUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
            <FormGroup className="mb-3">
               <FormLabel htmlFor="formPassword">Password</FormLabel> 
               <FormControl
                  type="password"
                  id="formPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <FormGroup className="mb-3">
               <FormLabel htmlFor="formConfirmPassword">Confirm Password</FormLabel> 
               <FormControl
                  type="password"
                  id="formConfirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            <FormGroup className="mb-3">
               <FormLabel htmlFor="formEmail">Email</FormLabel>
               <div>
                  <Form.Text id="currentEmail" className="fs-6 fw-semibold bg-info rounded p-1">Current Email: {props.profileView.user.email}</Form.Text>
               </div>
               <FormControl
                  type="email"
                  id="formEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
               />
            </FormGroup>
   
            {/* Birth Date field */}
            <FormGroup className="mb-3">
               <FormLabel htmlFor="formBirthday">Birth Date</FormLabel>
               <div>
                  <Form.Text id="currentBirthday" className="fs-6 fw-semibold bg-info rounded p-1">Current Birthday (YYYY-MM-DD): {formattedDate}</Form.Text>
               </div>
               <FormControl
                  type={inputType}
                  id="formBirthday"
                  placeholder="Select your birth date"
                  onFocus={handleFocus}
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
               />
            </FormGroup>
   
            {/* Submit button */}
            <div className="d-grid gap-2">
            <Button type="Submit" aria-label="Save">Save</Button>
            </div>
         </Form>

         <div className="d-flex justify-content-end">
            <Button variant="danger"
               size="lg"
               aria-label="Delete account"
               onClick={openConfirmModal}
            >Delete account</Button>
         </div>

         {/* Display favorite movie cards */}
         <hr />
         <h2 className="text-center">Favorite Movies</h2>

         <Row sm={1} md={2} lg={3} xl={4} gap={4}>
            {props.profileView.user.favoriteMovies.map((movieId) => {
               const favoriteMovie = props.profileView.movies.find((movie) => movie.id === movieId);
               return (
                  <Col 
                  key={favoriteMovie.id}
                  className="d-flex flex-column justify-content-center align-items-center ">
                     <MovieCard movieCard={favoriteMovie} />
                  </Col>
               );
            })}
         </Row>

            
         <Modal show={showConfirmModal} onHide={closeConfirmModal}>
            <Modal.Header closeButton>
               <Modal.Title>Confirm Account Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure you want to delete your account? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={closeConfirmModal}>
               Cancel
               </Button>
               <Button variant="danger" onClick={handleDeleteAccount}>
               Delete Account
               </Button>
            </Modal.Footer>
         </Modal>
      </Col>
   );
};

