import {useState} from 'react';
import { InfoMsg } from './InfoMsg';
import { db, ref, update, remove } from '../modules/firebaseConfig.js';
export function TaskDone({taskDone}) {

  async function handleReturn(e, task) {
    e.preventDefault();
    console.log("return task: ", task.key);
    const updateTask = {
      ...task,
      status: 'in progress',
      date: {
        ...task.date,
        assigned: new Date().toISOString().slice(0, 16).replace("T", " ")
      }
    };
  
    try {
      const taskRef = ref(db, `tasks/${task.key}`);
      await update(taskRef, updateTask);
    } catch (error) {
      console.error("Error marking as returned: ", error);
    }
  };

  async function handleArchive (e, task) {
    e.preventDefault();
    console.log("archive task: ", task.key);
    const archiveTask = {
      ...task,
      status: 'archived',
      date: {
        ...task.date,
        archived: new Date().toISOString().slice(0, 16).replace("T", " ")
      }
    };
  
    try {
      const taskRef = ref(db, `tasks/${task.key}`);
      await update(taskRef, archiveTask);
    } catch (error) {
      console.error("Error arvhiving the task: ", error);
    }
  }

  async function handleDelete (e, task) {
    e.preventDefault();
    console.log("delete task: ", task.key);

    try {
      const taskToDelete = ref(db, `tasks/${task.key}`);
      await remove(taskToDelete);
    } catch (error) {
      console.error("Error deleting the task: ", error);
    }
  }

  return (
    <>
    {taskDone.length === 0 ? <InfoMsg msg="No tasks done" /> :
      taskDone.map((task) => 
      <div key={task.key} className={`task task-done task-${task.category.replace(/\s+/g, '').toLowerCase()}`}>
        <div className="category"><p>{task.category}</p></div>
        <div className='history-image'><span class="material-symbols-outlined">history</span></div>
        <div className="history">
          <p>Completed: {task.date.completed}</p>
          <p>Assigned: {task.date.assigned}</p>
          <p>Created: {task.date.created}</p>
        </div>
        <div className='task-details'>
          <p>{task.task}</p>
          <p>Assigned to: {task.assignedTo}</p>
        </div>
        <button onClick={e => handleReturn(e, task)}>Return</button>
        <button onClick={e => handleArchive(e, task)}>Archive</button>
        <button onClick={e => handleDelete(e, task)}>Delete</button>
      </div>)}
    </>
    
  );
};