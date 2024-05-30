import { useState } from 'react';
import { InfoMsg } from './InfoMsg.jsx';

export function TaskToDo({ taskToDo }) {
  const [assignedTo, setAssignedTo] = useState('');

  return (
    <>
      {taskToDo.length === 0 ? (
        <InfoMsg msg="No tasks in to do" />
      ) : (
        taskToDo.map(task => (
          <div
            key={task.key}
            className={`task task-todo task-${task.category.replace(/\s+/g, '').toLowerCase()}`}
          >
            <p>{task.category}</p>
            <p>{task.task}</p>
            <div className="history">
              <p>Date created: {task.date.created}</p>
            </div>
            <form>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assign to"
              />
              <button type="submit">Start Task</button>
            </form>
          </div>
        ))
      )}
    </>
  );
}