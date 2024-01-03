import React, { useEffect, useRef, useState } from "react";
import { usePrevious } from "../modules"

//Making Props a type for each component explicitly defines the kind of data the
//component is designed to work with
type Props = {
  description: string;
  complete: boolean;
  id: string;
  toggleTaskComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newDescription: string) => void;
}

//We no longer want to use React.FC<Props>. React 18 removes { children: ReactNode | ReactNode[] }
//as an inherent input because components should accept any type of children. Thus, it is important
//to be explicit about the input types we're using from now on.
const TaskItem = ({ description, complete, id, toggleTaskComplete, deleteTask, editTask }: Props ) => {
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [isEditing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const wasEditing = usePrevious(isEditing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newDescription) {
      editTask(id, newDescription);
      setNewDescription("");
    }
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="task-label" htmlFor={id}>
          New description for {description}
        </label>
        <input id={id}
          className="task-text"
          type="text"
          value={newDescription}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn task-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {description}</span>
        </button>
        <button type="submit" className="btn btn__primary task-edit">
          Save
          <span className="visually-hidden">New description for {description}</span>
        </button>
      </div>
    </form>
  );

  const viewingTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={complete}
          onChange={() => toggleTaskComplete(id)}
        />
        <label className="task-label" htmlFor={id}>
          {description}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}>
          Edit <span className="visually-hidden">{description}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}>
          Delete <span className="visually-hidden">{description}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing && editFieldRef.current) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing && editButtonRef.current) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li className="task">{isEditing ? editingTemplate : viewingTemplate}</li>
  );
};

export default TaskItem;