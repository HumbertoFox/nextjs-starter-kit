'use client';

import LoadingLoginSplit from '@/components/loading-login-split';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Logout() {
    useEffect(() => {
        signOut({ callbackUrl: '/login' });
    }, []);
    return (
        <LoadingLoginSplit />
    );
}