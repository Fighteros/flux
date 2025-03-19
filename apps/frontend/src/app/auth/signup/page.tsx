import Link from 'next/link'
import SignUpForm from "@/components/Forms/SignUpForm";

const SignUp = () => {

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col  justify-center items-center">
            <h2 className="text-center text-2xl font-bold mb-4">
                Signup
            </h2>
            {/*  sign up form  */}
            <div>
                <p>Already have an account?</p>
                <Link href={'/auth/signin'}>
                    Sign In
                </Link>
            </div>
            <SignUpForm />
        </div>

    );
}
export default SignUp;