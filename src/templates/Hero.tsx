import Link from 'next/link';
import { FaArrowCircleRight } from 'react-icons/fa';

import { HeroV3 } from '../hero/HeroV3';

const Hero = () => (
  <>
    <HeroV3
      title="We are excited to help you"
      title2="achieve your teeth goals."
      description="Let’s make dental health a priority."
      button={
        <Link
          href="https://clinicia.com/calendar/book?u=tanishakaulavkar"
          passHref
        >
          <button className="btn btn-primary normal-case text-2xl">
            Book Appointment Now <FaArrowCircleRight className="ml-2" />
          </button>
        </Link>
      }
    />
  </>
);

export { Hero };
