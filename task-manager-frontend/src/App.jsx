import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshTasks = () => setRefreshFlag(!refreshFlag);
  const clearSelection = () => setSelectedTask(null);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm
        selectedTask={selectedTask}
        refreshTasks={refreshTasks}
        clearSelection={clearSelection}
      />
      <TaskList key={refreshFlag} onEdit={setSelectedTask} />
    </div>
  );
};

export default App;
