import { ZodType, z } from 'zod';
import { ContactFormData, ProductFormData, SignUpFormData } from './utils/types';

export const issueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export const ProductFormSchema: ZodType<ProductFormData> = z.object({
    title: z.string().min(10, {message: 'Product title must be at least 10 characters.'}).max(100, {message: 'Product title must be at most 100 characters.'}),
    price: z.number().min(1, {message: 'Price must be at least 1.'}),
    category: z.string().min(2, {message: 'Category is required.'}),
});

export const SignUpFormSchema: ZodType<SignUpFormData> = z.object({
  name: z.string().min(1, {message: 'Full name is required.'}),
  email: z.string().min(1, {message: 'Email is required.'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}),
});

export const ContactFormSchema: ZodType<ContactFormData> = z.object({
    firstName: z.string().min(2, {message: 'First name must be at least 2 characters.'}).max(20, {message: 'First name must be at most 20 characters.'}),
    lastName: z.string().min(2, {message: 'Last name must be at least 2 characters.'}).max(20, {message: 'Last name must be at most 20 characters.'}),
    country: z.string().min(2, {message: 'Country is required.'}),
    city: z.string().min(2, {message: 'City must be at least 2 characters.'}).max(20, {message: 'City name must be at most 20 characters.'}),
    postalCode: z.string().min(5, {message: 'Postal code name must be at least 5 characters.'}).max(15, {message: 'Postal code name must be at least 15 characters.'}),
    phone: z.string().min(7, {message: 'Phone number must contain at least 7 digits.'}).max(15, {message: 'Phone number must contain at most 15 digits.'}),
    address: z.string().min(10, {message: 'Address must be at least 10 characters.'}).max(50, {message: 'City must be at most 50 characters.'})
  });
