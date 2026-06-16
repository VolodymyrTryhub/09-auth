import { cookies } from 'next/headers';

import api from './api';

import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  search = '',
  tag,
}: FetchNotesParams): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const res = await api.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag &&
        tag !== 'all' && {
          tag,
        }),
    },

    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const res = await api.get<User | null>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
