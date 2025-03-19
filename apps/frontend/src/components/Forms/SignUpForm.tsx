'use client';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {singUpFormSchema} from "@/lib/utils/valdidation/form";
import api from "@/api/axios";
import SubmitButton from "@/components/Buttons/SubmitButton";
import {signUpFormSchemaType} from "@/lib/types/formTypes";
import {singUp} from "@/api/auth/singUp";
import {useRouter} from "next/navigation";
import {toast} from 'sonner';

const SignUpForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<signUpFormSchemaType>({
        resolver: zodResolver(singUpFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            avatar: undefined
        },
    });

    const uploadAvatar = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload/image', formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        return response.data.secure_url;
    };

    const onSubmit = async (data: signUpFormSchemaType) => {
        try {
            let getFileUrl = '';
            // const avatarFile = data.avatar[0];
            // if (avatarFile) {
            //     getFileUrl = await uploadAvatar(avatarFile);
            // }

            const payload = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                avatar: getFileUrl !== '' ? getFileUrl : '',
            };

            // send payload to backend
            const res = await singUp(payload)
            console.log(res);
            if (res.status === 201) {
                toast.success('Sign up successful');
                router.push('/auth/signin')
            } else if ('message' in res) {
                toast.error(res.message);
            }
        } catch (e) {
            console.log(e);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {errors.root?.message && <p className="text-red-500">{errors.root.message}</p>}
            <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" {...register("first_name")} />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>

            <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" {...register("last_name")} />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
                <Label htmlFor="avatar">Avatar</Label>
                <Input id="avatar" type="file" {...register("avatar")} />
                {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message as React.ReactNode}</p>}
            </div>

            {/*<button*/}
            {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"*/}
            {/*    type="submit">Sign up*/}
            {/*</button>*/}
            <SubmitButton pending={isSubmitting}>Sign Up</SubmitButton>
        </form>
    );
};

export default SignUpForm;
