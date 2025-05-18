'use client';

import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { User } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, user }: PropsWithChildren<{ user: User }>) {
    return (
        <AppShell>
            <AppHeader user={user} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
