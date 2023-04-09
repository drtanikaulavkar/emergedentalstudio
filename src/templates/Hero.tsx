import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroV3 } from '../hero/HeroV3';
import { Section } from '../layout/Section';
import { Nav } from './Nav';

const Hero = () => (
  <Background color="bg-hero-1 bg-gradient-to-br from-blue-200 to-blue-300">
    <Section yPadding="pt-6">
      <Nav />
    </Section>

    <Section>
      <HeroV3
        title={
          <span>
            {'We are excited to help you '}
            <span className="lg:text-primary-500">
              achieve your teeth goals!
            </span>
          </span>
        }
        description="Let’s make dental health a priority."
        button={
          <a href="https://clinicia.com/calendar/book?u=tanishakaulavkar">
            <Button xl>Book an appointment</Button>
          </a>
        }
      />
    </Section>
  </Background>
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
