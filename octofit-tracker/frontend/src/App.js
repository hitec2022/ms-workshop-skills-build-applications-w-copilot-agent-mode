import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navClassName = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`;

  return (
    <div className="container py-4">
      <h1 className="mb-4">OctoFit Tracker</h1>

      <ul className="nav nav-pills gap-2 mb-4">
        <li className="nav-item">
          <NavLink to="/users" className={navClassName}>Users</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teams" className={navClassName}>Teams</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/activities" className={navClassName}>Activities</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/leaderboard" className={navClassName}>Leaderboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/workouts" className={navClassName}>Workouts</NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </div>
  );
}

export default App;
