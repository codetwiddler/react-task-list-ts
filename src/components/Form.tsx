import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the types for your props here
type Props = {
  addTask: (description: string) => void;
};

const Form = ({ addTask }: Props) => {
  const [description, setDescription] = useState<string>("");

  // You can type the event parameter as FormEvent for form submission events
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (description) {
      addTask(description);
      setDescription("");
    }
  }

  // You can type the event parameter as ChangeEvent for input change events
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-task-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-task-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={description}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
