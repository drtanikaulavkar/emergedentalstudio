import { Section } from '../layout/Section';
import { OneService } from './OneService';

const services: { title: string; summary: string; keywords?: string[] }[] = [
  {
    title: 'Dental Implants',
    summary:
      'Dental implants are artificial tooth roots that are used to replace missing teeth.',
    keywords: ['crown', 'bridge'],
  },
  {
    title: 'Cosmetic Dentistry',
    summary:
      'Cosmetic dentistry refers to a range of dental procedures that are performed to improve the appearance of teeth, gums, and bite.',
    keywords: [],
  },
  {
    title: 'Braces & Aligners',
    summary:
      'Braces and aligners are orthodontic treatments that are used to straighten teeth, correct bite issues, and improve the overall alignment of teeth and jaws.',
    keywords: ['invisalign'],
  },
  {
    title: 'Pediatric Dentistry',
    summary:
      'Pediatric dentistry is a specialized field of dentistry that focuses on the oral health of children, from infancy through adolescence.',
    keywords: [],
  },
  {
    title: 'Root Canal',
    summary:
      'A root canal treatment, also known as endodontic therapy, is a dental procedure that is performed to save a damaged or infected tooth.',
    keywords: [],
  },
  {
    title: 'Dentures',
    summary:
      'Dentures are removable prosthetic devices that are used to replace missing teeth and surrounding tissues.',
    keywords: [],
  },
  {
    title: 'Full Mouth Rehabilitations',
    summary:
      'Full mouth rehabilitation is a comprehensive dental treatment plan that is used to restore the health, function, and appearance of the entire mouth.',
    keywords: [],
  },
  {
    title: 'Extractions & Impactions',
    summary:
      'Tooth extraction is the process of removing a tooth from the mouth.',
    keywords: ['wisdom tooth'],
  },
  {
    title: 'Teeth Cleaning and Whitening',
    summary:
      'Teeth cleaning is a routine dental procedure that involves the removal of plaque, tartar, and stains from the teeth.',
    keywords: ['scaling'],
  },
];
const ImplantPhoto = '/assets/services/implant/implant1.jpg';

const Carousel = (props: { len: number }) => (
  <>
    {services.slice(0, props.len).map((item) => (
      <div className="carousel-item basis-1/4" key={item.title}>
        <OneService
          title={item.title}
          summary={item.summary}
          keywords={item.keywords}
          photo={ImplantPhoto}
        />
      </div>
    ))}
    <div className="carousel-item basis-1/4">
      <OneService
        title="More Services"
        summary=""
        keywords={[
          'scaling',
          'extraction',
          'wisdom teeth',
          'mouth rehabilitation',
          'dentures',
          'root canal',
        ]}
      />
    </div>
  </>
);

const Services = () => (
  <div id="services">
    <Section title="Our Services">
      <div className="grid-cols-4 hidden md:lg:flex w-full">
        <Carousel len={3} />
      </div>
      <div className="md:lg:hidden carousel carousel-vertical w-full">
        <Carousel len={2} />
      </div>
    </Section>
  </div>
);

export { Services };
