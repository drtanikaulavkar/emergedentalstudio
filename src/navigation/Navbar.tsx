import { ReactNode, useState } from 'react';

import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';

type INavbarProps = {
  logo: ReactNode;
  children?: ReactNode;
};

export const Navbar = (props: INavbarProps) => {
  const [active, setActive] = useState(false);

  return (
    <>
      {/* Main navigation container */}
      <nav className="flex-no-wrap relative flex-col w-full justify-between p-2 rounded-lg lg:rounded-full bg-hero-0 ">
        <div className="flex w-full items-center justify-between gap-4">
          {/* Hamburger button for mobile view */}
          <div className="lg:hidden px-2 text-primary-400">
            <Hamburger toggled={active} toggle={setActive} />
          </div>
          {/* Logo */}
          <Link href="/" passHref>
            <a
              className="lg:ml-3" // margin for alight center due to two icon on right
            >
              {props.logo}
            </a>
          </Link>

          {/* Collapsible navigation container */}
          <div className="hidden flex-grow lg:block">
            {/* Navigation links */}
            <ul className="list-style-none flex justify-start text-gray-600  focus:text-gray-700">
              {props.children}
            </ul>
          </div>
          <div className="flex text-3xl items-center text-primary-400">
            {/* <a href="tel:+918296801240">
              <BsTelephone className="text-primary-500" />{' '}
            </a> */}
            <a
              target="_blank"
              href="https://wa.me/918296801240"
              rel="noopener noreferrer"
            >
              <BsWhatsapp className="mx-2" />
            </a>
            <button className="btn btn-primary rounded-full hidden lg:block">
              <a href="https://clinicia.com/calendar/book?u=tanishakaulavkar">
                Book Appointment
              </a>
            </button>
          </div>
        </div>
        <div
          // Dropdown div for mobile
          className={`${
            active ? '' : 'hidden'
          } px-2 text-xl flex w-full lg:hidden`}
        >
          {/* Navigation links */}
          <ul className="list-style-none mt-auto gap-2 pt-2 flex flex-col justify-end text-gray-600  focus:text-gray-700">
            {props.children}
            <li>
              <button className="btn btn-primary rounded-full normal-case text-xl">
                <a href="https://clinicia.com/calendar/book?u=tanishakaulavkar">
                  Book Appointment
                </a>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
