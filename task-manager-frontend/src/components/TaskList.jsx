import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/api';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [progress, setProgress] = useState(0);

  const fetchTasks = async () => {
    const res = await getTasks({ search, status: statusFilter });
    const fetchedTasks = res.data;
    setTasks(fetchedTasks);

    // Progress calculation
    const completedCount = fetchedTasks.filter(task => task.status === 'Completed').length;
    setProgress(
      fetchedTasks.length > 0
        ? (completedCount / fetchedTasks.length) * 100
        : 0
    );
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="task-list">
      <h2>All Tasks</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: '8px', padding: '5px' }}
      />

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ padding: '5px' }}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Progress Bar */}
      <div style={{ margin: '10px 0', background: '#ddd', height: '20px', borderRadius: '5px' }}>
        <div
          style={{
            width: `${progress}%`,
            background: 'green',
            height: '100%',
            borderRadius: '5px',
            transition: 'width 0.3s'
          }}
        />
      </div>
      <p>{Math.round(progress)}% Completed</p>

      {/* Task List */}
      {tasks.map(task => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due: {task.dueDate?.split('T')[0]}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
