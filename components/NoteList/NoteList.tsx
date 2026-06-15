'use client';

import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteList.module.css';

import { deleteNote } from '@/lib/api/clientApi';

import type { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  console.log(JSON.stringify(notes[0], null, 2));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const handleDelete = (id: string): void => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button type="button" className={css.button} onClick={() => handleDelete(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
