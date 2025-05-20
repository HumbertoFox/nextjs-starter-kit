import UsersBreadcrumb from '@/components/breadcrumbs/users-breadcrumb';
import { prisma } from '@/lib/prisma';
import UsersClient from './users-client';

const pageSize = 10;

export default async function Users(props: { searchParams?: Promise<{ query?: string; page?: string; }>; }) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        select: { id: true, name: true, email: true },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });

    const totalUsers = await prisma.user.count({ where: { role: 'USER' } });
    const totalPages = Math.ceil(totalUsers / pageSize);
    return (
        <>
            <UsersBreadcrumb />
            <UsersClient users={users} currentPage={currentPage} totalPages={totalPages} />
        </>
    );
}
