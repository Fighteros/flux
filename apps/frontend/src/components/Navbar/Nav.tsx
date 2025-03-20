import Link from "next/link";

type Props = {};

const Nav = (props: Props) => (
    <>

        <div className="ml-10 px-6  transition-all duration-300 ease-in-out
                        rounded-4xl shadow-[0_20px_30px_-6px_rgba(238,103,97,0.5)]
                       outline-none cursor-pointer border-none hover:translate-y-[3px]
                        hover:shadow-none active:opacity-50">
            <Link href="/">
                <img className="size-24" src="/logo.svg" alt="logo"/>
            </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-2 ml-auto
        [&>a]:transition-all duration-300 ease-in-out
        rounded-4xl shadow-[0_20px_30px_-6px_rgba(238,103,97,0.5)]
        [&>a]:py-2 [&>a]:px-4
         [&>a]:transition
         [&>a]:rounded-md
          [&>a:hover]:text-fuchsia-100
           [&>a:hover]:bg-violet-500 "
        >
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