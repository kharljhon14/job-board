'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function JobForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="mt-10 space-y-6">
        <FormField
          name="title"
          render={() => (
            <FormControl>
              <div>
                <Label className="mb-3">Job Title</Label>
                <Input placeholder="Software Engineer" />
              </div>
            </FormControl>
          )}
        />
        <Button>Create Job</Button>
      </form>
    </Form>
  );
}
