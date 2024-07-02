import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const AppPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/users/${user.username}/tasks`);
        setTasks(data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [user.username]);

  const addTask = async (task) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/${user.username}/tasks`, { task });
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (index) => {
    try {
      const task = tasks[index];
      const newStatus = task.status === 'Not Started' ? 'In Progress' : 'Completed';
      await axios.put(`http://localhost:5000/api/users/${user.username}/tasks/${task._id}`, { status: newStatus });

      if (newStatus === 'Completed') {
        if (window.confirm('Are you sure you want to mark this task as completed?')) {
          await axios.delete(`http://localhost:5000/api/users/${user.username}/tasks/${task._id}`);
          setTasks(tasks.filter((_, i) => i !== index));
        }
      } else {
        setTasks(tasks.map((t, i) => (i === index ? { ...t, status: newStatus } : t)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Scheduler App</h1>
      <TaskForm addTask={addTask} />
      <div>
        {tasks.map((task, index) => (
          <div
            key={task._id}
            style={{
              border: '1px solid var(--primary-color)',
              padding: '10px',
              margin: '10px 0',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>{task.name}</h3>
            <p><strong>Time Needed:</strong> {task.timeNeeded}</p>
            <p><strong>Start Time:</strong> {task.startTime}</p>
            <p><strong>Notes:</strong> {task.notes}</p>
            <button
              onClick={() => updateTaskStatus(index)}
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {task.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPage;
