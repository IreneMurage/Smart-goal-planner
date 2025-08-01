// src/components/Overview.jsx
function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div style={{ margin: '2em 0' }}>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Goals Completed: {completedGoals}</p>
    </div>
  );
}

export default Overview;