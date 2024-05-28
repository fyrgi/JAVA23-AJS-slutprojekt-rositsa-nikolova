import {useState} from 'react';

export function TaskDone({taskDone}) {


  function handleReturn() {
    console.log("return task: ", tasks.key);
  };

  function handleArchive () {
    console.log("archive task: ", tasks.key);
  }

  return (
    <>
    {taskDone.map((task) => 
      <div className="task task-done">
        <p>{task.text}</p>
        <p>Assigned to: {task.assignedTo}</p>
        <div className="history">
          <p>{task.date.done}</p>
          <p>{task.date.assigned}</p>
          <p>{task.date.created}</p>
        </div>
        <button onClick={handleReturn}>Return</button>
        <button onClick={handleArchive}>Archive</button>
      </div>)}
    </>
    
  );
};