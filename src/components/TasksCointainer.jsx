import { db } from "../modules/firebaseConfig.js";
import { useState, useEffect } from "react";
import { TaskToDo } from "./TaskToDo.jsx";
import { TaskInProgress } from "./TaskInProgress.jsx";
import { TaskDone } from "./TaskDone.jsx";
import { AllTasks } from "./AllTasks.jsx";
export function TasksContainer({container, tasks}) {
    
    return (
        <div>
            {container.map(type => 
                <div className="container-child" key={type}><h1>{type}</h1>
                    {type === "To Do" && <TaskToDo tasks={tasks}/>}
                    {type === "In Progress" && <TaskInProgress tasks={tasks}/>}
                    {type === "Done" && <TaskDone tasks={tasks}/>}
                </div>)
            }
            
        </div>
        
    )
}