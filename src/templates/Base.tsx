import { Background } from '../background/Background';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Stats } from './Stats';
import { Testimonials } from './Testimonials';
import { WhyChooseUs } from './WhyChooseUs';

const Base = () => (
  <div className="antialiased text-gray-600">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Background image>
      {/* <Background color="bg-gradient-to-b from-blue-200 to-blue-300"> */}
      <Hero />
      <Stats />
    </Background>
    <WhyChooseUs />
    {/* <Background color="bg-gradient-to-b from-blue-200 to-blue-300"> */}
    {/* </Background> */}
    {/* <VerticalFeatures /> */}
    <Testimonials />
    <Footer />
  </div>
);

export { Base };
