import React from "react";
import PropTypes from 'prop-types';
import "./SearchForm.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
class SearchForm extends React.Component {

  render () {
    const { query, beginDate, endDate, handleInputChange, handleInputChange2, handleInputChange3, handleFormSubmit } = this.props

    return (
      <form className="search">
        <div className="form-group">
          <label htmlFor="breed">Article Search Topic:</label>
          <input
            value={query}
            onChange={handleInputChange}
            name="topic"
            list="topics"
            type="text"
            className="form-control"
            placeholder="Type in a topic to begin"
            id="breed"
          />
          <input
            value={beginDate}
            onChange={handleInputChange2}
            name="begin"
            list="begins"
            type="text"
            className="form-control"
            placeholder="Begin Date (YYYYDDMM)"
            id="begin"
          />
          <input
            value={endDate}
            onChange={handleInputChange3}
            name="end"
            list="ends"
            type="text"
            className="form-control"
            placeholder="End Date (YYYYDDMM)"
            id="end"
          />
          
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="btn btn-success"
          >
            Search
          </button>
        </div>
      </form>
    );
  }
}

SearchForm.props = {
  query: PropTypes.string,
  beginDate: PropTypes.string,
  endDate: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func
}

export default SearchForm;