import { Link } from "react-router-dom";

const Sideu = () => {
  return (
    <div class="sidebar">
      <div class="logo">
        <span style={{cursor:'pointer'}}>CleanCampus</span>
      </div>
      <ul class="nav-links">
        <li>
          <Link to='/dashUser'>
            <span class="icon">🏠</span> Dashboard
          </Link>
        </li>
   
        <li>
          <Link to ='/viewT'>
            <span class="icon">📝</span> View Tasks
          </Link>
        </li>
      
        <li>
          <span style={{cursor:'pointer'}}>
            <span class="icon">⚙️</span> Settings
          </span>
        </li>
        <li>
          <Link to ='/'>
            <span class="icon">⚙️</span> logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sideu;
