'use client';

import { authFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createAccount, signInUser } from '@/lib/actions/user.actions';
import OTPModal from './OTPModal';

const AuthForm = ({ type }: { type: AuthFormProps }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [accountId, setAccountId] = useState(null);

	const formSchema = authFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			fullName: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		setErrorMessage('');

		try {
			const user =
				type === 'sign-up'
					? await createAccount({
							fullName: values.fullName || '',
							email: values.email,
					  })
					: await signInUser({ email: values.email });

			setAccountId(user.accountId);
		} catch (error) {
			setErrorMessage('Failed to create an account. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5 auth-form'
				>
					<h1 className='form-title'>
						{type === 'sign-in' ? 'Sign In' : 'Sign Up'}
					</h1>
					{type === 'sign-up' && (
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<div className='shad-form-item'>
										<FormLabel className='shad-form-label'>Full Name</FormLabel>
										<FormControl>
											<Input
												className='shad-input'
												placeholder='Enter your name'
												{...field}
											/>
										</FormControl>
									</div>

									<FormMessage className='shad-form-message' />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<div className='shad-form-item'>
									<FormLabel className='shad-form-label'>Email</FormLabel>
									<FormControl>
										<Input
											className='shad-input'
											placeholder='Enter your email'
											{...field}
										/>
									</FormControl>
								</div>

								<FormMessage className='shad-form-message' />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='form-submit-button'
						disabled={isLoading}
					>
						{type === 'sign-in' ? 'Sign In' : 'Sign Up'}
						{isLoading && (
							<Image
								src='/icons/loader.svg'
								width={20}
								height={20}
								alt='loader'
								className='animate-spin ml-2'
							/>
						)}
					</Button>
					{errorMessage && <p className='error-message'>*{errorMessage}</p>}
					<div className='body-2 flex justify-center'>
						<p className='text-light-100'>
							{type === 'sign-in'
								? `Don't have an account?`
								: `Already have an account?`}
						</p>
						<Link
							href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
							className='font-medium text-brand ml-2'
						>
							{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
						</Link>
					</div>
				</form>
			</Form>

			{/* OTP verification */}
			{accountId && (
				<OTPModal accountId={accountId} email={form.getValues('email')} />
			)}
		</>
	);
};

export default AuthForm;
