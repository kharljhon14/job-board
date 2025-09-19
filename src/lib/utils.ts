import { $ZodError } from 'zod/v4/core';

export function mapZodError(error: $ZodError) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path.join('.') || 'form';
    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {});
}
