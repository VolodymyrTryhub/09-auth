'use client';

import css from './SearchBox.module.css';

type SearchBoxProps = {
  onChange: (value: string) => void;
};

const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      type="text"
      placeholder="Search notes"
      className={css.input}
      onChange={event => onChange(event.target.value)}
    />
  );
};

export default SearchBox;
