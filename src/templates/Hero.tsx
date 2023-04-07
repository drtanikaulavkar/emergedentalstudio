import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <Navbar logo={<Logo xl />} />
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
              <Button xl>Book an appointment</Button>
            </a>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
