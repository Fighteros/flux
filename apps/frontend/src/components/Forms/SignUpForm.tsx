'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {SubmitHandler, useForm} from "react-hook-form"
import {signUpFormSchema, singUpFormSchema} from "@/lib/utils/valdidation/form";
import {z} from "zod"


const SignUpForm = () => {
    const form = useForm<z.infer<typeof singUpFormSchema>>({
        resolver: zodResolver(singUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onsubmitForm: SubmitHandler<signUpFormSchema> = async (data) => {

        console.log(data);
        // save data
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onsubmitForm)}>

        </form>
    );
}
export default SignUpForm;