'use server';

import { prisma } from '@/lib/prisma';
import { FormStateRegisterAdminUser, signUpSchema } from '@/lib/zod';
import * as bcrypt from 'bcrypt-ts';

export async function updateAdminUser(state: FormStateRegisterAdminUser, formData: FormData): Promise<FormStateRegisterAdminUser> {
    const validatedFields = signUpSchema.safeParse({
        name: formData.get('name') as string,
        email: (formData.get('email') as string)?.toLowerCase().trim(),
        password: formData.get('password') as string,
        role: formData.get('role') as string,
        password_confirmation: formData.get('password_confirmation') as string
    });

    const id = formData.get('id') as string;

    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

    const { name, email, password, role } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser && existingUser.id !== id) return { errors: { email: ['This email is already in use by another user.'] } };

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.update({ where: { id }, data: { name, email, password: hashedPassword, role } });

        return { message: 'User updated successfully!' };

    } catch (error) {
        console.error(error);
        return { info: 'Something went wrong. Please try again later.' };
    }
}