import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="We are excited to help you achieve your teeth goals!"
      subtitle="Let’s make dental health a priority."
      button={
        <Link href="https://creativedesignsguru.com/category/nextjs/">
          <a>
            <Button>Book an appointment</Button>
          </a>
        </Link>
      }
    />
  </Section>
);

export { Banner };
