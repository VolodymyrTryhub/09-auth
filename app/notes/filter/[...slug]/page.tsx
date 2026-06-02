import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import NotesClient from './Notes.client';

import { getNotes } from '@/lib/api';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

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
