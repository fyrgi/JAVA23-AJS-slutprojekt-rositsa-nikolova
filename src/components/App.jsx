import { useState, useEffect } from 'react';
import { db, onValue, tasksRef} from '../modules/firebaseConfig.js';
import { AddTaskForm } from './AddTaskForm.jsx';
import { ErrorMsg } from './ErrorMsg.jsx';
import { LoadingMsg } from './LoadingMsg.jsx';
import { TasksContainer } from './TasksCointainer.jsx';
import { ShowArchived } from './ShowArchived.jsx';
import { TaskArchive } from './TaskArchive.jsx';
export function App() {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [tasksCont, setTasksCont] = useState(['To Do', 'In Progress', 'Done']);
  const [taskToDo, setTaskToDo] = useState([]);
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [taskArchived, setTaskArchived] = useState([]);
  
  useEffect(() => {
    setStatus('loading');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setStatus('info');
        return;
      } else {
        const tasksArray = Object.entries(data).map(([key, value]) => ({ key: key, ...value }));
        setTasks(tasksArray);
        setStatus('loaded');
      }
    });
  }, []);

  useEffect(() => {
    setTaskToDo(tasks.filter(task => task.status === 'to do'));
    setTaskInProgress(tasks.filter(task => task.status === 'in progress'));
    setTaskDone(tasks.filter(task => task.status === 'done'));
    setTaskArchived(tasks.filter(task => task.status === 'archived'));
  }, [tasks]);


  return ( 
    <div className="app">

        <AddTaskForm/>
        <ShowArchived tasksCont={tasksCont} setTasksCont={setTasksCont}/>
        {status === 'error' && <ErrorMsg/>}
        {status === 'loading' && <LoadingMsg/>}
        {status === 'loaded' && <TasksContainer container={tasksCont}
                                    taskInProgress={taskInProgress}
                                    taskToDo={taskToDo}
                                    taskDone={taskDone}
                                    taskArchived={taskArchived}/>
        }
        
    </div>
  )
}
