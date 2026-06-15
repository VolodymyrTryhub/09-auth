'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import Modal from '@/components/Modal/Modal';

import { fetchNoteById } from '@/lib/api/clientApi';

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],

    queryFn: () => fetchNoteById(id),

    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong</p>;
  }

  return (
    <Modal onClose={() => router.back()}>
      <button onClick={() => router.back()}>Close</button>

      <h2>{note.title}</h2>

      <p>Tag: {note.tag}</p>

      <p>{note.content}</p>

      <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
    </Modal>
  );
}
