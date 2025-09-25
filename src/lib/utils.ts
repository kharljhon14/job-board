/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod/v4';
import { $ZodError } from 'zod/v4/core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatZodError(error: $ZodError<unknown> | ZodError<any>) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path.join('.') || 'form';

    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {});
}

export function generateMetadata(totalItems: number, page: number, pageSize: number) {
  return {
    currentPage: page,
    pageSize: pageSize,
    firstPage: 1,
    lastPage: Math.ceil(totalItems / pageSize),
    totalItems
  };
}
