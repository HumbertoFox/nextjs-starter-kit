'use client';

import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { User } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, user }: PropsWithChildren<{ user: User }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar user={user} />
            <AppContent variant="sidebar">
                <AppSidebarHeader />
                {children}
            </AppContent>
        </AppShell>
    );
}
