import { Background } from '../background/Background';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Nav } from './Nav';
import { Stats } from './Stats';
import { Testimonials } from './Testimonials';
import { WhyChooseUs } from './WhyChooseUs';

const Base = () => (
  <div className="antialiased text-gray-600 bg-slate-100">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Background image>
      <Nav />
      <Hero />
      <WhyChooseUs />
    </Background>
    <Testimonials />
    <Stats />
    <Footer />
  </div>
);

export { Base };
