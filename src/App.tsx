import React, { useMemo, useState } from "react";
import TaskItem from "./components/TaskItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import './App.css';

//Fake some initial data because we don't have any persistence, yet.
//That will require an API and repo of some flavor
const taskFakes: Task[] = [
  { id: "task-0", description: "Reboot",    complete: true },
  { id: "task-1", description: "Work",  complete: false },
  { id: "task-2", description: "Recharge", complete: false },
  { id: "task-3", description: "Walk home", complete: false },
  { id: "task-4", description: "Shutdown", complete: false },
];

//Setup some filters by defining a set of keys with requisite
//functions which take in a task and return a boolean based on
//the task's 'complete' status
const filters: Record<FilterKey, (task: Task) => boolean> = {
  All: () => true,
  Active: (task) => !task.complete,
  Completed: (task) => task.complete,
};

//Use the filters object's own properties to make an array of
//filter names by explicitly reassuring TS that these properties
//are of the flavor 'FilterKey'
const filterNames = Object.keys(filters) as FilterKey[]

//Expressing everything as const is a convention designed to make things safer and/or more predictable
//because the functions are immutable (although the values they hold probably won't be). Also prevents
//anything weird happening from hoisting. Also no more 'this' complications.
const App = () => {
  const [tasks, setTasks] = useState<Task[]>(taskFakes);
  const [filter, setFilter] = useState<FilterKey>('All');

  //Not a 'complex' calculation, but we like to memoize things that will be calculated
  //once in a particular way but whose results we'll leverage repeatedly.
  const filterList = useMemo(() => filterNames.map((filterName) => (
    <FilterButton
      key={filterName}
      filterName={filterName}
      isPressed={filterName === filter}
      setFilter={setFilter}
    />
  )), [filter, setFilter]);

  //Add a task, but only if the description doesn't match an existing description
  //We verify this condition in a very rudimentary fashion by forcing down the case
  //on each condition and then evaluating them against one another.
  //We currently have nothing in place to notify the user that the duplicate existed
  //and that no new Task was added. It just doesn't happen
  const addTask = (description: string): void => {
    const isDuplicate = tasks.some((task) => task.description.toLowerCase() === description.toLowerCase());
    if (!isDuplicate) {
      const newTask: Task = { id: `task-${nanoid()}`, description, complete: false };
      setTasks([...tasks, newTask]);
    }
  };

  //Edit a task and then bust out the list of Tasks again. But only if the edit
  //produced something different than what was initially in place.
  const editTask = (id: string, newDescription: string): void => {
    const isSame = tasks.some((task) => task.description.toLowerCase() === newDescription.toLowerCase());
    if (!isSame) {
      const editedTaskList = tasks.map((task) =>
        id === task.id ? { ...task, description: newDescription } : task
      );
      setTasks(editedTaskList);
    }
  }

  //Delete a task. Should have a confirmation methodology of some kind.
  const deleteTask = (id: string): void => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  //Set completion status of the given task, then update the Task list.
  const toggleTaskComplete = (id: string): void => {
    const updatedTasks = tasks.map((task) =>
      id === task.id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
  }

  //Generate the array of TaskItem components
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

  //Some basic UI flavor to establish the need/lack for pluralization of
  //the remaining tasks' header labeling
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="taskApp stack-large">
      <h1>Task List</h1>
      <Form addTask={addTask} />
      <div >
        <div>
          <span>Filter by Task Status</span>
          <div className="filters btn-group stack-exception">
            {filterList}
          </div>
        </div>
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
