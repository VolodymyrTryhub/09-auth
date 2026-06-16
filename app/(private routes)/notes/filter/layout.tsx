import css from '../LayoutNotes.module.css';

type LayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: LayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>

      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
