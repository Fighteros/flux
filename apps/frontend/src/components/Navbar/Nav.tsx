import Link from "next/link";

type Props = {};

const Nav = (props: Props) => (
    <>

        <div>
            <Link href="/">
                    <img className="size-24" src="/logo.svg" alt="logo"/>
            </Link>
        </div>
        <div className="flex gap-2 ml-auto ">
            <Link className="" href="/">
                Blog
            </Link>

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