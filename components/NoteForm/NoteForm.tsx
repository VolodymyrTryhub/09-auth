'use client';

import css from './NoteForm.module.css';

import { useRouter } from 'next/navigation';

import { useNoteStore } from '@/lib/store/noteStore';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api/clientApi';

import type { CreateNoteData } from '@/types/note';

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      clearDraft();

      router.back();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          value={draft.title}
          onChange={e =>
            setDraft({
              ...draft,
              title: e.target.value,
            })
          }
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          rows={6}
          value={draft.content}
          onChange={e =>
            setDraft({
              ...draft,
              content: e.target.value,
            })
          }
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          value={draft.tag}
          onChange={e =>
            setDraft({
              ...draft,
              tag: e.target.value as CreateNoteData['tag'],
            })
          }
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={() => router.back()} className={css.cancelButton}>
          Cancel
        </button>

        <button type="submit" disabled={mutation.isPending} className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
