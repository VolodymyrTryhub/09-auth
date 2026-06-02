import axios from 'axios';
import type { Note, CreateNoteData } from '@/types/note';

axios.defaults.baseURL = 'https://next-v1-notes-api.goit.study';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

interface GetNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export const getNotes = async ({
  page = 1,
  search = '',
  tag,
}: GetNotesParams): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,

      ...(tag &&
        tag !== 'all' && {
          tag,
        }),
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);

  return res.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const res = await axios.post<Note>('/notes', noteData);

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`);

  return res.data;
};
