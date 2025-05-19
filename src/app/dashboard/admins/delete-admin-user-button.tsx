'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { deleteAdminUserById } from '@/app/api/actions/deleteadminuser';
import { DialogClose } from '@/components/ui/dialog';

export function DeleteAdminUserButton({ userId }: { userId: string }) {
    const [isPending, startTransition] = useTransition();
    return (
        <form
            action={async (formData) => {
                startTransition(() => {
                    deleteAdminUserById(formData);
                });
            }}
        >
            <input type="hidden" name="userId" value={userId} />
            <DialogClose asChild>
                <Button type="submit" variant="destructive" disabled={isPending}>
                    {isPending ? 'Deleting...' : 'Yes, Delete!'}
                </Button>
            </DialogClose>
        </form>
    );
}