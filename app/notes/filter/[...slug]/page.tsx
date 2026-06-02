import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { getNotes } from '@/lib/api';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug[0];

  return {
    title: `Notes - ${filter}`,
    description: `Viewing notes filtered by ${filter}`,

    openGraph: {
      title: `Notes - ${filter}`,
      description: `Viewing notes filtered by ${filter}`,
      url: `/notes/filter/${filter}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const currentFilter = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentFilter],

    queryFn: () =>
      getNotes({
        page: 1,
        search: '',
        tag: currentFilter === 'all' ? undefined : currentFilter,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={currentFilter} tag={currentFilter} />
    </HydrationBoundary>
  );
}
