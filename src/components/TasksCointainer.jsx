import { TaskToDo } from "./TaskToDo.jsx";
import { TaskInProgress } from "./TaskInProgress.jsx";
import { TaskDone } from "./TaskDone.jsx";
import { TaskArchive } from "./TaskArchive.jsx";
export function TasksContainer({setTasks, container, taskInProgress, taskToDo, taskDone, taskArchived}) {
    return (
        <div className="task-container">
            {container.map(type => 
                <div className="container-child" key={type}><h1>{type}</h1>
                    {type === "To Do" && <TaskToDo taskToDo={taskToDo} setTasks={setTasks}/>}
                    {type === "In Progress" && <TaskInProgress taskInProgress={taskInProgress}/>}
                    {type === "Done" && <TaskDone taskDone={taskDone}/>}
                    {type === "Archived" && <TaskArchive taskArchived={taskArchived}/>}
                </div>)
            }
            
        </div>
        
    )
}