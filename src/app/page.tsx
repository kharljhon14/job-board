'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import SearchJobForm from '@/features/homepage/search-job-form';
import { useGetJobs } from '@/features/jobs/api/use-get-jobs';
import JobsContainer from '@/features/jobs/components/jobs-container';
import paths from '@/lib/path';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchOnSubmit = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const jobsQuery = useGetJobs(searchValue);

  return (
    <div className="container mx-auto px-4 ">
      <SearchJobForm handleSearchOnSubmit={handleSearchOnSubmit} />
      <Link href={paths.createJobPath()}>
        <Button>Create Job</Button>
      </Link>
      <div className="mt-4">
        <JobsContainer
          jobs={jobsQuery.data?.data || []}
          isLoading={jobsQuery.isLoading}
        />
      </div>
    </div>
  );
}
