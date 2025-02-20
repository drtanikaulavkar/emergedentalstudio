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
      <div className="h-screen flex flex-col">
        <Nav />
        <div className="flex-grow max-h-screen">
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
