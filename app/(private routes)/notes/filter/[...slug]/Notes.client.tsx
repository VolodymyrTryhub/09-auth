'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import { fetchNotes } from '@/lib/api/clientApi';

import css from './page.module.css';

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');

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
      const result = await fetchNotes({
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

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      <NoteList notes={data.notes} />
    </>
  );
}
