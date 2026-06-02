import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

import { fetchNoteById } from '@/lib/api';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return (
    <Modal onClose={() => {}}>
      <NotePreview note={note} />
    </Modal>
  );
}
