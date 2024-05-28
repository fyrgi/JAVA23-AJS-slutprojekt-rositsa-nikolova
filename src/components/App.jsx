import { useState, useEffect } from 'react';
import { db, onValue, tasksRef} from '../modules/firebaseConfig.js';
import { AddTaskForm } from './AddTaskForm.jsx';
import { ErrorMsg } from './ErrorMsg.jsx';
import { LoadingMsg } from './LoadingMsg.jsx';
import { TasksContainer } from './TasksCointainer.jsx';

export function App() {

  const [tasks, setTasks] = useState([]);
  //let tasksDb = [];
  const [status, setStatus] = useState('loading');
  const [tasksCont, setTasksCont] = useState(['To Do', 'In Progress', 'Done']);
  
  const taskHardCoded = [{
    text: "Task 1 text",
    date: {
        assigned: "2024-05-17, 10:10",
        created: '2024-05-17, 10:07',
        done: '2024-05-22, 15:27'
    },
    assignedTo: "Rosi",
    status: "done",
    category: "Dev Backend"
  },
  {
    text: "Task 2 text",
    date: {
        assigned: "2024-05-17, 10:02",
        created: '2024-05-17, 10:00'
    },
    assignedTo: "Nikolina",
    status: "in progress",
    category: "Dev Frontend"
  },
  {
    text: "Task 3 text",
    date: {
        created: '2024-05-17, 10:04'
    },
    assignedTo: "<none>",
    status: "to do",
    category: "Dev Frontend"
  }]

  useEffect(() => {
    // smeni obj na array. Vmesto Object.values...  
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      console.log('useEffect', data);

      for(const key in data){
        console.log(key, data[key]);

      }
      
      setTasks(Object.values(data));
    })
  }, []);


  return ( 
    <div className="app">
        <AddTaskForm />

        {status === 'error' && <ErrorMsg/>}
        {status === 'loading' && <LoadingMsg/>}
        <div className="tasks-container"><TasksContainer container={tasksCont} tasks={taskHardCoded}/></div>
        
    </div>
  )
}
