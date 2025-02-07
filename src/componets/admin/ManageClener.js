import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageCleaners = () => {



    const [cleaners, setCleaners] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Phone_no: '',
        Gender: '',
        Address:'',
        Role: 'Clerner',
        Email:'',
        Password:''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isViewing, setIsViewing] = useState(false);  // State to handle view mode
    const [editCleanerId, setEditCleanerId] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        const fetchCleaners = async () => {
            try {
                const response = await axios.get("https://djaback.onrender.com/api/Cleaner/");
                setCleaners(response.data);
            } catch (error) {
                console.error("Error fetching cleaners:", error);
            }
        };

        fetchCleaners();
    }, []);

    const openCleanerForm = (cleaner = null, mode = 'edit') => {
        if (cleaner) {
            setFormData({
                Name: cleaner.Name,
                Phone_no: cleaner.Phone_no,
                Gender: cleaner.Gender,
                Address:cleaner.Address,
                Role: cleaner.Role,
                Email:cleaner.Email,
                Password:cleaner.Password
            });
            setEditCleanerId(cleaner.id);
            if (mode === 'view') {
                setIsViewing(true);  // Set to view mode
                setIsEditing(false);
                setIsAdding(false);
            } else if(mode === 'edit') {
                setIsEditing(true);  // Set to edit mode
                setIsViewing(false);
                setIsAdding(false);
            }else if(mode === 'add'){
                setIsEditing(false);  // Set to edit mode
                setIsViewing(false);
                setIsAdding(true);
            setFormData({ Name: '', Phone_no: '', Gender: '', Address:'', Role: 'Clerner',Email:'', Password:''});
        }}
        setShowForm(true); // Show the form when clicked
    };

    const closeCleanerForm = () => {
        setShowForm(false); // Hide the form when clicked
        setFormData({ Name: '', Phone_no: '', Gender: '', Address:'', Role: '',Email:'', Password:''});
        setIsEditing(false);
        setIsViewing(false);
        setEditCleanerId(null);
    };

    const deleteCleaner = async (cleanerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this cleaner?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/Cleaner/${cleanerId}`);
                setCleaners(cleaners.filter(cleaner => cleaner.id !== cleanerId));
            } catch (error) {
                console.error("Error deleting cleaner:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update cleaner
                await axios.put(`http://127.0.0.1:8000/api/Cleaner/${editCleanerId}`, {
                    Name: formData.Name,
                    Phone_no: formData.Phone,
                    Gender: formData.Gender,
                    Address:formData.Address,
                    Role: formData.Role,
                    Email:formData.Email,
                    Password:formData.Password
                });
                setCleaners(cleaners.map(cleaner => cleaner.id === editCleanerId 
                    ? { ...cleaner, Name: formData.Name, Phone_no: formData.Phone, Gender: formData.Gender, Role: formData.Role } 
                    : cleaner
                ));
            } else if(isAdding) {
                // Add new cleaner
                const response = await axios.post("http://127.0.0.1:8000/api/Cleaner/",{
                    Name: formData.Name,
                    Phone_no: formData.Phone_no,
                    Gender: formData.Gender,
                    Address:formData.Address,
                    Role: formData.Role,
                    Email:formData.Email,
                    Password:formData.Password
                    
                });
                setCleaners([...cleaners, response.data]); // Add the new cleaner to the state
                alert("New Cleaner Added Successfuly");

                setTimeout(() => {
                    window.location.reload();
                  }, 1000); // 2000 milliseconds = 2 seconds
            }
            
        } catch (error) {
            console.error("Error submitting cleaner data:", error);
            alert(error.response ? error.response.data : "Error while adding cleaner.");
        }
    };

    return (
        <>
            <Sidebar />
           * <div className="manage">
                <h1>Manage Cleaners</h1>

               <div className="table-actions" style={{ marginBottom: "30px" }}>
                {cleaners.length > 0 && (
    <button className="add-btn" onClick={() => openCleanerForm(cleaners[0], 'add')}>
        Add Cleaner
    </button>
)}
</div>



                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cleaners.map((cleaner) => (
                                <tr key={cleaner.id}>
                                    <td>{cleaner.Name}</td>
                                    <td>{cleaner.Phone_no}</td>
                                    <td>{cleaner.Gender}</td>
                                    <td>{cleaner.Role}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => openCleanerForm(cleaner, 'view')}>View</button>
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => openCleanerForm(cleaner, 'edit')}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => deleteCleaner(cleaner.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

<br></br><br></br>
<br></br>


                {/* Cleaner form container */}
                <div id="cleanerForm" className={`form-container ${showForm ? 'show' : ''}`}>
                    <h2>{isEditing ? "Edit Cleaner" : isViewing ? "View Cleaner" :  "Add Cleaner"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="Name">Name:</label>
                        <input 
                            type="text" 
                            id="Name" 
                            name="Name" 
                            value={formData.Name} 
                            onChange={handleInputChange} 
                            placeholder="Enter Name" 
                            required 
                            readOnly={isViewing} // Make input read-only in view mode
                        />

                        <label htmlFor="Phone">phone:</label>
                        <input 
                            type="text" 
                            id="Phone" 
                            name="Phone_no" 
                            value={formData.Phone_no} 
                            onChange={handleInputChange} 
                            placeholder="Enter phone number" 
                            required 
                            readOnly={isViewing} // Make input read-only in view mode
                        />

                        <label htmlFor="Gender">Gender:</label>
                        <select 
                            id="Gender" 
                            name="Gender" 
                            value={formData.Gender} 
                            onChange={handleInputChange} 
                            required
                            disabled={isViewing} // Disable select field in view mode
                        >
                            
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        <label htmlFor="Address">  Address:</label>
                        <input 
                            type="text" 
                            id="Address" 
                            name="Address" 
                            value={formData.Address} 
                            onChange={handleInputChange} 
                            placeholder="Enter  Address" 
                            required 
                            readOnly={isViewing} // Make input read-only in view mode
                        />

                        <label htmlFor="Role">Role:</label>
                        <select 
                            id="Role" 
                            name="Role" 
                            value={formData.Role} 
                            onChange={handleInputChange} 
                            required
                            disabled={isViewing} // Disable select field in view mode
                        >
                            
                            <option value="Clerner">Cleaner</option>
                        </select>
                          <label htmlFor="Email">Email:</label>
                        <input 
                            type="email" 
                            id="Email" 
                            name="Email" 
                            value={formData.Email} 
                            onChange={handleInputChange} 
                            placeholder="Enter   Email" 
                            required 
                            readOnly={isViewing} // Make input read-only in view mode
    
                        />
                        <label htmlFor="password"> Password:</label>
                        <input 
                            type="password" 
                            id="Password" 
                            name="Password" 
                            value={formData.Password} 
                            onChange={handleInputChange} 
                            placeholder="Enter   Password" 
                            required 
                            readOnly={isViewing} // Make input read-only in view mode
                        
                          />

                        <div className="form-actions">
                            <button type="submit" disabled={isViewing}>{isEditing ? "Update Cleaner" : isViewing ? "View Cleaner" : "Add Cleaner"}</button>
                            <button type="button" onClick={closeCleanerForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManageCleaners;
