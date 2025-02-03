import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = () => {
  const navigate = useNavigate(); 
  // logout function
  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/');
};
  return (
    <div class="sidebar" style={{marginBottom:'200px'}}>
      <div class="logo">
        <span style={{cursor:'pointer'}}>CleanCampus</span>
      </div>
      <ul class="nav-links">
        <li>
          <Link to='/dash'>
            <span class="icon">🏠</span> Dashboard
          </Link>
        </li>
        <li>
          <Link to ='/manag'>
            <span class="icon">🧹</span> Manage Cleaners
          </Link>
        </li>
        <li>
          <Link to ='/Task'>
            <span class="icon">📝</span> Manage Tasks
          </Link>
        </li>
        
       
        <li>
        <span style={{cursor:'pointer'}} onClick={handleLogout}>
            <span class="icon">⚙️</span> logout
            </span>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
