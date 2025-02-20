import { Background } from '../background/Background';
import { Base } from './Base';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Nav } from './Nav';
import { Services } from './Services';
import { Stats } from './Stats';
import { Team } from './Team';
import { Testimonials } from './Testimonials';
import { WhyChooseUs } from './WhyChooseUs';

const Home = () => (
  <Base>
    <Background image>
      <div className="h-screen flex flex-col justify-center">
        <Nav />
        <div className="max-h-screen m-auto">
          {/* TODO: m-auto squeezes content to center - does not look good on mobile. try to justify-between/around */}
          <Hero />
        </div>
        <div className="hidden lg:block">
          <WhyChooseUs />
        </div>
      </div>
    </Background>
    <Services len={4} />
    <Stats />
    <Background image>
      <div className="pt-4 block lg:hidden">
        <WhyChooseUs />
      </div>
      <Team />
    </Background>
    <Testimonials />
    <Background image>
      <Footer />
    </Background>
  </Base>
);

export { Home };
