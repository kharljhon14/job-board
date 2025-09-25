import { format } from 'date-fns';
import Link from 'next/link';
import Markdown from 'react-markdown';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Job } from '@/types/job';

import JobSalary from './job-salary';
import JobTypeBadge from './job-type-badge';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <Link href="/">
      <Card className=" hover:shadow-md transition-all duration-100">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p>{job.title}</p>
            <JobTypeBadge jobType={job.type} />
          </CardTitle>
          {job.salary && (
            <CardDescription>
              <JobSalary salary={job.salary} />
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className=" prose line-clamp-4">
          <Markdown>{job.description}</Markdown>
        </CardContent>
        <CardFooter>Date: {format(new Date(job.createdAt), 'MMM dd, yyyy')}</CardFooter>
      </Card>
    </Link>
  );
}
