import { useState, useEffect } from 'react';
import { db, onValue, tasksRef, collection, doc} from '../modules/firebaseConfig.js';
import { AddTaskForm } from './AddTaskForm.jsx';
import { ErrorMsg } from './ErrorMsg.jsx';
import { LoadingMsg } from './LoadingMsg.jsx';
import { TasksContainer } from './TasksCointainer.jsx';

export function App() {

  //const [tasks, setTasks] = useState([]);
  let tasksDb = [];
  const [status, setStatus] = useState('loading');
  const [tasksCont, setTasksCont] = useState(['To Do', 'In Progress', 'Done']);


 onValue(tasksRef, (snapshot) => {
   const data = snapshot.val();
   tasksDb = Object.values(data);
 })

  return ( 
    <div class="app">
        <AddTaskForm />

        {status === 'error' && <ErrorMsg/>}
        {status === 'loading' && <LoadingMsg/>}
        <div className="tasks-container"><TasksContainer container={tasksCont} tasks={tasksDb}/></div>
        
    </div>
  )
}
