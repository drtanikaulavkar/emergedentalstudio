import { ReactNode, useState } from 'react';

import Link from 'next/link';
import { BsWhatsapp, BsTelephone } from 'react-icons/bs';

type INavbarProps = {
  logo: ReactNode;
  children?: ReactNode;
};

export const Navbar = (props: INavbarProps) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      {/* Main navigation container */}
      <nav
        className="flex-no-wrap relative flex w-full items-center justify-between py-4 lg:flex-wrap lg:justify-start"
        data-te-navbar-ref=""
      >
        <div className="flex w-full flex-wrap items-center justify-between ">
          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 bg-transparent px-2.5 py-2 text-primary-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
            type="button"
            onClick={handleClick}
          >
            {/* Hamburger icon */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {/* Collapsible navigation container */}
          <div
            className={`${
              active ? '' : 'hidden'
            }   flex-grow basis-[100%] items-center lg:!flex lg:basis-auto`}
          >
            {/* Logo */}
            <Link href="/">{props.logo}</Link>
            {/* Left navigation links */}
            <ul
              className="list-style-none ml-auto mt-1 flex flex-col pl-0 text-xl lg:flex-row text-gray-600  focus:text-gray-700 lg:px-2"
              data-te-navbar-nav-ref=""
            >
              {props.children}
              {/* Dashboard link */}
              <li
                className="lg:pr-2 hover:text-gray-900"
                data-te-nav-item-ref=""
              >
                <a href="#" data-te-nav-link-ref="">
                  Dashboard
                </a>
              </li>
              {/* Team link */}
              <li
                className="lg:pr-2 hover:text-gray-900"
                data-te-nav-item-ref=""
              >
                <a href="#" data-te-nav-link-ref="">
                  Team
                </a>
              </li>
              {/* Projects link */}
              <li
                className="lg:pr-2 hover:text-gray-900"
                data-te-nav-item-ref=""
              >
                <a href="#" data-te-nav-link-ref="">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Right elements */}
          <div className="relative flex items-center gap-2">
            <Link href="tel:+918296801240" passHref>
              <BsTelephone className="text-primary-500" />
            </Link>

            <Link href="https://wa.me/918296801240" passHref>
              <BsWhatsapp className="text-primary-500" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
