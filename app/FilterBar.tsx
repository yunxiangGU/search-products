import React from "react";
import { updateSearchInput, flipInStockOnly } from "./slice";
import { useAppDispatch } from "./hooks";

export default function FilterBar() {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded m-10 py-10 px-64 flex flex-col items-center drop-shadow">
      <input
        autoFocus
        id="searchInput"
        type="text"
        className="bg-gray-200 rounded text-center px-44 py-2"
        placeholder="Enter search..."
        onInput={() =>
          dispatch(
            updateSearchInput(
              (document.getElementById("searchInput") as HTMLInputElement).value
            )
          )
        }
      />
      <div className="flex items-center pt-10  text-lg">
        <input
          type="checkbox"
          className="mx-2"
          onClick={() => dispatch(flipInStockOnly())}
        />
        <label>Only show products in stock</label>
      </div>
    </div>
  );
}
