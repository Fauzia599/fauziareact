
import './App.css';
import Login from './componets/Login';
import Register from './componets/Register';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './componets/Sidebar';
import Admindashboard from './componets/admin/Admindashboard';
import Managecleners from './componets/admin/ManageClener';
import ManageTask from './componets/admin/ManageTask';
import Sideu from './componets/Sideu';
import Userdash from './componets/Userdash';
import CleanerLogin from './componets/CleanerLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/CleanerLogin' element={<CleanerLogin/>} />
      <Route path='/reg' element={<Register/>} />
      <Route path='/side' element={<Sidebar/>}/>
      <Route path='/dash' element={<Admindashboard/>}/>
      <Route path='/manag' element={<Managecleners/>}/>
      <Route path='/Task' element={<ManageTask/>}/>
      <Route path='/Sideu' element={<Sideu/>}/>
      <Route path='/dashUser' element={<Userdash/>}/>
      

  
    </Routes>
  );
}

export default App;
