export interface Job {
  id: string;
  userId: string | null;
  userName: string;
  title: string;
  description: string;
  salary: string | null;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
