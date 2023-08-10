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
      <Nav />
      <Hero />
      <div className="hidden md:lg:block">
        <WhyChooseUs />
      </div>
    </Background>
    <Services len={4} />
    <Stats />
    <Background image>
      <Team />
      <div className="block md:lg:hidden">
        <WhyChooseUs />
      </div>
    </Background>
    <Testimonials />
    <Background image>
      <Footer />
    </Background>
  </Base>
);

export { Home };
