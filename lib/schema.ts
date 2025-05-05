import { z } from 'zod';

export const authFormSchema = (type: AuthFormProps) => {
	return z.object({
		email: z.string().email({
			message: 'Please enter a valid email address.',
		}),
		fullName:
			type === 'sign-up'
				? z
						.string()
						.min(2, {
							message: 'Name must be at least 2 characters.',
						})
						.max(50, {
							message: '',
						})
				: z.string().optional(),
	});
};
