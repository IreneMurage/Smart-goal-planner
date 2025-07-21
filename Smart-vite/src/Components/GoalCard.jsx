// src/components/GoalCard.jsx
import { useState } from 'react';

function GoalCard({ goal, onUpdate, onDelete }) {
  const [deposit, setDeposit] = useState('');

  const handleDeposit = () => {
    const amount = Number(deposit);
    if (amount > 0) {
      onUpdate(goal.id, { savedAmount: goal.savedAmount + amount });
      setDeposit('');
    }
  };

  const now = new Date();
  const deadline = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  const completed = goal.savedAmount >= goal.targetAmount;
  const warning = !completed && daysLeft <= 30 && daysLeft >= 0;
  const overdue = !completed && daysLeft < 0;
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);

  return (
    <div style={{ border: '1px solid #ccc', margin: '1em', padding: '1em' }}>
      <h3>{goal.name} ({goal.category})</h3>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <p>Deadline: {goal.deadline}</p>
      <div style={{ background: '#eee', height: '10px', width: '100%' }}>
        <div style={{ width: `${progress}%`, height: '10px', background: 'green' }}></div>
      </div>
      <p>{completed ? ' Completed' : warning ? 'Warning: <30 days' : overdue ? ' Overdue' : `${daysLeft} days left`}</p>
      <input
        type="number"
        placeholder="Deposit amount"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={() => onDelete(goal.id)} style={{ marginLeft: '1em', color: 'red' }}>Delete</button>
    </div>
  );
}

export default GoalCard;