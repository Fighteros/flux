import {z} from 'zod';


const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const singUpFormSchema = z.object({
    first_name: z.string({message: 'First name is required'})
        .min(5, 'First name should at least be 5 characters')
        .max(50, 'First name should not be more than 50 characters')
        .trim()
    ,
    last_name: z.string({message: 'Last name is required'})
        .min(5, 'Last name should at least be 5 characters')
        .max(50, 'Last name should not be more than 50 characters')
        .trim()
    ,
    email: z.string({message: 'Email is required'}).email().trim(),
    password: z.string({message: 'Password is required'})
        .min(8)
        .max(20)
        .regex(/[a-zA-z ]/, {message: 'Password must contain at least one letter or number.'})
        .regex(/[0-9]/, {message: 'Password must contain at least one letter or number.'})
        .trim()
    ,


    avatar: z
        .any()
        .refine(
            (files) =>
                files instanceof FileList
                    ? files.length === 0 || (files[0] && files[0].size <= MAX_FILE_SIZE)
                    : true,
            {
                message: `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
            }
        )
        .refine(
            (files) =>
                files instanceof FileList
                    ? files.length === 0 ||
                    ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)
                    : true,
            {
                message: `Only the following types are allowed: ${ACCEPTED_IMAGE_TYPES.join(", ")}`,
            }
        ),


    // avatar: z
    //     .any()
    //     .refine((files) => files instanceof FileList && files.length > 0, {
    //         message: "Please upload an avatar image",
    //     })
    //     .refine(
    //         (files) => files instanceof FileList && files[0]?.size <= MAX_FILE_SIZE,
    //         {
    //             message: `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    //         }
    //     )
    //     .refine(
    //         (files) =>
    //             files instanceof FileList &&
    //             ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
    //         {
    //             message: `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(", ")}`,
    //         }
    //     )
    //     .optional(),

    // avatar: z.any()
    //     .refine(
    //         (files) => files instanceof FileList && files.length > 0,
    //         {message: "Please upload an avatar"}
    //     )
    // avatar: z
    //     .instanceof(File)
    //     .refine(
    //         (file) => file.size <= MAX_FILE_SIZE,
    //         `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    //     )
    //     .refine(
    //         (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    //         `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
    //             ", "
    //         )}.`
    //     )
    //     .optional()
    //     .nullable()
})
