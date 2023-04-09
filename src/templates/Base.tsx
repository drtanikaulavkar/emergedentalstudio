import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Stats } from './Stats';
import { VerticalFeatures } from './VerticalFeatures';
import { WhyChooseUs } from './WhyChooseUs';

const Base = () => (
  <div className="antialiased text-gray-600">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <WhyChooseUs />
    <Stats />
    <VerticalFeatures />
    <Section title="Testimonials" description="Contact Us">
      <a>TODO</a>
    </Section>
    <Banner />
    <Footer />
  </div>
);

export { Base };
