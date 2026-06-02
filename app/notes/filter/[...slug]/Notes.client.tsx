'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';

import { getNotes } from '@/lib/api';

import css from './page.module.css';

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value);

      setPage(1);
    },

    300
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search, tag],

    queryFn: async () => {
      const result = await getNotes({
        page,
        search,
        tag: tag === 'all' ? undefined : tag,
      });

      return result;
    },

    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <div className={css.toolbar}>
        <SearchBox onChange={updateSearch} />

        <Pagination currentPage={page} pageCount={data.totalPages} onPageChange={setPage} />

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      <NoteList notes={data.notes} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
