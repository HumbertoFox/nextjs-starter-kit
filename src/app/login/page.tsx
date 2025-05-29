import { Suspense } from 'react';
import LoginClient from './login-client';
import LoadingLoginSimple from '@/components/loading-login-simple';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();
    if (session?.user) redirect('/dashboard');
    return (
        <Suspense fallback={<LoadingLoginSimple />}>
            <LoginClient />
        </Suspense>
    );
}