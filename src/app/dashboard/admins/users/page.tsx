import UsersBreadcrumb from '@/components/breadcrumbs/users-breadcrumb';
import { prisma } from '@/lib/prisma';
import UsersClient from './users-client';

export default async function Users() {
    const users = await prisma.user.findMany({ where: { role: 'USER' }, select: { id: true, name: true, email: true } });
    return (
        <>
            <UsersBreadcrumb />
            <UsersClient users={users} />
        </>
    );
}
