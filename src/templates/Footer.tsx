import { FooterCopyright } from '../footer/FooterCopyright';
import { Section } from '../layout/Section';
import { Maps } from './Maps';

const Footer = () => (
  <Section title="Contact Us">
    <Maps />
    <div className="mt-8 text-sm text-center">
      <FooterCopyright />
    </div>
  </Section>
);

export { Footer };
