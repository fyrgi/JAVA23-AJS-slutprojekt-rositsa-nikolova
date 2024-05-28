
export function TaskInProgress({taskInProgress}) {
console.log(taskInProgress);
function handleDone() {
  console.log("done task: ");
}
  return (
    <>
      {taskInProgress.map((task) => (
        <div className={"task task-inprogress"}>
        <p>{task.text}</p>
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