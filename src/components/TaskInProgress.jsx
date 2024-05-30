import { InfoMsg } from "./InfoMsg";
export function TaskInProgress({taskInProgress}) {
function handleDone(event) {
  console.log(event.target.innerText)
  event.preventDefault();

}
  return (
    <>
      { taskInProgress.length === 0 ? <InfoMsg msg="No tasks in progress" />:
       taskInProgress.map((task) => (
        <div className={`task task-inprogress task-${task.category.replace(/\s+/g, '').toLowerCase()}`}>
        <p>{task.task}</p>
        <p>Assigned to: {task.assignedTo}</p>
        <div className="history">
          <p>{task.date.assigned}</p>
          <p>{task.date.created}</p>
        </div>
        <button onClick={handleDone}>Done</button>
      </div>
      ))}
    </>
    
  );
  
}