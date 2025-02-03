import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () =>{

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(''); // Clear previous error message
      setSuccessMessage(''); // Clear previous success message

      try {
        const response = await axios.post('http://localhost:8000/api/Cleaner_Login/', {
          Email,
          Password,
        });
  
        // If login is successful, delay redirection to the dashboard
        if (response.status === 200) {
          sessionStorage.setItem('Email', Email);
          setSuccessMessage('Login successfully Please Wait....');

          // Add a 3-second delay before redirecting
          setTimeout(() => {
            navigate('/dashUser'); // Redirect to your dashboard route
          }, 3000);
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message); // Show error message from server
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      }
    };

    return(
        <div class="form-container-login">
        <h1>Cleaner Login</h1>
        <form onSubmit={handleSubmit}>
                        <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="Email" name="Email"
                 placeholder="Enter your email" 
                 value={Email}
                 onChange={(e) => setEmail(e.target.value)}
                  required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="Password" 
                name="Password" placeholder="Enter your password" 
                value={Password}
                 onChange={(e) => setPassword(e.target.value)}
                required/>
                <br></br>

                {errorMessage && (
                            <p>
                               <i className="fas fa-exclamation-circle text-danger"></i> {errorMessage}
                            </p>
                        )}
            </div>
            <button type="submit" class="btn">Login</button>
            <p>Don't have an account? <Link to='/reg'>Register here</Link></p>
        </form>

        {successMessage && (
        <p
          className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3"
          role="alert"
          style={{ zIndex: 1050 }}
        >
          {successMessage} &nbsp;
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          
        </p>
      )}




    </div>
    );
}

export default Login;
