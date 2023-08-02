import Image from 'next/image';
import CountUp from 'react-countup';

import imgDentalServices from '../../public/assets/images/stats/dentalTreatments.svg';
import imgHappyPatients from '../../public/assets/images/stats/happyPatients.svg';
import imgProfsOnBoard from '../../public/assets/images/stats/profsOnBoard.svg';
import imgYearsOfExp from '../../public/assets/images/stats/yearsOfExp.svg';
import { Section } from '../layout/Section';

type StatType = {
  number: number;
  symbol: string;
  text: string;
  icon?: any;
};

const statistics: StatType[] = [
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

const Stat = (props: { item: StatType }) => (
  <div className="stat">
    <div className="stat-figure text-primary">
      <Image
        src={props.item.icon}
        width={'48'}
        height={'48'}
        loading="lazy"
        alt={`${props.item.text} icon`}
      />
    </div>
    <div className="font-semibold text-primary">{props.item.text}</div>
    <div className="stat-value text-primary">
      <CountUp end={props.item.number} enableScrollSpy />
      {props.item.symbol}
    </div>
    {/* <div className="stat-desc text-primary-100">21% more than last month</div> */}
  </div>
);
const Stats = () => (
  <Section yPadding="py-0 pb-8">
    <div className="flex justify-center bg-[#deeefd] rounded-lg">
      {/* <div className="stats stats-vertical bg-[#deeefd] text-gray-800 md:lg:stats-horizontal shadow"> */}
      {statistics.map((item) => (
        <Stat item={item} key={item.text} />
      ))}
    </div>
    {/* </div> */}
  </Section>
);

export { Stats as StatsV2 };
