import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Phone_no: '',
        Gender: '',
        Address:'',
        Role: 'Clerner',
        Email:'',
        Password:''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/Cleaner/", {
                Name: formData.Name,
        Phone_no:formData.Phone_no,
        Gender:formData.Gender,
        Address:formData.Address,
        Role:formData.Role,
        Email:formData.Email,
        Password:formData.Password,
            });

            if (response.status === 200) {
                alert("Registration successful!");
                setTimeout(() => {
                    window.location.reload();
                  }, 1000); // 2000 milliseconds = 2 seconds
                // Redirect to login page
            }
        } catch (error) {
            console.error("Error during registration:", error.response.data);
            alert("Registration failed!");
        }
    };

    return (
        
                 <div>
                  <div className="form-container" style={{display:'block'}}>
                    <h2>Cleaner Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="Name">Name:</label>
                        <input 
                            type="text" 
                            id="Name" 
                            name="Name" 
                            value={formData.Name} 
                            onChange={handleChange} 
                            placeholder="Enter Name" 
                            required 
                            
                        />

                        <label htmlFor="Phone">phone:</label>
                        <input 
                            type="text" 
                            id="Phone_no" 
                            name="Phone_no" 
                            value={formData.Phone_no} 
                            onChange={handleChange} 
                            placeholder="Enter phone number" 
                            required 
                            
                        />

                   <label htmlFor="Gender">Gender:</label>
                        <select 
                            id="Gender" 
                            name="Gender" 
                            value={formData.Gender} 
                            onChange={handleChange} 
                            required
                             // Disable select field in view mode
                        >
                            
                            <option value="FEMALE">Female</option>
                            <option value="  MALE">Male</option>
                        </select>
                        <label htmlFor="Address">  Address:</label>
                        <input 
                            type="text" 
                            id="Address" 
                            name="Address" 
                            value={formData.Address} 
                            onChange={handleChange} 
                            placeholder="Enter  Address" 
                            required 
                        />

                        <label htmlFor="Role">Role:</label>
                        <select 
                            id="Role" 
                            name="Role" 
                            value={formData.Role} 
                            onChange={handleChange} 
                            required
                        >
                            
                            <option value="Clerner">Cleaner</option>
                        </select>
                          <label htmlFor="Email">Email:</label>
                        <input 
                            type="email" 
                            id="Email" 
                            name="Email" 
                            value={formData.Email} 
                            onChange={handleChange} 
                            placeholder="Enter   Email" 
                            required 
    
                        />
                        <label htmlFor="password"> Password:</label>
                        <input 
                            type="password" 
                            id="Password" 
                            name="Password" 
                            value={formData.Password} 
                            onChange={handleChange} 
                            placeholder="Enter   Password" 
                            required 
                        
                          />

                        <div className="form-actions">
                            <button type="submit">Create Account</button>

            <p>Already have an account? <Link to='/CleanerLogin'>Login here</Link></p>
                        </div>
                    </form>
                </div>
            
                 </div>     
                      
    );
};

export default Register;
