import { useState, useEffect } from 'react';
import { onValue, tasksRef} from '../modules/firebaseConfig.js';
import { AddTaskForm } from './AddTaskForm.jsx';
import { InfoMsg } from './communication/InfoMsg.jsx';
import { LoadingMsg } from './communication/LoadingMsg.jsx';
import { TasksContainer } from './TasksCointainer.jsx';
import { ShowArchived } from './ShowArchived.jsx';

/**
 * This component is on the top of the application.
 * It contains the logic of display of the other components and the data that will be displayed within them.
 * That happens based on the current status of the program (loading, loaded, error or info). The program always starts in loading mode until it gets data or error.
 * The data that comes from the firebase is stored in an array and passed to the other components with an appropriate filter based on the status property form the firebase structure.
 * The TasksContainer component does not have any meaningful purpose within the current scope of the project, but it is prepared for future scalability in case 
 * there will be the need to have different type versions of the task-columns. InfoMsg used to be 2 different components whith one small difference - the className.
 */
export function App() {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(['loading']);
  const [tasksCont, setTasksCont] = useState(['To Do', 'In Progress', 'Done']);
  const [message, setMessage] = useState([]);
  
  useEffect(() => {
    setStatus('loading');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setStatus('info', 'loaded');
        setMessage('No tasks found. Add a task to see the board.');
        return;
      } else {
        const tasksArray = Object.entries(data).map(([key, value]) => ({ key: key, ...value }));
        setTasks(tasksArray);
        setStatus('loaded');
      }
    });
  }, []);


  return ( 
    <div className="app">

        <AddTaskForm setStatus={setStatus} status={status} setMessage={setMessage} />
        <ShowArchived tasksCont={tasksCont} setTasksCont={setTasksCont}/>
        {status.includes('error') && <InfoMsg msg={message} styleAs="error-msg"/>}
        {status === 'loading' && <LoadingMsg/>}
        {status.includes('info') && <InfoMsg msg={message} styleAs="info-msg" />}
        {status.includes('loaded') && <TasksContainer container={tasksCont} setStatus={setStatus} setMessage={setMessage}
                                    taskInProgress={tasks.filter(task => task.status === 'in progress')}
                                    taskToDo={tasks.filter(task => task.status === 'to do')}
                                    taskDone={tasks.filter(task => task.status === 'done')}
                                    taskArchived={tasks.filter(task => task.status === 'archived')}/>
        }
        
    </div>
  )
}