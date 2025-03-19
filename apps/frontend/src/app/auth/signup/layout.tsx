import {PropsWithChildren} from 'react'

type AuthProps = PropsWithChildren;

const AuthLayout = ({children}: AuthProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            {" "}
            {children}
        </div>
    );
}
export default AuthLayout;