/* eslint-disable no-restricted-imports */
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

const clsxm = (...classes: ClassValue[]): string => twMerge(clsx(...classes));

export { type ClassValue, clsxm };
