import type { Metadata } from 'next';

import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',

  openGraph: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    //url: '/not-found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>

      <p className={css.text}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
