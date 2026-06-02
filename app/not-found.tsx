import css from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>

      <p className={css.text}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
