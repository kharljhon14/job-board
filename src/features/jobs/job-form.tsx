'use client';

import 'easymde/dist/easymde.min.css';

import { useForm } from 'react-hook-form';
import SimpleMdeReact from 'react-simplemde-editor';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function JobForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="mt-10 space-y-6">
        <FormField
          name="title"
          render={() => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" />
              </FormControl>
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
                    <SelectItem value="git">Gig</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-6 flex-wrap">
          <FormField
            name="salaryMin"
            render={() => (
              <FormItem>
                <FormLabel>Minimum Salary</FormLabel>
                <FormControl>
                  <Input
                    className="w-[210px]"
                    placeholder="5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="salaryMax"
            render={() => (
              <FormItem>
                <FormLabel>Maximum Salary</FormLabel>
                <FormControl>
                  <Input
                    className="w-[210px]"
                    placeholder="10"
                  />
                </FormControl>
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
            </FormItem>
          )}
        />

        <Button>Create Job</Button>
      </form>
    </Form>
  );
}
