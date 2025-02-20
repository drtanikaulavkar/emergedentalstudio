import { Section } from '../layout/Section';
import { OneService } from './OneService';

const services: {
  title: string;
  summary: string;
  image?: string;
  keywords?: string[];
}[] = [
  {
    title: 'Dental Implants',
    summary:
      'Dental implants are artificial tooth roots that are used to replace missing teeth.',
    image: '/assets/services/1Implants.png',
    keywords: ['crown', 'bridge'],
  },
  {
    title: 'Braces & Aligners',
    summary:
      'Braces and aligners are orthodontic treatments that are used to straighten teeth, correct bite issues, and improve the overall alignment of teeth and jaws.',
    image: '/assets/services/3Aligners.png',
    keywords: ['invisalign'],
  },
  {
    title: 'Dentures',
    summary:
      'Dentures are removable prosthetic devices that are used to replace missing teeth and surrounding tissues.',
    image: '/assets/services/4Dentures.png',
    keywords: [],
  },
  {
    title: 'Cosmetic Dentistry',
    summary:
      'Cosmetic dentistry refers to a range of dental procedures that are performed to improve the appearance of teeth, gums, and bite.',
    image: '/assets/services/2Cosmetic.png',
    keywords: [],
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

const Carousel = (props: { len: number; hideMore: boolean }) => (
  <>
    {services.slice(0, props.len).map((item) => (
      <div className="flex" key={item.title}>
        <OneService
          title={item.title}
          summary={item.summary}
          keywords={item.keywords}
          photo={item.image}
          // mdLgWidth={props.hideMore ? 'w-72' : 'w-screen'}
        />
      </div>
    ))}
    {!props.hideMore && (
      <div className="my-auto">
        <OneService
          title="More Services"
          titleCenter
          summary=""
          keywords={[
            'scaling',
            'pediatric',
            'root canal',
            'extraction',
            'wisdom teeth',
            'mouth rehabilitation',
          ]}
        />
      </div>
    )}
  </>
);

const Services = (props: { len?: number; hideMore?: boolean }) => (
  <div id="services">
    <Section
      title="Our Services"
      description="Explore our comprehensive dental procedures"
    >
      <div className="flex overflow-auto gap-4 w-full pb-4">
        <Carousel
          len={props.len || services.length}
          hideMore={props.hideMore || false}
        />
      </div>
    </Section>
  </div>
);

export { Services };
