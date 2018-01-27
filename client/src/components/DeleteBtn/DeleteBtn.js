import React from "react";
import PropTypes from 'prop-types';
import "./DeleteBtn.css";

class DeleteBtn extends React.Component {
  
  render () {
    return (
      <button>
        <span className="delete-btn" onClick={this.props.onClick}>
        Save Article
      </span>
      </button>
    );
  }
}

DeleteBtn.props = {
  onClick: PropTypes.func
}

export default DeleteBtn;
