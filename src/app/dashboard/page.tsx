import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DashboardPageClient from './dashboard-client';

export default async function Dashboard() {
    const session = await auth();
    const user = await prisma.user.findUnique({ where: { id: session?.user.id } });
    if (!session?.user || !user) redirect('/login');
    return <DashboardPageClient />;
}
