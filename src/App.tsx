import React, { useState } from "react";
import TaskItem from "./components/TaskItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
//import './App.css';

const taskFakes: Task[] = [
  { id: "task-0", description: "Eat",    complete: true },
  { id: "task-1", description: "Sleep",  complete: false },
  { id: "task-2", description: "Repeat", complete: false },
];

const filters: Record<FilterKey, (task: Task) => boolean> = {
  All: () => true,
  Active: (task) => !task.complete,
  Completed: (task) => task.complete,
};

const filterNames = Object.keys(filters) as FilterKey[]

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(taskFakes);
  const [filter, setFilter] = useState<FilterKey>('All');

  const filterList = filterNames.map((filterName) => (
    <FilterButton
      key={filterName}
      filterName={filterName}
      isPressed={filterName === filter}
      setFilter={setFilter}
    />
  ));

  const addTask = (description: string): void => {
    const isDuplicate = tasks.some((task) => task.description === description);
    if (!isDuplicate) {
      const newTask: Task = { id: `task-${nanoid()}`, description, complete: false };
      setTasks([...tasks, newTask]);
    }
  };

  const editTask = (id: string, newDescription: string): void => {
    const editedTaskList = tasks.map((task) =>
      id === task.id ? { ...task, description: newDescription } : task
    );
    setTasks(editedTaskList);
  }

  const deleteTask = (id: string): void => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const toggleTaskComplete = (id: string): void => {
    const updatedTasks = tasks.map((task) =>
      id === task.id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
  }

  const taskList = tasks
  .filter(filters[filter])
  .map((task) => (
    <TaskItem
      id={task.id}
      description={task.description}
      complete={task.complete}
      key={task.id}
      toggleTaskComplete={toggleTaskComplete}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="taskapp stack-large">
      <h1>Task List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="task-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
