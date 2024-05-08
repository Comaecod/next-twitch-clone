interface ResultProps {
  term?: string;
}

import { getSearch } from '@/lib/search-service';
import React from 'react';
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

export const Results = async ({ term }: ResultProps) => {
  const data = await getSearch(term);

  return (
    <div>
      <h2>Results for term &#39;{term}&#39;</h2>
      {data.length === 0 && (
        <p className='text-muted-foreground text-sm'>
          No results found. Try searching for something else.
        </p>
      )}
      <div className='flex flex-col gap-y-4'>
        {data.map((result) => (
          <ResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export const ResultSkeleton = () => {
  return (
    <div>
      <Skeleton className='h-8 w-[290px] mb-4' />
      <div className='flex flex-col gap-y-4'>
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
