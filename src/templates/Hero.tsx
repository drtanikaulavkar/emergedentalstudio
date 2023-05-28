import Link from 'next/link';

import { HeroV3 } from '../hero/HeroV3';
import { Section } from '../layout/Section';

const Hero = () => (
  <>
    {/* <Section yPadding="pt-6">
      <Nav2 /> todo: improve sm
    </Section> */}

    <Section yPadding="lg:pt-4">
      <HeroV3
        title={
          <span>
            {'We are excited to help you '}
            <span>{'\n'}</span>
            <span className="text-primary-500">achieve your teeth goals!</span>
          </span>
        }
        description="Let’s make dental health a priority."
        button={
          <Link href="/services" passHref>
            <button className="btn btn-primary normal-case rounded-full text-xl">
              Go To Services
            </button>
          </Link>
        }
      />
    </Section>
  </>
);

export { Hero };
