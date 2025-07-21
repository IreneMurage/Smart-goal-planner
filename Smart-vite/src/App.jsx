import { useEffect, useState } from 'react';
import GoalCard from './Components/GoalCard';
import AddGoalForm from './Components/AddGoalForm';
import Overview from './Components/Overview';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  const addGoal = (newGoal) => {
    fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(data => setGoals(prev => [...prev, data]));
  };

  const updateGoal = (id, updates) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(updated => {
        setGoals(prev => prev.map(goal => goal.id === id ? updated : goal));
      });
  };

  const deleteGoal = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, { method: 'DELETE' })
      .then(() => setGoals(prev => prev.filter(goal => goal.id !== id)));
  };

  return (
    <div>
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm onAdd={addGoal} />
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onUpdate={updateGoal}
          onDelete={deleteGoal}
        />
      ))}
    </div>
  );
}

export default App;






