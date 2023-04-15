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
      <nav className="flex-no-wrap relative flex-col w-full justify-between p-4 rounded-lg bg-primary-0">
        <div className="flex w-full items-center justify-between gap-4">
          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 text-primary-500 focus:no-underline focus:outline-none focus:ring-0 lg:hidden"
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
          {/* Logo */}
          <Link href="/" passHref>
            <a
              className="lg:ml-0 ml-4" // margin for alight center due to two icon on right
            >
              {props.logo}
            </a>
          </Link>

          {/* Collapsible navigation container */}
          <div className="hidden flex-grow lg:block">
            {/* Navigation links */}
            <ul className="list-style-none flex justify-end text-gray-600  focus:text-gray-700">
              {props.children}
            </ul>
          </div>
          <div className="flex text-2xl items-center gap-4">
            <a href="tel:+918296801240">
              <BsTelephone className="text-primary-500" />{' '}
            </a>
            <a
              target="_blank"
              href="https://wa.me/918296801240"
              rel="noopener noreferrer"
            >
              <BsWhatsapp className="text-primary-500" />
            </a>
          </div>
        </div>
        <div
          // Dropdown div for mobile
          className={`${active ? '' : 'hidden'} px-2 flex w-full lg:hidden`}
        >
          {/* Navigation links */}
          <ul className="list-style-none mt-auto gap-2 pt-2 flex flex-col justify-end text-gray-600  focus:text-gray-700">
            {props.children}
          </ul>
        </div>
      </nav>
    </>
  );
};
