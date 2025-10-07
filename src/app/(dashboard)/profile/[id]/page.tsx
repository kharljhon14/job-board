'use client';

import { useAuth } from '@clerk/nextjs';
import { Ghost } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty';
import SearchJobForm from '@/features/homepage/search-job-form';
import { useGetJobs } from '@/features/jobs/api/use-get-jobs';
import JobsContainer from '@/features/jobs/components/jobs-container';
import paths from '@/lib/path';
export default function ProfilePage() {
  const auth = useAuth();

  const [searchValue, setSearchValue] = useState('');

  const handleSearchOnSubmit = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const jobsQuery = useGetJobs({ searchParam: searchValue, userId: auth.userId ?? '' });
  const data = jobsQuery.data?.data || [];
  return (
    <div className="container mx-auto ">
      <SearchJobForm handleSearchOnSubmit={handleSearchOnSubmit} />

      {data.length > 0 ? (
        <div className="mt-4">
          <JobsContainer
            jobs={jobsQuery.data?.data || []}
            isLoading={jobsQuery.isLoading}
          />
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Ghost />
            </EmptyMedia>
          </EmptyHeader>
          <EmptyTitle>No Jobs Yet</EmptyTitle>
          <EmptyDescription>
            Start by creating a job posting to find the right candidates.
          </EmptyDescription>
          <EmptyContent>
            <Link href={paths.createJobPath()}>
              <Button>Create Job</Button>
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
