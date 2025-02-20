import { ReactNode } from 'react';

import { IconContext } from 'react-icons';
import { FaUserDoctor, FaLocationDot } from 'react-icons/fa6';
import {
  RiUserHeartLine,
  RiCapsuleFill,
  RiMoneyDollarCircleLine,
  RiHospitalLine,
} from 'react-icons/ri';

import { Grid } from '../layout/Grid';

const features: { title: string; icon?: ReactNode }[] = [
  { title: 'Experienced & Certified Dentists', icon: <FaUserDoctor /> },
  {
    title: 'Advanced Technology & Equipment',
    icon: <RiCapsuleFill />,
  },
  { title: 'Convenient Location in Indiranagar', icon: <FaLocationDot /> },
  { title: 'Personalised Dental Care', icon: <RiUserHeartLine /> },
  { title: 'Multispecialty Dental Clinic', icon: <RiHospitalLine /> },
  { title: 'Affordable & Flexible Pricing', icon: <RiMoneyDollarCircleLine /> },
];

const WhyChooseUs = () => (
  <Grid
    title="Why Choose Our Dental Clinic in Bengaluru?"
    yPadding="pt-0 pb-6 lg:pb-8 px-4"
    gridGap="4"
  >
    {features.map((item) => (
      <div key={item.title} className="flex gap-4 items-center p-2">
        <IconContext.Provider value={{ size: '32' }}>
          <div className="text-primary-900">{item.icon}</div>
        </IconContext.Provider>
        <p className="text-xl text-gray-900 font-semibold">{item.title}</p>
      </div>
    ))}
  </Grid>
);

export { WhyChooseUs };
