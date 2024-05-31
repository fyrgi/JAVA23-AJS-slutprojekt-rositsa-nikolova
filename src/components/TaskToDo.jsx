import { useState } from 'react';
import { InfoMsg } from './communication/InfoMsg.jsx';
import { db, ref, update } from '../modules/firebaseConfig.js';

export function TaskToDo({ taskToDo, setStatus, setInfoMsg, setErrorMsg }) {
  const [assignedTo, setAssignedTo] = useState({});
  const [hasValue, setHasValue] = useState(false);
  function handleAssign(taskKey, value){
    setAssignedTo(prevState => ({
      ...prevState,
      [taskKey]: value
    }));
    setHasValue(true);
  };

  async function handleSubmit(e, task){
    e.preventDefault();
    
    // if empty don't submit.
    if (!hasValue){
      setStatus(['loaded', 'info']);
      setInfoMsg('Please assign a person to this task.');
      return;
    }

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
      setAssignedTo(prevState => ({
        ...prevState,
        [task.key]: ''
      }));
    } catch (error) {
      setStatus(['loaded', 'error']);
      setErrorMsg("The task is not updated! Contact admin. ", error);
      setHasValue(false);
    }
  };

  return (
    <>
      {taskToDo.length === 0 ? (
        <InfoMsg msg="No tasks in to do" />
      ) : (
        taskToDo.map(task => (
          <div key={task.key} className={`task task-todo task-${task.category.replace(/\s+/g, '').toLowerCase()}`}>
            <div className="category"><p>{task.category}</p></div>
            <div className='history-image'><span className="material-symbols-outlined">history</span></div>
            <div className="history">
              <p>Created: {task.date.created}</p>
            </div>
            <div className='task-details'>
              <p>{task.task}</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e, task)} className='task-form'>
              <input
                type="text"
                value={assignedTo[task.key] || ''}
                onChange={(e) => handleAssign(task.key, e.target.value)}
                placeholder="Assign to"
                className='task-input'
              />
              <button type="submit" className='task-button'>Assign</button>
            </form>
          </div>
        ))
      )}
    </>
  );
}