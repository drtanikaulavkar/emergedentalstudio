import Link from 'next/link';

import { Navbar } from '../navigation/Navbar';
import { LogoV2 } from './LogoV2';

const pages: { name: string; link: string }[] = [
  { name: 'About', link: '/' },
  { name: 'Services', link: '/' },
  { name: 'Gallery', link: '/' },
  { name: 'Contact Us', link: '/' },
];

const Nav = () => {
  return (
    <Navbar logo={<LogoV2 xl />}>
      {pages.map((page: { name: string; link: string }) => (
        <li key={page.name} className="lg:px-4 hover:text-gray-900">
          <Link href={page.link}>
            <a>{page.name} </a>
          </Link>
        </li>
      ))}
    </Navbar>
  );
};

export { Nav };
