import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      toast.error(`Field is empty!`);

      return;
    }

    onSubmit(searchValue);
    this.resetInput();
  };

  changeSearchValue = e => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };

  resetInput = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <header className="Searchbar">
        <Toaster position="top-center" reverseOrder={false} />

        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="Submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.changeSearchValue}
            value={searchValue}
            name="searchValue"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
