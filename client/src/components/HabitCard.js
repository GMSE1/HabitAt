const HABIT_ICONS = ['🌿', '🏃', '📚', '💧', '🧘', '✍️', '🍎', '🌅', '💪', '🎯'];

function HabitCard({ habit, token, onDelete, onToast, apiUrl }) {
  const icon = HABIT_ICONS[habit.id % HABIT_ICONS.length];

  const handleDelete = async () => {
    const res = await fetch(`${apiUrl}/api/habits/${habit.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) onDelete(habit.id);
  };

  const handleLog = async () => {
    const res = await fetch(`${apiUrl}/api/habits/${habit.id}/logs`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      onToast(`✅ "${habit.name}" logged for today!`);
    } else {
      onToast(`⚠️ ${data.error}`);
    }
  };

  return (
    <div className="habit-card">
      <div className="habit-card-left">
        <div className="habit-dot">{icon}</div>
        <div className="habit-info">
          <h4>{habit.name}</h4>
          {habit.description && <p>{habit.description}</p>}
        </div>
      </div>
      <div className="habit-card-actions">
        <button className="btn-log" onClick={handleLog}>Log Today</button>
        <button className="btn-delete" onClick={handleDelete}>✕</button>
      </div>
    </div>
  );
}

export default HabitCard;