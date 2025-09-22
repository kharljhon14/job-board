'use client';

import 'easymde/dist/easymde.min.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
});
import dynamic from 'next/dynamic';
import z from 'zod/v4';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useCreateJob } from './api/use-create-job';

const newJobFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'title must not exceed 255 characters'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['full_time', 'part_time', 'gig', 'any']).default('any'),
  status: z.enum(['draft', 'active', 'closed']).default('draft'),
  salary: z.string().max(255, 'title must not exceed 255 characters')
});

type NewJobFormSchema = z.infer<typeof newJobFormSchema>;

export default function JobForm() {
  const form = useForm({
    resolver: zodResolver(newJobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'any',
      status: 'draft',
      salary: ''
    }
  });

  const createMutation = useCreateJob();
  const onSubmit: SubmitHandler<NewJobFormSchema> = (data) => {
    createMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="mt-10 space-y-6"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Software Engineer"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder="$5.00 - $10.00 per hour"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-6 flex-wrap">
          <FormField
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Status</FormLabel>
                <div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue="draft"
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[210px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue="any"
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[210px]">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time</SelectItem>
                    <SelectItem value="part_time">Part-time</SelectItem>
                    <SelectItem value="gig">Gig</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <SimpleMdeReact
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Create Job</Button>
      </form>
    </Form>
  );
}
