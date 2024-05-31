import { useState, useEffect } from 'react';
import { db, onValue, tasksRef} from '../modules/firebaseConfig.js';
import { AddTaskForm } from './AddTaskForm.jsx';
import { ErrorMsg } from './communication/ErrorMsg.jsx';
import { LoadingMsg } from './communication/LoadingMsg.jsx';
import { TasksContainer } from './TasksCointainer.jsx';
import { ShowArchived } from './ShowArchived.jsx';
import { InfoMsg } from './communication/InfoMsg.jsx';
export function App() {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(['loading']);
  const [tasksCont, setTasksCont] = useState(['To Do', 'In Progress', 'Done']);
  const [taskToDo, setTaskToDo] = useState([]);
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [taskArchived, setTaskArchived] = useState([]);
  const [infoMsg, setInfoMsg] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  
  useEffect(() => {
    setStatus('loading');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setStatus('info', 'loaded');
        setInfoMsg('No tasks found. Add a task to see the board.');
        return;
      } else {
        const tasksArray = Object.entries(data).map(([key, value]) => ({ key: key, ...value }));
        setTasks(tasksArray);
        setStatus('loaded');
      }
    });
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status])

  useEffect(() => {
    setTaskToDo(tasks.filter(task => task.status === 'to do'));
    setTaskInProgress(tasks.filter(task => task.status === 'in progress'));
    setTaskDone(tasks.filter(task => task.status === 'done'));
    setTaskArchived(tasks.filter(task => task.status === 'archived'));
  }, [tasks]);


  return ( 
    <div className="app">

        <AddTaskForm setStatus={setStatus} status={status} setInfoMsg={setInfoMsg} setErrorMsg={setErrorMsg}/>
        <ShowArchived tasksCont={tasksCont} setTasksCont={setTasksCont}/>
        {status.includes('error') && <ErrorMsg msg={errorMsg}/>}
        {status === 'loading' && <LoadingMsg/>}
        {status.includes('info') && <InfoMsg msg={infoMsg} />}
        {status.includes('loaded') && <TasksContainer container={tasksCont} setStatus={setStatus} setInfoMsg={setInfoMsg} setErrorMsg={setErrorMsg}
                                    taskInProgress={taskInProgress}
                                    taskToDo={taskToDo}
                                    taskDone={taskDone}
                                    taskArchived={taskArchived}/>
        }
        
    </div>
  )
}