import { useState } from 'react';

export function TaskToDo({taskToDo}){

  return (
  <>
    {
      taskToDo.map(task =>
        <div className="task task-to-do">
        <p>{task.text}</p>
        <div className='history'>
          <p>Date created: {task.date.created} </p>
        </div>
        <form >
          <input type="text" placeholder="Assign to"/>
          <button type="submit">Start Task</button>
        </form>
      </div>
    )}
   </>   

        
    
  );
};
