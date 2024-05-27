import { db } from "../modules/firebaseConfig.js";
import { useState, useEffect } from "react";
import { TaskToDo } from "./TaskToDo.jsx";
import { TaskInProgress } from "./TaskInProgress.jsx";
import { TaskDone } from "./TaskDone.jsx";
import { AllTasks } from "./AllTasks.jsx";
export function TasksContainer(props) {
    return (
        <div>
            {props.container.map(type => 
                <div className="container-child" key={type}><h1>{type}</h1></div>)
            // add tasks based on status
            }
            <AllTasks status="To Do" tasks={props.tasks}/>
            <AllTasks status="In Progress" tasks={props.tasks}/>
            <AllTasks status="Done" tasks={props.tasks}/>
        </div>
        
    )
}