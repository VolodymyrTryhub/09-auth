import css from './page.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>

        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing personal notes. It
          helps keep your thoughts organized and accessible in one place.
        </p>

        <p className={css.description}>
          Create, search, filter, and manage notes with a clean and user-friendly interface.
        </p>
      </div>
    </main>
  );
}
