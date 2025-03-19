import Link from "next/link";

type Props = {};

const Nav = (props: Props) => (
    <>

        <div className="pl-10">
            <Link href="/">
                    <img className="size-24" src="/logo.svg" alt="logo"/>
            </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-fuchsia-100 [&>a:hover]:bg-violet-500 ">
            {/*<Link className="" href="/">*/}
            {/*    Blog*/}
            {/*</Link>*/}

            <Link className="" href="#about">
                About
            </Link>

            <Link className="" href="#contact">
            Contact
        </Link>
        </div>
    </>
);

export default Nav;