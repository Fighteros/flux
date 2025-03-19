import {singUpFormSchema} from "@/lib/utils/valdidation/form";
import {z} from "zod";

export type signUpFormSchemaType = z.infer<typeof singUpFormSchema>;

