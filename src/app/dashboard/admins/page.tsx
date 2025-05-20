export const dynamic = 'force-dynamic';

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/lib/prisma';
import { UserRoundPen, UserRoundX } from 'lucide-react';
import Link from 'next/link';
import AdminsBreadcrumbs from '@/components/breadcrumbs/admins-breadcrumbs';
import { DeleteAdminUserButton } from './delete-admin-user-button';

export default async function Admins() {
    const session = await auth();
    const loggedAdmin = session?.user.id;
    const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
    return (
        <>
            <AdminsBreadcrumbs />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    ))}
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table className="w-full text-center">
                        <TableHeader>
                            <TableRow className="cursor-default">
                                <TableHead className="text-center">Nº</TableHead>
                                <TableHead className="text-center">ID</TableHead>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Email</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {admins.length === 0 && (
                                <TableRow className="text-red-600 cursor-default">
                                    <TableCell colSpan={5}>There are no other administrators</TableCell>
                                </TableRow>
                            )}
                            {admins.map((admin, index) => (
                                <TableRow key={index} className="cursor-default">
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{admin.id}</TableCell>
                                    <TableCell>{admin.name}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell className="flex justify-evenly items-center my-1">
                                        <Link href={admin.id === loggedAdmin ? '/dashboard/settings/profile' : `/dashboard/admins/${admin.id}/edit`} title={`Editar ${admin.name}`}>
                                            <Icon
                                                iconNode={UserRoundPen}
                                                aria-label={`Editar ${admin.name}`}
                                                className="size-6 text-yellow-600 hover:text-yellow-500 duration-300"
                                            />
                                        </Link>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                {admin.id !== loggedAdmin && (
                                                    <button type="button" title={`Delete ${admin.name}`}>
                                                        <Icon
                                                            iconNode={UserRoundX}
                                                            aria-label={`Delete ${admin.name}`}
                                                            className="size-6 text-red-600 cursor-pointer hover:text-red-500 duration-300"
                                                        />
                                                    </button>
                                                )}
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>
                                                    He is sure?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Once you confirm, you will not be able to reverse this action!
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <DeleteAdminUserButton userId={admin.id} />
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
