import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../actions';

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Filter movies by title..."
    />
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);