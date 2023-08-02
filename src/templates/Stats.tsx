import Image from 'next/image';
import CountUp from 'react-countup';

import imgDentalServices from '../../public/assets/images/stats/dentalTreatments.svg';
import imgHappyPatients from '../../public/assets/images/stats/happyPatients.svg';
import imgProfsOnBoard from '../../public/assets/images/stats/profsOnBoard.svg';
import imgYearsOfExp from '../../public/assets/images/stats/yearsOfExp.svg';
import { Section } from '../layout/Section';

const statistics: {
  number: number;
  symbol: string;
  text: string;
  icon?: any;
}[] = [
  {
    number: 20,
    symbol: '+',
    text: 'Dental services',
    icon: imgDentalServices,
  },
  { number: 100, symbol: '%', text: 'Happy patients', icon: imgHappyPatients },
  {
    number: 7,
    symbol: '+',
    text: 'Professional dentists',
    icon: imgProfsOnBoard,
  },
  { number: 10, symbol: '+', text: 'Years of experience', icon: imgYearsOfExp },
];

const Stats = () => (
  <Section yPadding="py-0 md:lg:pt-0 pb-8">
    <div className="grid grid-cols-2 md:lg:grid-cols-4 gap-4">
      {statistics.map((item) => (
        <div key={item.text} className="flex flex-col items-center justify-end">
          {/* <div className="inline-block px-2 text-primary-500"> */}
          <Image
            src={item.icon}
            width={'100%'}
            height={'100%'}
            loading="lazy"
            alt=""
          />
          {/* </div> */}
          <h3 className="text-4xl text-gray-900 font-semibold">
            <CountUp end={item.number} enableScrollSpy />
            {item.symbol}
          </h3>
          <p className="text-center text-gray-900"> {item.text}</p>
        </div>
      ))}
    </div>
  </Section>
);

export { Stats };
// <div className="mt-1 bg-primary-500 rounded-full  p-1.5 w-8 h-8 shrink-0">
// style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium none;
// margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"
