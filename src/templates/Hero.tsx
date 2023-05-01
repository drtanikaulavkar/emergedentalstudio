import { HeroV3 } from '../hero/HeroV3';
import { Section } from '../layout/Section';
import { Nav } from './Nav';

const Hero = () => (
  <>
    <Section yPadding="pt-6">
      <Nav />
    </Section>

    {/* <Section yPadding="pt-6">
      <Nav2 /> todo: improve sm
    </Section> */}

    <Section yPadding="pt-16">
      <HeroV3
        title={
          <span>
            {'We are excited to help you '}
            <span>{'\n'}</span>
            <span className="lg:text-primary-500">
              achieve your teeth goals!
            </span>
          </span>
        }
        description="Let’s make dental health a priority."
        button={
          // can use iframe here, with modal
          <a href="https://clinicia.com/calendar/book?u=tanishakaulavkar">
            {/* <Button xl>Book an appointment</Button> */}
            <button className="btn btn-primary bg-primary-900 normal-case text-xl">
              Book an appointment
            </button>
          </a>
        }
      />
    </Section>
  </>
);

// <Section yPadding="py-8">
//       <HeroV2
//         title={
//           <>
//             {'We are excited to help you\n'}
//             <span className="text-primary-500">achieve your teeth goals!</span>
//           </>
//         }
//         description="Let’s make dental health a priority."
//         button={
//           <Link href="https://clinicia.com/calendar/book?u=tanishakaulavkar">
//             <a>
//               <Button xl>Book an appointment</Button>
//             </a>
//           </Link>
//         }
//       />
//     </Section>
export { Hero };
