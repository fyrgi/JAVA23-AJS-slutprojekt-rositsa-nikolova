
export function TaskInProgress(tasks) {
console.log("task in progress: ", tasks.tasks);
const taskList = tasks.tasks;
function handleDone() {
  console.log("done task: ");
}
  return (
    <>
      {taskList.map((task) => (
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