import { InfoMsg } from './communication/InfoMsg.jsx';
import { db, ref, update, remove } from '../modules/firebaseConfig.js';

/**
 * 
 * task done is the other slightly more interesting part of the project. It has 3 buttons that do different things. 
 * Because of a poor firebase planing in case of a Return the assigned date is rewritten instead of all of them to be saved for traceability.
 * With a SQL database it could be implemented by creating a new table that saves the task history.
 * The archive button does not delete a task but instead hides it. The user might see all the hidden tasks and decide to forever delete it after.
 * The user might jsut delete the task that is in Done. 
 */
export function TaskDone({taskDone, setStatus, setMessage}) {

  async function handleReturn(e, task) {
    e.preventDefault();
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
      setStatus(['loaded', 'error']);
      setMessage("Couldn't return the task! " + error);
    }
  };

  async function handleArchive (e, task) {
    e.preventDefault();
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
      setStatus(['loaded', 'error']);
      setMessage("Couldn't archive the task! " + error);
    }
  }

  async function handleDelete (e, task) {
    e.preventDefault();

    try {
      const taskToDelete = ref(db, `tasks/${task.key}`);
      await remove(taskToDelete);
    } catch (error) {
      setStatus(['loaded', 'error']);
      setMessage("Couldn't delete the task! " + error);
    }
  }

  return (
    <>
    {taskDone.length === 0 ? <InfoMsg msg="No tasks done" styleAs="info-msg" /> :
      taskDone.map((task) => 
      <div key={task.key} className={`task task-done task-${task.category.replace(/\s+/g, '').toLowerCase()}`}>
        <div className="category"><p>{task.category}</p></div>
        <div className='history-image'><span className="material-symbols-outlined">history</span></div>
        <div className="history">
          <p>Completed: {task.date.completed}</p>
          <p>Assigned: {task.date.assigned}</p>
          <p>Created: {task.date.created}</p>
        </div>
        <div className='task-details'>
          <p>{task.task}</p>
          <p className='assigned'>Assigned to: {task.assignedTo}</p>
        </div>
        <button onClick={e => handleReturn(e, task)} className='task-button return-button'>Return</button>
        <button onClick={e => handleArchive(e, task)} className='task-button archive-button'>Archive</button>
        <button onClick={e => handleDelete(e, task)} className='task-button delete-button'>Delete</button>
      </div>)}
    </>
    
  );
};