
import { db, push, ref, set } from '../modules/firebaseConfig.js';

/**
 * 
 * The component is always displayed on top of the the application. It is responsible for adding tasks to firebase.
 * It does not add empty tasks or tasks without a category.
 * In case of error, an error message will be displayed. We can have either an info message or an error message.
 * 
 */
export function AddTaskForm({setStatus, setMessage}) {
  let taskText = '';
  let category = '';

  async function handleSubmit(e) {
    e.preventDefault();
    if (taskText.trim() === "" || category === "") {
      setStatus(['loaded', 'info']);
      setMessage('Please enter a task and select a category');
      e.target.reset();
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
      taskText = '';
      category = '';
    } catch (error) {
      setStatus(['loaded', 'error']);
      setMessage("Couldn't add task: "  + error);
    }
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          onChange={(e) => taskText = e.target.value}
          placeholder="Enter task..."
          className="add-task-input"
        />
        <select onChange={(e) => category = e.target.value} className="add-task-select">
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