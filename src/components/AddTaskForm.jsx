import { useState } from 'react';
import { db, push, ref, set } from '../modules/firebaseConfig.js';

export function AddTaskForm({setStatus, status, setInfoMsg, setErrorMsg}) {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (taskText.trim() === "" || category === "") {
      setStatus(['loaded', 'info']);
      setInfoMsg('Please enter a task and select a category');
      return;
    }
    
    const newTask = {
      task: taskText,
      category,
      status: 'to do',
      date: { created: new Date().toISOString().slice(0, 16).replace("T", " ") }
    };

    try {
      const newTaskRef = push(ref(db, 'tasks'));
      await set(newTaskRef, newTask);
      setTaskText('');
      setCategory('');
    } catch (error) {
      setStatus(['loaded', 'error']);
      setErrorMsg("Couldn't add task: "  + error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task..."
          className="add-task-input"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="add-task-select">
          <option value="">Select Category</option>
          <option value="UX">UX</option>
          <option value="Dev Frontend">Dev Frontend</option>
          <option value="Dev Backend">Dev Backend</option>
        </select>
        <button type="submit" className="add-task-button">Add Task</button>
      </form>
    </div>
  );
}