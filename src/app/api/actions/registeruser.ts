'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { FormStateRegisterUser, signUpSchema } from '@/lib/zod';
import * as bcrypt from 'bcrypt-ts';

export async function registerUser(state: FormStateRegisterUser, formData: FormData): Promise<FormStateRegisterUser> {
    const validatedFields = signUpSchema.safeParse({
        name: formData.get('name') as string,
        email: (formData.get('email') as string)?.toLowerCase().trim(),
        password: formData.get('password') as string,
        role: formData.get('role') as string,
        password_confirmation: formData.get('password_confirmation') as string
    });

    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };
    
    const { name, email, password, role } = validatedFields.data;
    const session = await auth();

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        
        if (session?.user && existingUser) return { errors: { email: ['This email is already in use.'] } }
        
        if (existingUser) return { info: 'Data already registered' };
        
        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({ data: { name, email, password: hashedPassword, role } });

        return { message: 'Data registered successfully! Directing to Dashboard please wait...' };

    } catch (error) {
        console.error(error);
        return { info: 'Something went wrong. Please try again later.' };
    }
}