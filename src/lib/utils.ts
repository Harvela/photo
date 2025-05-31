import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names together and merges Tailwind CSS classes
 * Uses clsx for conditional class names and tailwind-merge to handle conflicting styles
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
