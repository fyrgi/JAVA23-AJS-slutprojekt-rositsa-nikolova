import {useState} from 'react';
import { InfoMsg } from './InfoMsg';
export function TaskDone({taskDone}) {


  function handleReturn() {
    console.log("return task: ", tasks.key);
  };

  function handleArchive () {
    console.log("archive task: ", tasks.key);
  }

  return (
    <>
    {taskDone.length === 0 ? <InfoMsg msg="No tasks done" /> :
      taskDone.map((task) => 
      <div className={`task task-done task-${task.category.replace(/\s+/g, '').toLowerCase()}`}>
        <p>{task.task}</p>
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