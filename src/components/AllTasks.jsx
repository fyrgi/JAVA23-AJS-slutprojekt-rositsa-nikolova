import { db } from "../modules/firebaseConfig.js";
import { useState, useEffect } from "react";
import {ref, remove} from "firebase/database"

export function AllTasks({ status, tasks }) {

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`${task.category.toLowerCase()} task-item`}>
          <p>{task.task}</p>
          <p>{task.assigned}</p>
          <small>{new Date(task.date.created).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}