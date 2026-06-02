import type { Note } from '@/types/note';

import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.tag}>{note.category.name}</p>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
