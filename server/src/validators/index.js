import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').max(255),
  password: z.string().min(1, 'Password is required').max(128),
});

export const createDonorSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email').max(255),
  phone: z.string().min(10, 'Valid phone number required').max(15),
  amount: z.number().positive('Amount must be greater than 0').max(100000000),
  message: z.string().max(1000).optional(),
});

export const createEventSchema = z.object({
  title: z.string().min(2, 'Title is required').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']).default('UPCOMING'),
  reminderDaysBefore: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? null : Number(val)),
    z.number().int().min(1).max(30).nullable().default(null)
  ),
});

export const updateEventSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().min(10).max(5000).optional(),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date').optional(),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']).optional(),
  reminderDaysBefore: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? null : Number(val)),
    z.number().int().min(1).max(30).nullable().optional()
  ),
});

export const createVolunteerSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  contactNumber: z.string().min(10, 'Valid phone number required').max(15),
  email: z.string().email('Invalid email').max(255),
  city: z.string().max(100).optional(),
  areaOfInterest: z.string().max(200).optional(),
  availability: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
});

export const createJobSeekerSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  dob: z.string().max(20).optional(),
  gender: z.string().max(20).optional(),
  qualification: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  contactNumber: z.string().min(10, 'Valid phone number required').max(15),
  email: z.string().email('Invalid email').max(255),
  experience: z.string().max(200).optional(),
  skills: z.string().max(500).optional(),
  preferredRole: z.string().max(200).optional(),
  preferredIndustry: z.string().max(200).optional(),
  preferredLocation: z.string().max(200).optional(),
  currentCTC: z.string().max(50).optional(),
  expectedCTC: z.string().max(50).optional(),
  noticePeriod: z.string().max(50).optional(),
  languages: z.string().max(200).optional(),
});

export const createEmployerSchema = z.object({
  organization: z.string().min(2, 'Organization name is required').max(200),
  contactPerson: z.string().min(2, 'Contact person is required').max(100),
  designation: z.string().max(100).optional(),
  contactNumber: z.string().min(10, 'Valid phone number required').max(15),
  email: z.string().email('Invalid email').max(255),
  industryType: z.string().max(200).optional(),
  jobRole: z.string().max(200).optional(),
  vacancies: z.coerce.number().int().positive().max(10000).optional(),
  qualification: z.string().max(200).optional(),
  experience: z.string().max(200).optional(),
  salaryRange: z.string().max(100).optional(),
  jobLocation: z.string().max(200).optional(),
  employmentType: z.string().max(50).optional(),
  expectations: z.string().max(1000).optional(),
});

export const createContactSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email').max(255),
  phone: z.string().max(15).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
});

export const createNewsletterSchema = z.object({
  email: z.string().email('Invalid email').max(255),
});
