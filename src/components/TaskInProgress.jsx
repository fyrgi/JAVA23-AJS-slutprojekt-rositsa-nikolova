import { InfoMsg } from "./InfoMsg";
import { db, ref, update } from '../modules/firebaseConfig.js';
export function TaskInProgress({taskInProgress}) {

async function handleDone(e, task) {
  e.preventDefault();
  
  const doneTask = {
    ...task,
    status: 'done',
    date: {
      ...task.date,
      completed: new Date().toISOString().slice(0, 16).replace("T", " ")
    }
  };

  try {
    const taskRef = ref(db, `tasks/${task.key}`);
    await update(taskRef, doneTask);
  } catch (error) {
    console.error("Error marking as done: ", error);
  }
};

  return (
    <>
      { taskInProgress.length === 0 ? <InfoMsg msg="No tasks in progress" />:
       taskInProgress.map((task) => (
        <div key={task.key} className={`task task-inprogress task-${task.category.replace(/\s+/g, '').toLowerCase()}`}>
        <p>{task.task}</p>
        <p>Assigned to: {task.assignedTo}</p>
        <div className='history-image'><span class="material-symbols-outlined">history</span></div>
        <div className="history">
          <p>{task.date.assigned}</p>
          <p>{task.date.created}</p>
        </div>
        <button onClick={e => handleDone(e, task)}>Done</button>
      </div>
      ))}
    </>
    
  );
  
}