import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import s from './searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('uncorrect value', { theme: 'dark' });
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleNameChange = e => {
    setQuery(e.target.value);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onFormSubmit}>
        <button type="submit" className={s.btn}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
