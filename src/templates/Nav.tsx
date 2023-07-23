import Link from 'next/link';

import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';
import { LogoV2 } from './LogoV2';

const pages: { name: string; link: string }[] = [
  { name: 'About', link: '/about' },
  { name: 'Services', link: '/#services' },
  { name: 'Gallery', link: '/gallery' },
  { name: 'Contact Us', link: '/#contact-us' },
];

const Nav = () => {
  return (
    <Section yPadding="pt-6">
      <Navbar logo={<LogoV2 xl />}>
        {pages.map((page: { name: string; link: string }) => (
          <li key={page.name} className="lg:px-4 hover:text-gray-900">
            <Link href={page.link}>
              <a>{page.name} </a>
            </Link>
          </li>
        ))}
      </Navbar>
    </Section>
  );
};

export { Nav };
