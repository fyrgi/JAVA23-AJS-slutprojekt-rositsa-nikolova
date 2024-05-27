import { useState } from 'react';

export function TaskToDo ({ task }){
  const [assignedTo, setAssignedTo] = useState('');
  function handleAssign(e) {
    e.preventDefault();
  }

  return (
    <div className="task task-todo">
      <div>Date Created: YYYY-mm-dd</div>
      <div>{task.text}</div>
      <div>Category: {task.category}</div>
      <form onSubmit={handleAssign}>
        <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assign to"/>
        <button type="submit">Start Task</button>
      </form>
    </div>
  );
};
