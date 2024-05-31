import { TaskToDo } from "./TaskToDo.jsx";
import { TaskInProgress } from "./TaskInProgress.jsx";
import { TaskDone } from "./TaskDone.jsx";
import { TaskArchive } from "./TaskArchive.jsx";
export function TasksContainer({setTasks, container, taskInProgress, taskToDo, taskDone, taskArchived, setStatus, setInfoMsg, setErrorMsg}) {
    return (
        <div className="task-container">
            {container.map(type => 
                <div className="container-child" key={type}><h1>{type}</h1>
                    {type === "To Do" && <TaskToDo taskToDo={taskToDo} setTasks={setTasks} setStatus={setStatus} setInfoMsg={setInfoMsg} setErrorMsg={setErrorMsg}/>}
                    {type === "In Progress" && <TaskInProgress taskInProgress={taskInProgress} setErrorMsg={setErrorMsg}/>}
                    {type === "Done" && <TaskDone taskDone={taskDone} setErrorMsg={setErrorMsg}/>}
                    {type === "Archived" && <TaskArchive taskArchived={taskArchived} setErrorMsg={setErrorMsg}/>}
                </div>)
            }
            
        </div>
        
    )
}