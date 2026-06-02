'use client';

import css from './NoteForm.module.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';

import type { CreateNoteData } from '@/types/note';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Required'),

  content: Yup.string().max(500, 'Maximum 500 characters'),

  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required('Required'),
});

const initialValues: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      onClose();
    },
  });

  const handleSubmit = (values: CreateNoteData) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>

          <Field id="title" name="title" type="text" className={css.input} />

          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>

          <Field as="textarea" id="content" name="content" rows={6} className={css.textarea} />

          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>

            <option value="Work">Work</option>

            <option value="Personal">Personal</option>

            <option value="Meeting">Meeting</option>

            <option value="Shopping">Shopping</option>
          </Field>

          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>

          <button type="submit" disabled={mutation.isPending} className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
