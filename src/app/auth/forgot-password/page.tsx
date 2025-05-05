'use client';

import { LoaderCircle } from 'lucide-react';
import { startTransition, useActionState, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layouts/auth-layout';
import { forgotPassword } from '@/app/api/auth/forgotpassword';

export default function ForgotPassword() {
    const [state, action, pending] = useActionState(forgotPassword, undefined);
    const [data, setData] = useState<Required<{ email: string }>>({ email: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        startTransition(() => action(formData));
    };
    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            {state?.message && <div className="mb-4 text-center text-sm font-medium text-green-400">{state.message}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={handleChange}
                            placeholder="email@example.com"
                        />
                        <InputError message={state?.errors?.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={pending}>
                            {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Or, return to</span>
                    <TextLink href="/login">log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
