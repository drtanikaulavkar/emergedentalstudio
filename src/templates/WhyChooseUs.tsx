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
  { title: 'Experienced Dental Professionals', icon: <TbDental /> },
  { title: 'Latest Technology', icon: <HiOutlineDesktopComputer /> },
  { title: 'Multi-specialty Clinic', icon: <RiHospitalLine /> },
  { title: 'Safe & Private', icon: <MdOutlineHealthAndSafety /> },
  { title: 'Sanitized for your protection', icon: <RiHandSanitizerLine /> },
];

const WhyChooseUs = () => (
  <Grid title="Why Choose Us?" yPadding="py-16 px-3">
    {features.map((item) => (
      <div key={item.title} className="flex gap-4 items-center">
        <IconContext.Provider value={{ size: '32' }}>
          <div className=" text-primary-500">{item.icon}</div>
        </IconContext.Provider>
        <h3 className="text-xl text-gray-900 font-semibold">{item.title}</h3>
      </div>
    ))}
  </Grid>
);
// <div className="mt-1 bg-primary-500 rounded-full  p-1.5 w-8 h-8 shrink-0">
//   <div className="text-white">{item.icon}</div>
// </div>

export { WhyChooseUs };
