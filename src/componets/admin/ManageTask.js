import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';

const ManageTask = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        task_name: '',
        description: '',
        status: '',
        location: '',
        date: ''
    });
    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks when component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/Task");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Open task form for creating a new task or editing an existing task
    const openTaskForm = (task = null) => {
        if (task) {
            // If editing an existing task
            setEditingTask(task);
            setFormData({
                task_name: task.task_name,
                description: task.Description,
                status: task.Status,
                location: task.location,
                date: task.Date,
            });
        } else {
            // If adding a new task
            setEditingTask(null);
            setFormData({
                task_name: '',
                description: '',
                status: '',
                location: '',
                date: ''
            });
        }
        document.getElementById('taskForm').style.display = 'block';
    };

    const closeTaskForm = () => {
        document.getElementById('taskForm').style.display = 'none';
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission (add or update task)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTask) {
                // Update task (PUT request)
                await axios.put(`http://127.0.0.1:8000/api/Task/${editingTask.id}`, formData);
                setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, ...formData } : task));
            } else {
                // Add new task (POST request)
                const response = await axios.post("http://127.0.0.1:8000/api/Task", formData);
                setTasks([...tasks, response.data]);
            }
            closeTaskForm(); // Close the form after submission
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    // Handle task deletion
    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/Task/${taskId}`);
                setTasks(tasks.filter(task => task.id !== taskId)); // Remove task from the list
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    return (
        <>
            <Sidebar />
            <div className="manage" style={{ width: "110%", marginRight: "500px", marginLeft: "100px", marginBottom: "400px" }}>
                <h1>Manage Tasks</h1>
                <div className="table-actions">
                    <button className="add-btn" onClick={() => openTaskForm()}>Add Task</button>
                </div>
                <div className="table-container" style={{ width: "65%", marginLeft: "280px", marginTop: "30px" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.task_name}</td>
                                    <td>{task.Description}</td>
                                    <td>{task.Status}</td>
                                    <td>{task.location}</td>
                                    <td>{task.Date}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => openTaskForm(task)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="taskForm" className="form-container" style={{ display: 'none' }}>
                    <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task_name">Task Name:</label>
                        <input
                            type="text"
                            id="task_name"
                            name="task_name"
                            value={formData.task_name}
                            onChange={handleInputChange}
                            placeholder="Enter task name"
                            required
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Enter task description"
                            required
                        ></textarea>

                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Select Status --</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>

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

                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />

                        <button type="submit" className="submit-btn">
                            {editingTask ? 'Update Task' : 'Save Task'}
                        </button>
                        <button type="button" className="reset-btn" onClick={closeTaskForm}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManageTask;
