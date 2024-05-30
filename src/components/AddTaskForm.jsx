import { useState } from 'react';
import { db, push, ref, set } from '../modules/firebaseConfig.js';

export function AddTaskForm({ setTasks }) {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (taskText.trim() === "" || category === "") return;

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
      console.error("Error adding task: ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter task..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="UX">UX</option>
        <option value="Dev Frontend">Dev Frontend</option>
        <option value="Dev Backend">Dev Backend</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}