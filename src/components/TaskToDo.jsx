import { useState } from 'react';
import { InfoMsg } from './communication/InfoMsg.jsx';
import { db, ref, update } from '../modules/firebaseConfig.js';

/**
 * 
 * All new tasks end up in the To Do column because they are automatically added with the to do status.
 * The component has a new form that has to make a difference between each task. That difference is made with the task.key.
 * when the form is submitted, the task is updated in firebase only in case the assignedTo value is not empty. Otherwise the task is not updated and a message is displayed.
 * The task won't be assigned to a person if the Assign button of another task is clicked.
 * Because the form dissapears e.target.reset() is not used in the clean up  between row 45 and 51.
 * 
 * */
export function TaskToDo({ taskToDo, setStatus, setMessage }) {
  const [assignedTo, setAssignedTo] = useState('');

  function handleAssign(taskKey, value){
    setAssignedTo(prevState => ({
      ...prevState,
      [taskKey]: value
    }));
  };

  async function handleSubmit(e, task){
    e.preventDefault();
    
    const assignedToValue = assignedTo[task.key];
    // if empty don't submit.
    if (!assignedToValue) {
      setStatus(['loaded', 'info']);
      setMessage('Please assign a person to this task.');
      return;
    }

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
      setMessage("The task is not updated! Contact admin. ", error);
    }
  };

  return (
    <>
      {taskToDo.length === 0 ? (
        <InfoMsg msg="No tasks in to do" styleAs="info-msg" />
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