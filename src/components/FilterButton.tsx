import React from "react";

type FilterButtonProps = {
    filterName: FilterKey;
    isPressed: boolean;
    setFilter: (filter: FilterKey) => void;
}

//The spans in here with "Show" and " tasks" are accessibility additions.
//When a screen reader arrives on this button, it's going to read those spans
//in order of appearance, resulting in "Show All tasks", "Show Active tasks", etc.
const FilterButton = ({ filterName, isPressed, setFilter }: FilterButtonProps) => {
    return (
        <button
          type="button"
          className="btn toggle-btn"
          aria-pressed={isPressed}
          onClick={() => setFilter(filterName)}>
          <span className="visually-hidden">Show </span>
          <span>{filterName}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      );
}

export default FilterButton;