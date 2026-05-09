import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'buyer']),
  university: z.string().optional(),
  company: z.string().optional(),
  terms: z.boolean().refine(v => v === true, 'You must agree to the terms'),
});

export const auctionSchema = z.object({
  title: z.string().min(5, 'Title is too short'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(20, 'Description is too short'),
  startingBid: z.number().min(200, 'Minimum starting bid is Rs. 200'),
  deliveryTime: z.string().min(1, 'Delivery time is required'),
  duration: z.number().min(1, 'Duration is required'),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags'),
  image: z.string().optional(),
});

export const bidSchema = (minAmount) => z.object({
  amount: z.number().min(minAmount, `Bid must be at least Rs. ${minAmount}`),
  bidderName: z.string().min(2, 'Name is required'),
  whatsapp: z.string().optional(),
});
