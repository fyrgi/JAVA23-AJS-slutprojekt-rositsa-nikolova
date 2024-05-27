import {useState} from 'react';

export function TaskDone({ task }) {

  function handleReturn() {
    console.log("return task: ", task.key);
  };

  function handleArchive () {
    console.log("archive task: ", task.key);
  }

  return (
    <div className="task task-done">
      <div>{task.text}</div>
      <div>Assigned to: {task.assignedTo}</div>
      <div>History </div>
      <button onClick={handleReturn}>Return</button>
      <button onClick={handleArchive}>Archive</button>
    </div>
  );
};