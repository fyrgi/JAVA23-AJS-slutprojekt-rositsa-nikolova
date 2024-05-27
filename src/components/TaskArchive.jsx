export function TaskArchive({ task }) {

  return (
    <div className="task task-archive">
      <div>{task.text}</div>
      <div>Assigned to: {task.assignedTo}</div>
      <div>History </div>
    </div>
  );
};