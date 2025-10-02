'use client';

import { useState } from 'react';

import SearchJobForm from '@/features/homepage/search-job-form';
import { useGetJobs } from '@/features/jobs/api/use-get-jobs';
import JobsContainer from '@/features/jobs/components/jobs-container';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchOnSubmit = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const jobsQuery = useGetJobs('active', searchValue);

  return (
    <div className="container mx-auto px-4 ">
      <SearchJobForm handleSearchOnSubmit={handleSearchOnSubmit} />

      <div className="mt-4">
        <JobsContainer
          jobs={jobsQuery.data?.data || []}
          isLoading={jobsQuery.isLoading}
        />
      </div>
    </div>
  );
}
