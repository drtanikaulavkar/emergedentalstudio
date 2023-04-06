import Link from 'next/link';
import { BsWhatsapp, BsTelephone } from 'react-icons/bs';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="tel:+918296801240" passHref>
            <BsTelephone className="text-primary-500" />
          </Link>
        </li>
        <li>
          <Link href="https://wa.me/918296801240" passHref>
            <BsWhatsapp className="text-primary-500" />
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section>
      <HeroOneButton
        title={
          <>
            {'We are excited to help you\n'}
            <span className="text-primary-500">achieve your teeth goals!</span>
          </>
        }
        description="Let’s make dental health a priority."
        button={
          <Link href="https://clinicia.com/calendar/book?u=tanishakaulavkar">
            <a>
              <Button xl>Book an appointment today</Button>
            </a>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
