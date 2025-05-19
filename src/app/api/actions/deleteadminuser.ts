'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteAdminUserById(formData: FormData) {
    const session = await auth();
    const userId = formData.get('userId') as string;

    if (!session || session?.user.role !== 'ADMIN') return;
    if (!userId || session.user.id === userId) return;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return;

        await prisma.user.delete({ where: { id: userId } });

        if (user?.role === 'ADMIN') {
            revalidatePath('/dashboard/admins');
        } else if (user?.role === 'USER') {
            revalidatePath('/dashboard/users');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}