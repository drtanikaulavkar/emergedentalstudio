import Link from 'next/link';

import { Background } from '../background/Background';
import { FooterCopyright } from '../footer/FooterCopyright';
import { Section } from '../layout/Section';
import { Maps } from './Maps';

const Footer = () => (
  <Background image>
    <Section>
      <Maps />
      <div className="mt-8 text-sm text-center">
        <Link href="/credits" passHref>
          <a>Credits</a>
        </Link>

        <FooterCopyright />
      </div>
    </Section>
  </Background>
);

export { Footer };
