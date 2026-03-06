import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';

const API_URL = "https://habitat-api-019c.onrender.com";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API_URL}/api/habits`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setHabits(data));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addHabit = (habit) => setHabits([...habits, habit]);
  const removeHabit = (id) => setHabits(habits.filter(h => h.id !== id));

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1>🌿 HabitAt</h1>
          <p>{today}</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Log Out</button>
      </div>

      <HabitForm token={token} onAdd={addHabit} apiUrl={API_URL} />

      <div className="habits-section">
        <h3>{habits.length} {habits.length === 1 ? 'Habit' : 'Habits'} Tracked</h3>
        <div className="habits-grid">
          {habits.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🌱</span>
              <p>No habits yet — add one above to get started!</p>
            </div>
          ) : (
            habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                token={token}
                onDelete={removeHabit}
                onToast={showToast}
                apiUrl={API_URL}
              />
            ))
          )}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Dashboard;