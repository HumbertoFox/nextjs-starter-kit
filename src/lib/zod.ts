import { object, string, z } from 'zod';

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters")
})

export const signUpSchema = object({
    name: string()
        .min(1, 'Name is required'),
    email: string()
        .email('Invalid email address'),
    password: string()
        .min(8, 'Password must be at least 8 characters long'),
    role: z.enum(['USER', 'ADMIN'], {
        errorMap: () => ({ message: 'Role must be either USER or ADMIN' }),
    }),
    password_confirmation: string()
        .min(1, 'Please confirm your password')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation']
    });

export const updateUserSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    name: string()
        .min(1, 'Name is required')
})

export const deleteUserSchema = object({
    password: string()
        .min(8, 'Password must be at least 8 characters long')
})

export const passwordUpdateSchema = object({
    current_password: string()
        .min(8, 'Password must be at least 8 characters long'),
    password: string()
        .min(8, 'Password must be at least 8 characters long'),
    password_confirmation: string()
        .min(1, 'Please confirm your password')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation']
    });

export const passwordResetSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    token: string({ required_error: "Token is required" })
        .min(1, "Token is required"),
    password: string()
        .min(8, 'Password must be at least 8 characters long'),
    password_confirmation: string()
        .min(1, 'Please confirm your password')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation']
    });

export const passwordForgotSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
});

export type FormStateRegisterUser =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            password?: string[];
            role?: string[];
            password_confirmation?: string[];
        }
        message?: string;
        info?: string;
    } | undefined;

export type FormStateLoginUser =
    | {
        errors?: {
            email?: string[];
            password?: string[];
        }
        message?: string;
        info?: string;
    } | undefined;

export type FormStateUserDelete =
    | {
        errors?: {
            password?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStateRegisterAdminUser =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            password?: string[];
            role?: string[];
            password_confirmation?: string[];
        }
        message?: string;
        info?: string;
    } | undefined;

export type FormStatePasswordUpdate =
    | {
        errors?: {
            current_password?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStateUserUpdate =
    | {
        errors?: {
            name?: string[];
            email?: string[];
        };
        message?: string;
        success?: boolean;
    } | undefined;

export type FormStatePasswordForgot =
    | {
        errors?: {
            email?: string[];
        }
        message?: string;
    } | undefined;

export type FormStatePasswordReset =
    | {
        errors?: {
            email?: string[];
            token?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: string;
        info?: string;
    } | undefined;