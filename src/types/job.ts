export interface Job {
  id: string;
  userId: string | null;
  userName: string;
  title: string;
  description: string;
  salary: string | null;
  type: JobType;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export type JobType = 'full_time' | 'part_time' | 'gig' | 'any';
export type JobStatus = 'active' | 'closed' | 'draft';
