import { InfoMsg } from './InfoMsg';
import { db, ref, remove } from '../modules/firebaseConfig.js';
export function TaskArchive({taskArchived}) {


  async function handleDelete (e, task) {
    e.preventDefault();

    try {
      const taskToDelete = ref(db, `tasks/${task.key}`);
      await remove(taskToDelete);
    } catch (error) {
      console.error("Error deleting the task: ", error);
    }
  }

  return (
    <>
    {taskArchived.length === 0 ? <InfoMsg msg="No archived tasks" /> :
      taskArchived.map((task) => 
      <div key={task.key} className="task task-archive">
        <div className="category"><p>{task.category}</p></div>
        <div className='history-image'><span className="material-symbols-outlined">history</span></div>
        <div className="history">
          <p>Archived: {task.date.archived}</p>
          <p>Completed: {task.date.completed}</p>
          <p>Assigned: {task.date.assigned}</p>
          <p>Created: {task.date.created}</p>
        </div>
        <div className='task-details'>
          <p>{task.task}</p>
          <p className='assigned'>Assigned to: {task.assignedTo}</p>
        </div>
        <button onClick={e => handleDelete(e, task)} className='task-button archive-button'>Delete</button>
      </div>)}
    </>
    
  );
};