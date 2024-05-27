import { useState } from 'react';

export function AddTaskForm() {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(taskText, category);
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