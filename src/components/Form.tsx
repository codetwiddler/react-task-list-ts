import React, { useState, ChangeEvent, FormEvent } from "react";

type FormProps = {
  addTask: (description: string) => void;
};

const Form = ({ addTask }: FormProps) => {
  const [description, setDescription] = useState<string>("");

  //We'll Type the event parameter as FormEvent for form submission events
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (description) {
      addTask(description);
      setDescription("");
    }
  }

  //We'll Type the event parameter as ChangeEvent for input change events
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
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
