'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPen, UserX } from 'lucide-react';
import Link from 'next/link';
import { DeleteAdminUserButton } from '../delete-admin-user-button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Users {
    id: string;
    name: string | null;
    email: string | null;
}

interface UsersClientProps {
    users: Users[];
    currentPage: number;
    totalPages: number;
}

function getVisiblePages(current: number, total: number): (number | string)[] {
    const delta = 2;
    const range: (number | string)[] = [];

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    range.push(1);

    if (start > 2) {
        range.push('...');
    }

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    if (end < total - 1) {
        range.push('...');
    }

    if (total > 1) {
        range.push(total);
    }

    return range;
}

export default function UsersClient({ users, currentPage, totalPages }: UsersClientProps) {
    return (
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
                            <TableHead className="max-md:hidden text-center">ID</TableHead>
                            <TableHead className="max-md:hidden text-center">Name</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 && (
                            <TableRow className="text-red-600 cursor-default">
                                <TableCell colSpan={5}>There is no registered user</TableCell>
                            </TableRow>
                        )}
                        {users.map((user, index) => (
                            <TableRow key={user.id} className="cursor-default">
                                <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                                <TableCell className="max-md:hidden">{user.id}</TableCell>
                                <TableCell className="max-md:hidden">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="flex justify-evenly items-center my-1">
                                    <Link
                                        href={`/dashboard/admins/${user.id}/edit`}
                                        title={`Edit ${user.name}`}
                                    >
                                        <Icon
                                            iconNode={UserPen}
                                            aria-label={`Edit ${user.name}`}
                                            className="size-6 text-yellow-600 hover:text-yellow-500 duration-300"
                                        />
                                    </Link>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                title={`Exculir ${user.name}`}
                                            >
                                                <Icon
                                                    iconNode={UserX}
                                                    aria-label={`Excluir ${user.name}`}
                                                    className="size-6 text-red-600 cursor-pointer hover:text-red-500 duration-300"
                                                />
                                            </button>
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
                                                <DeleteAdminUserButton userId={user.id} />
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
                            aria-disabled={currentPage <= 1}
                            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                    {getVisiblePages(currentPage, totalPages).map((page, index) => (
                        <PaginationItem key={index}>
                            {page === '...' ? (
                                <PaginationLink
                                    href="#"
                                    aria-disabled
                                    className="pointer-events-none opacity-50"
                                >
                                    ...
                                </PaginationLink>
                            ) : (
                                <PaginationLink
                                    href={`?page=${page}`}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
                            aria-disabled={currentPage >= totalPages}
                            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
}
