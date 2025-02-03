import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';

const ManageFacility = () => {
    const [Facilities, setFacility] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
    });
    const [editingFacility, setEditingFacility] = useState(null);

    // Fetch all facilities
    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/Facility");
                setFacility(response.data);
            } catch (error) {
                console.error("Error fetching Facility:", error);
            }
        };

        fetchFacility();
    }, []);

    // Open the form for adding or editing a facility
    const openFacilityForm = (facility = null) => {
        if (facility) {
            setEditingFacility(facility);
            setFormData({
                name: facility.Name,
                location: facility.Location,
                description: facility.Description,
            });
        } else {
            setEditingFacility(null);
            setFormData({
                name: '',
                location: '',
                description: '',
            });
        }
        document.getElementById('facilityForm').style.display = 'block';
    };

    const closeFacilityForm = () => {
        document.getElementById('facilityForm').style.display = 'none';
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission (add or update facility)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFacility) {
                // Update facility
                await axios.put(`http://127.0.0.1:8000/api/Facility/${editingFacility.id}`, formData);
                setFacility(Facilities.map((facility) => (facility.id === editingFacility.id ? { ...facility, ...formData } : facility)));
                
            } else {
                // Add new facility
                const response = await axios.post("http://127.0.0.1:8000/api/Facility", formData);
                setFacility([...Facilities, response.data]);
            }
            closeFacilityForm(); // Close the form after submission
        } catch (error) {
            console.error("Error saving facility:", error);
        }
    };

    // Handle deleting a facility
    const handleDelete = async (facilityId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this facility?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/Facility/${facilityId}`);
                setFacility(Facilities.filter(facility => facility.id !== facilityId));
            } catch (error) {
                console.error("Error deleting facility:", error);
            }
        }
    };

    return (
        <>
            <Sidebar />
            <div className="manage" style={{ width: "110%", marginRight: "500px", marginLeft: "100px", marginBottom: "400px" }}>
                <h1>Manage Facilities</h1>
                <div className="table-actions">
                    <button className="add-btn" onClick={() => openFacilityForm()}>Add Facility</button>
                </div>
                <div className="table-container" style={{ width: "65%", marginLeft: "280px", marginTop: "30px" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Facilities.map((facility) => (
                                <tr key={facility.id}>
                                    <td>{facility.Name}</td>
                                    <td>{facility.Location}</td>
                                    <td>{facility.Description}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => openFacilityForm(facility)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(facility.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div id="facilityForm" className="form-container" style={{ display: 'none' }}>
                    <h2>{editingFacility ? 'Edit Facility' : 'Add Facility'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Facility Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter facility name"
                            required
                        />

                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter location"
                            required
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                            rows="4"
                            required
                        ></textarea>

                        <button type="submit" className="submit-btn">
                            {editingFacility ? 'Update Facility' : 'Save Facility'}
                        </button>
                        <button type="button" className="reset-btn" onClick={closeFacilityForm}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManageFacility;
