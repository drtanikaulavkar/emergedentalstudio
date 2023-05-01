import { BsTelephone } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';

import { Section } from '../layout/Section';

const Maps = () => (
  <Section yPadding="pb-12">
    <div className="flex flex-wrap w-full justify-between gap-12">
      <div className="lg:basis-1/3">
        <ul>
          <li className="text-3xl">Emerge Dental Studio </li>
          <li className="text-xl">Dentist, Prosthodontist</li>
          <li className="text-xl">7th Main, Indiranagar</li>
        </ul>
        <ul className="space-y-2">
          <li>___</li>
          <li className="flex flex-row items-center align-middle gap-4">
            <BsTelephone className="text-primary-500" />
            <a href="tel:+918296801240">+91 918296 801240</a>
          </li>
          <li className="flex flex-row items-center align-middle gap-4">
            <MdAlternateEmail className="text-primary-500" />
            <a href="mailto:emergedentalstudio.com">emergedentalstudio.com</a>
          </li>
        </ul>
      </div>
      <div className="flex-grow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0059496583885!2d77.63272917520163!3d12.971470887343878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17258ff3f73d%3A0xa4f9b26340b29668!2sEmerge%20Dental%20Studio%20%7C%20Dentist%2C%20Prosthodontist%20%7C%207th%20Main%2C%20Indiranagar!5e0!3m2!1sen!2sin!4v1682962797284!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </Section>
);

export { Maps };
