'use client';

import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function SearchJobForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-4 pt-4 ">
        <FormField
          name="job"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-12"
                  {...field}
                  placeholder="What kind of job are you looking for?"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          size="lg"
        >
          <Search />
          Find Jobs
        </Button>
      </form>
    </Form>
  );
}
