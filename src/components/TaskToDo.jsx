import { useState } from 'react';
import { InfoMsg } from './InfoMsg.jsx';
import { db, ref, update } from '../modules/firebaseConfig.js';

export function TaskToDo({ taskToDo }) {
  const [assignedTo, setAssignedTo] = useState({});
  const [hasValue, setHasValue] = useState(false);
  const handleAssign = (taskKey, value) => {
    setAssignedTo(prevState => ({
      ...prevState,
      [taskKey]: value
    }));
    setHasValue(true);
  };

  const handleSubmit = async (e, task) => {
    e.preventDefault();
    
    // if empty or less than 2 characters, don't submit.
    if (!hasValue) return;

    const assignedToValue = assignedTo[task.key];
    const updatedTask = {
      ...task,
      assignedTo: assignedToValue,
      status: 'in progress',
      date: {
        ...task.date,
        assigned: new Date().toISOString().slice(0, 16).replace("T", " ")
      }
    };

    try {
      const taskRef = ref(db, `tasks/${task.key}`);
      await update(taskRef, updatedTask);
      console.log("Task assigned to: ", assignedToValue);
      setAssignedTo(prevState => ({
        ...prevState,
        [task.key]: ''
      }));
    } catch (error) {
      console.error("Error updating task: ", error);
      setHasValue(false);
    }
  };

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
            <form onSubmit={(e) => handleSubmit(e, task)}>
              <input
                type="text"
                value={assignedTo[task.key] || ''}
                onChange={(e) => handleAssign(task.key, e.target.value)}
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