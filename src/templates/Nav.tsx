import { Navbar } from '../navigation/Navbar';
import { Logo } from './Logo';

const pages: { name: string; link: string }[] = [
  { name: 'About', link: '/' },
  { name: 'Services', link: '/' },
  { name: 'Gallery', link: '/' },
  { name: 'Contact Us', link: '/' },
];

const Nav = () => {
  return (
    <Navbar logo={<Logo xl />}>
      {pages.map((page: { name: string; link: string }) => (
        <li key={page.name} className="lg:pr-2 hover:text-gray-900">
          <a href={page.link}>{page.name} </a>
        </li>
      ))}
    </Navbar>
  );
};

export { Nav };
