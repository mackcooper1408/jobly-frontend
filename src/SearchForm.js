import React, { useState } from "react";

function SearchForm({ search }) {
  const initialState = { term: "" };
  const [formData, setFormData] = useState(initialState);

  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData);
    setFormData(initialState);
  }

  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  return (
    <form className="form-inline mt-4" onSubmit={handleSubmit}>
      <div className="form-group mx-2">
        <input
          type="text"
          className="form-control"
          name="term"
          value={formData.term}
          placeholder="Enter company name"
          onChange={handleChange} />
      </div>
      <button className="btn btn-primary btn-md form-group">🔍 Search</button>
    </form>
  )
}

export default SearchForm;