import { Suspense } from 'react';
import VerifyEmailClient from './verify-email-client';
import LoadingVerifyEmail from '@/components/loading-verify-email';

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<LoadingVerifyEmail />}>
            <VerifyEmailClient />
        </Suspense>
    );
}