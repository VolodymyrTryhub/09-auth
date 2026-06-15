import api from './api';
import type { Note, CreateNoteData } from '@/types/note';
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

interface AuthData {
  email: string;
  password: string;
}

export const fetchNotes = async ({
  page = 1,
  search = '',
  tag,
}: FetchNotesParams): Promise<NotesResponse> => {
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
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const res = await api.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (data: AuthData): Promise<User> => {
  try {
    const res = await api.post<User>('/auth/register', data);
    return res.data;
  } catch (error) {
    console.log('REGISTER ERROR:', error);
    throw error;
  }
};

export const login = async (data: AuthData): Promise<User> => {
  try {
    const res = await api.post<User>('/auth/login', data);
    return res.data;
  } catch (error) {
    console.log('LOGIN ERROR:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get<User | null>('/auth/session');
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: Partial<User>): Promise<User> => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};
