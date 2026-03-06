import { useState } from 'react';

function HabitForm({ token, onAdd, apiUrl }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/api/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, description })
    });
    const data = await res.json();
    if (res.ok) {
      onAdd(data);
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="habit-form-card">
      <h3>Plant a new habit</h3>
      <form onSubmit={handleSubmit}>
        <div className="habit-form-row">
          <div className="form-group">
            <label>Habit Name</label>
            <input type="text" placeholder="e.g. Morning Run" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" placeholder="e.g. Run 1 mile every morning" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn-add">+ Add</button>
        </div>
      </form>
    </div>
  );
}

export default HabitForm;