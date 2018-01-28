import React from "react";
import PropTypes from 'prop-types';

class SearchJumbotron extends React.Component {

  render () {

    return (
      <div style={{ height: 350, clear: 'both' }} className="jumbotron">
        {this.props.children}
      </div>
      );
    }

}

SearchJumbotron.props = {
  children: PropTypes.node
}

export default SearchJumbotron;