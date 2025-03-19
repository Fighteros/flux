import {z} from 'zod';


const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const singUpFormSchema = z.object({
    first_name: z.string({message: 'First name is required'})
        .min(5, 'First name should at least be 5 characters')
        .max(50, 'First name should not be more than 50 characters')
        .optional()
        .nullable()
    ,
    last_name: z.string({message: 'Last name is required'})
        .min(5, 'Last name should at least be 5 characters')
        .max(50, 'Last name should not be more than 50 characters')
        .optional()
        .nullable()
    ,
    email: z.string({message: 'Email is required'}).email(),
    password: z.string({message: 'Password is required'}).min(8).max(20),

    avatar: z
        .instanceof(File)
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
        )
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
                ", "
            )}.`
        )
        .optional()
        .nullable(),
})
export type signUpFormSchema = z.infer<typeof singUpFormSchema>;