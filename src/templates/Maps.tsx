import { BsTelephone, BsWhatsapp } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';

const Maps = () => (
  <div
    id="contact-us"
    className="flex flex-wrap w-full justify-between gap-12 text-gray-700"
  >
    <div className="lg:basis-1/3 ml-2 lg:ml-4">
      {/* <Image src={emergeSq} alt="emerge sq logo" height={75} width={75} /> */}
      <p className="text-2xl">
        {'Best "Dentist Near Me" in Indiranagar, Bengaluru'}
      </p>
      <p className="text-3xl"> {'Emerge Dental Studio'}</p>
      {/* <p className="text-xl">7th Main, Indiranagar</p> */}
      <ul className="space-y-2 text-xl">
        <li>___</li>
        <li className="flex flex-row items-center align-middle gap-2">
          <BsTelephone className="text-primary-500" />
          <a href="tel:+918296801240">+91 8296801240</a>
        </li>
        <li className="flex flex-row items-center align-middle gap-2">
          <BsWhatsapp className="text-primary-500" />
          <a
            target="_blank"
            href="https://wa.me/918296801240"
            rel="noopener noreferrer"
          >
            {'wa.me/918296801240'}
          </a>
        </li>
        <li className="flex flex-row items-center align-middle gap-2">
          <MdAlternateEmail className="text-primary-500" />
          <a href="mailto:emergedentalstudio@gmail.com">
            emergedentalstudio@gmail.com
          </a>
        </li>
      </ul>
    </div>
    <div className="flex-grow">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0059496583885!2d77.63272917520163!3d12.971470887343878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17258ff3f73d%3A0xa4f9b26340b29668!2sEmerge%20Dental%20Studio%20%7C%20Dentist%2C%20Prosthodontist%20%7C%207th%20Main%2C%20Indiranagar!5e0!3m2!1sen!2sin!4v1682962797284!5m2!1sen!2sin"
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: '10px', overflow: 'hidden' }}
        loading="lazy"
      />
    </div>
  </div>
);

export { Maps };
