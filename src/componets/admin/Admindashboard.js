import Sidebar from "../Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Admindashboard =()=>{
    // student should login to access this page
    const navigate = useNavigate(); 
    const email = sessionStorage.getItem('email'); 

    useEffect(() => {    
        if (!email) {
            console.error('No email found in sessionStorage');
            navigate('/');
            return;
        }
        
        }, [email,navigate]);
      

    
    return(
        <><Sidebar />
        <div class="main-content">
            <header>
                <div class="header-content">
                    <h1>Admin Dashboard</h1>
                    <p>Manage Cleaners, Tasks</p>
                
                </div>
            </header>
        </div>
        </>

    );
}

export default Admindashboard;