import { ReactNode } from 'react';

import { IconContext } from 'react-icons';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import {
  RiUserHeartLine,
  RiHospitalLine,
  RiHandSanitizerLine,
} from 'react-icons/ri';
import { TbDental } from 'react-icons/tb';

import { Grid } from '../layout/Grid';

const features: { title: string; icon?: ReactNode }[] = [
  { title: 'Individualised Dental Care', icon: <RiUserHeartLine /> },
  { title: 'Multi-specialty Clinic', icon: <RiHospitalLine /> },
  { title: 'Safe And Private', icon: <MdOutlineHealthAndSafety /> },
  { title: 'Experienced Dental Professionals', icon: <TbDental /> },
  { title: 'Latest Technology', icon: <HiOutlineDesktopComputer /> },
  { title: 'Sanitized For Your Protection', icon: <RiHandSanitizerLine /> },
];

const WhyChooseUs = () => (
  <Grid title="Why Choose Us?" yPadding="pt-0 pb-6 lg:pb-8 px-4">
    {features.map((item) => (
      <div key={item.title} className="flex gap-4 items-center">
        <IconContext.Provider value={{ size: '32' }}>
          <div className=" text-primary-900">{item.icon}</div>
        </IconContext.Provider>
        <p className="text-xl text-gray-900 font-semibold">{item.title}</p>
      </div>
    ))}
  </Grid>
);

export { WhyChooseUs };
