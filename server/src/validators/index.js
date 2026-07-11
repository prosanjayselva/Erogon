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

export const createVolunteerSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  contactNumber: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Invalid email'),
  city: z.string().optional(),
  areaOfInterest: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
});

export const createJobSeekerSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  dob: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  address: z.string().optional(),
  contactNumber: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Invalid email'),
  experience: z.string().optional(),
  skills: z.string().optional(),
  preferredRole: z.string().optional(),
  preferredIndustry: z.string().optional(),
  preferredLocation: z.string().optional(),
  currentCTC: z.string().optional(),
  expectedCTC: z.string().optional(),
  noticePeriod: z.string().optional(),
  languages: z.string().optional(),
});

export const createEmployerSchema = z.object({
  organization: z.string().min(2, 'Organization name is required'),
  contactPerson: z.string().min(2, 'Contact person is required'),
  designation: z.string().optional(),
  contactNumber: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Invalid email'),
  industryType: z.string().optional(),
  jobRole: z.string().optional(),
  vacancies: z.number().int().positive().optional(),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  salaryRange: z.string().optional(),
  jobLocation: z.string().optional(),
  employmentType: z.string().optional(),
  expectations: z.string().optional(),
});

export const createContactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

export const createNewsletterSchema = z.object({
  email: z.string().email('Invalid email'),
});
