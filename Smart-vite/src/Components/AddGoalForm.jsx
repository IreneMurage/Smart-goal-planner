import { useState } from 'react';

function AddGoalForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      ...form,
      id: crypto.randomUUID(),
      targetAmount: Number(form.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onAdd(newGoal);
    setForm({ name: '', targetAmount: '', category: '', deadline: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} required />
      <input name="targetAmount" placeholder="Target Amount" value={form.targetAmount} onChange={handleChange} required type="number" />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="deadline" placeholder="Deadline" value={form.deadline} onChange={handleChange} required type="date" />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoalForm;
