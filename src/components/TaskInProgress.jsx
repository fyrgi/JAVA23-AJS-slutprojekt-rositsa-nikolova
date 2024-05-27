
export function TaskInProgress({task}) {

  const handleDone = async () => {
    console.log(task.id);
    console.log(task.key);
    console.log(task.date.assigned);
  };

  return (
    <div className={`task task-inprogress}`}>
      <div>{task.text}</div>
      <div>Assigned to: {task.assignedTo}</div>
      <div>Date Created: YYYY-mm-dd</div>
      <div>Date Assigned: YYYY-mm-dd</div>
      <button onClick={handleDone}>Done</button>
    </div>
  );
  
}