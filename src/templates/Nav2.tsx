import { useState } from 'react';

import Link from 'next/link';
import { BsTelephone } from 'react-icons/bs';

import { LogoV2 } from './LogoV2';

// TODO:
// Improve look good on sm, menu doesn't collapse into dropdown

const Nav2 = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="navbar bg-primary-0 rounded-lg">
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
      <div className="flex-1">
        <Link href="/" passHref>
          <a className="btn btn-ghost normal-case">
            <LogoV2 xl />
          </a>
        </Link>
      </div>
      <div className={`flex-none ${active ? 'hidden' : 'hidden'} lg:block`}>
        <ul className="menu lg:menu-horizontal px-1">
          <li>
            <a>About</a>
          </li>
          <li tabIndex={0}>
            <a>
              Services
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-primary-0">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Gallery</a>
          </li>
          <li>
            <a>Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="px-2">
        <a href="tel:+918296801240">
          <BsTelephone className="text-primary-500 text-2xl" />{' '}
        </a>
      </div>
    </div>
  );
};

export { Nav2 };
