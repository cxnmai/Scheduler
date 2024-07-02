import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [name, setName] = useState('');
  const [timeNeeded, setTimeNeeded] = useState('');
  const [startTime, setStartTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      name,
      timeNeeded,
      startTime,
      notes,
      status: 'Not Started',
    };
    addTask(task);
    setName('');
    setTimeNeeded('');
    setStartTime('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Approximate Time Needed:</label>
        <input
          type="text"
          value={timeNeeded}
          onChange={(e) => setTimeNeeded(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
