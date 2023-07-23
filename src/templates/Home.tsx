import { Background } from '../background/Background';
import { Base } from './Base';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Nav } from './Nav';
import { Services } from './Services';
import { Stats } from './Stats';
import { Testimonials } from './Testimonials';
import { WhyChooseUs } from './WhyChooseUs';

const Home = () => (
  <Base>
    <Background image>
      <Nav />
      <Hero />
      <WhyChooseUs />
    </Background>
    <Services />
    <Testimonials />
    <Stats />
    <Footer />
  </Base>
);

export { Home };
