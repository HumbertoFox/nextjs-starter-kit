'use client';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import SettingsLayout from '@/components/layouts/settings/app-layout';
import { useBreadcrumbs } from '@/context/breadcrumb-context';
import { useEffect } from 'react';

export default function Appearance() {
    const { setBreadcrumbs } = useBreadcrumbs();
    useEffect(() => {
        setBreadcrumbs([
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Appearance settings', href: '/dashboard/settings/appearance' }
        ]);
    }, [setBreadcrumbs]);
    return (
        <SettingsLayout>
            <div className="space-y-6">
                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    );
}