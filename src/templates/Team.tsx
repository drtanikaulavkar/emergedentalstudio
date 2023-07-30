import { Section } from '../layout/Section';
import { PersonTeam } from './PersonTeam';

const services: {
  name: string;
  designation: string;
  qualification?: string;
  image?: string;
  description?: string;
}[] = [
  {
    name: 'Dr. Tanisha Kaulavkar',
    designation: 'Chief Dentist ',
    qualification: 'Maxillofacial Prosthodontist & Implantologist',
    description:
      'Dr Tanisha has completed her BDS and MDS in Prosthodontics from the prestigious SDM College of Dental Sciences and Hospital, Dharwad. She has received several gold medals throughout her educational career.',
    image: '/assets/team/tanisha.png',
  },
  {
    name: 'Dr. Meghana H Rao',
    designation: 'Root Canal Specialist',
    qualification: 'Endodontist',
    image: '/assets/team/meghana.png',
  },
  {
    name: 'Dr. Agharsh Chandrasekaran',
    designation: 'Braces & Aligners Specialist',
    qualification: 'Orthodontist',
    image: '/assets/team/agharsh.png',
  },
  {
    name: 'Dr. Bhargav K H',
    designation: 'Child’s Dental Care Specialist',
    qualification: 'Pedodontist',
    image: '/assets/team/bhargav.png',
  },
  {
    name: 'Dr. Uday',
    designation: 'Extractions & Surgery Specialist',
    qualification: 'Oral and Maxillofacial Surgeon',
    image: '/assets/team/uday.png',
  },
];

const Team = () => (
  <div id="meet-our-team">
    <Section title="Meet the Team">
      <div className="grid grid-cols-3 gap-2">
        {services.map((item) => (
          <PersonTeam
            key={item.name}
            name={item.name}
            designation={item.designation}
            description={item.description}
            qualification={item.qualification}
            photo={item.image}
          />
        ))}
      </div>
    </Section>
  </div>
);

export { Team };
