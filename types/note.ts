export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Health' | 'Important';

export interface Category {
  id: string;
  name: NoteTag;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;

  categoryId: string;

  category: Category;

  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
