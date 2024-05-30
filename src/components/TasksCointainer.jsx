import { db } from "../modules/firebaseConfig.js";
import { useState, useEffect } from "react";
import { TaskToDo } from "./TaskToDo.jsx";
import { TaskInProgress } from "./TaskInProgress.jsx";
import { TaskDone } from "./TaskDone.jsx";
import { AllTasks } from "./AllTasks.jsx";
export function TasksContainer({setTasks, container, taskInProgress, taskToDo, taskDone}) {
    
    return (
        <div className="task-container">
            {container.map(type => 
                <div className="container-child" key={type}><h1>{type}</h1>
                    {type === "To Do" && <TaskToDo taskToDo={taskToDo} setTasks={setTasks}/>}
                    {type === "In Progress" && <TaskInProgress taskInProgress={taskInProgress}/>}
                    {type === "Done" && <TaskDone taskDone={taskDone}/>}
                </div>)
            }
            
        </div>
        
    )
}