import Image from 'next/image';
import Link from 'next/link';
import { FaArrowCircleRight } from 'react-icons/fa';

import heroImg from '../../public/assets/images/hero.png';
import { HeroV3 } from '../hero/HeroV3';

const Hero = () => (
  <HeroV3
    title="Best Dentist Near Me in Bengaluru"
    title2="Trusted Dental Care at Emerge Dental Studio"
    description="Let’s make dental health a priority."
    img={<Image src={heroImg} alt="dentist w patient" />}
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
);

export { Hero };
