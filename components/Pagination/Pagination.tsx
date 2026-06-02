'use client';

import ReactPaginate from 'react-paginate';

import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
