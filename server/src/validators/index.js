import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const createDonorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  amount: z.number().positive('Amount must be greater than 0'),
  message: z.string().optional(),
});

export const createEventSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']).default('UPCOMING'),
});

export const updateEventSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date').optional(),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']).optional(),
});
