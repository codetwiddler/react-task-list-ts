import React from "react";

type Props = {
    filterName: FilterKey;
    isPressed: boolean;
    setFilter: (filter: FilterKey) => void;
}

const FilterButton = ({ filterName, isPressed, setFilter }: Props) => {
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