import React, { useState, useRef } from "react";
import { throttle } from "throttle-debounce";


function SearchForm({ search }) {
  const initialState = { term: "" };
  const [formData, setFormData] = useState(initialState);

  const throttleSearch = useRef(throttle(1000, (formData) => {
    search(formData)
  }));

  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData);
    setFormData(initialState);
  }


  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    const newFormData = { ...formData, [name]: value };

    throttleSearch.current(newFormData);
    setFormData(newFormData);
  }

  return (
    <form className="form-inline mt-4" onSubmit={handleSubmit}>
      <div className="form-group mx-2">
        <input
          type="text"
          className="form-control"
          name="term"
          value={formData.term}
          placeholder="Search Term..."
          onChange={handleChange} />
      </div>
      <button className="btn btn-primary btn-md form-group">🔍 Search</button>
    </form>
  )
}

export default SearchForm;