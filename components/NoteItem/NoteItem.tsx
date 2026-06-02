import Link from 'next/link';
import type { Note } from '@/types/note';

type Props = {
  item: Note;
};

export default function NoteItem({ item }: Props) {
  return (
    <li>
      <Link href={`/notes/${item.id}`} scroll={false}>
        View details
      </Link>
    </li>
  );
}
