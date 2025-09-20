import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { $ZodError } from 'zod/v4/core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatZodError(error: $ZodError) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path.join('.') || 'form';

    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {});
}
