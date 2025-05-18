'use server';

import { sendEmailVerification } from '@/lib/mail';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

type FormStateEmailVerification = {
    error?: string;
    ststus?: string;
    success?: string;
}

export async function handleEmailVerification(state: FormStateEmailVerification | undefined, formData: FormData) {
    const email = formData.get('email') as string;
    const token = formData.get('token') as string;

    if (!email && !token) {
        return { error: 'Not authenticated' };
    }

    const isCheckedEmail = await prisma.user.findUnique({ where: { email } });
    
    if (isCheckedEmail?.emailVerified) {
        return { error: 'email already verified!' };
    }

    const tokenExisting = await prisma.verificationToken.findFirst({ where: { identifier: email } });

    if (tokenExisting && new Date() > tokenExisting.expires) {
        await prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token: tokenExisting.token } } });

        const token = crypto.randomBytes(32).toString('hex');

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await prisma.verificationToken.create({ data: { identifier: email, token, expires } });

        const verifyLink = `${process.env.AUTH_URL}/auth/verify-email?token=${token}&email=${email}`;

        await sendEmailVerification(email, verifyLink);

        return { status: 'verification-link-sent' };
    }

    await prisma.user.update({
        where: { email },
        data: { emailVerified: new Date() }
    });

    await prisma.verificationToken.deleteMany({ where: { identifier: email } });

    return { success: 'email verified successfully!' };
}