'use client';

import { useAuth } from '@clerk/nextjs';
import { format } from 'date-fns';
import {
  Bookmark,
  BriefcaseBusiness,
  Calendar,
  CircleDollarSign,
  Contact,
  SquarePen
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Markdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetJob } from '@/features/jobs/api/use-get-job';
import JobTypeBadge from '@/features/jobs/components/job-type-badge';
import paths from '@/lib/path';

export default function JobPage() {
  const { id } = useParams();
  const auth = useAuth();

  const jobQuery = useGetJob(id?.toString());

  if (jobQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (jobQuery.isError) {
    return <div>Something went wrong</div>;
  }

  if (jobQuery.isSuccess) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-700 relative text-white rounded-xl flex items-center justify-center flex-col p-6 h-[14rem]">
          {jobQuery.data.data.userId === auth.userId && (
            <Link
              href={paths.editJobPath(jobQuery.data.data.id)}
              className=""
            >
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-5 top-5"
              >
                <SquarePen /> Edit
              </Button>
            </Link>
          )}
          <h1 className="font-semibold">{jobQuery.data.data.title}</h1>
          <div className="mt-4 flex items-center gap-2">
            <Button
              size="lg"
              variant="secondary"
            >
              Apply for this job
            </Button>
            <Button size="lg">
              <Bookmark />
              Bookmark
            </Button>
          </div>
        </div>

        <div className="p-6 rounded-xl border shadow space-y-3">
          <div className="flex gap-4 items-center">
            <BriefcaseBusiness size={30} />
            <div>
              <p className="text-xs uppercase">Type of work</p>
              <JobTypeBadge jobType={jobQuery.data.data.type} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Contact size={30} />
            <div>
              <p className="text-xs uppercase">Contact Person</p>
              <p>{jobQuery.data.data.userName}</p>
            </div>
          </div>
          {jobQuery.data.data?.salary && (
            <div className="flex items-center gap-4">
              <CircleDollarSign size={30} />
              <div>
                <p className="text-xs uppercase">Salary</p>
                <p>{jobQuery.data.data.salary}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <Calendar size={30} />
            <div>
              <p className="text-xs uppercase">Date</p>
              <p>{format(new Date(jobQuery.data.data.createdAt), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border shadow">
          <div>
            <h2 className="uppercase font-semibold text-xl">Job Overview</h2>
          </div>
          <Separator className="my-4" />
          <div className="prose">
            <Markdown>{jobQuery.data.data.description}</Markdown>
          </div>
        </div>
      </div>
    );
  }
}
