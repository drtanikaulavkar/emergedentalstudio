import CountUp from 'react-countup';

import { Background } from '../background/Background';
import { Grid } from '../layout/Grid';

const statistics: {
  number: number;
  symbol: string;
  text: string;
  icon?: any;
}[] = [
  { number: 20, symbol: '+', text: 'dental services offered' },
  { number: 7, symbol: '+', text: 'proffesionals on board' },
  { number: 100, symbol: '%', text: 'happy patients' },
  { number: 10, symbol: '+', text: 'years of experience' },
];

const Stats = () => (
  <Background>
    <Grid gridLayout="grid-cols-2">
      {statistics.map((item) => (
        <div key={item.text} className="flex flex-col items-center p-2">
          <div className=" text-primary-500">{item.icon}</div>
          <h3 className="text-5xl text-gray-900 font-semibold">
            <CountUp end={item.number} enableScrollSpy />
            {item.symbol}
          </h3>
          <p className="text-center"> {item.text}</p>
        </div>
      ))}
    </Grid>
  </Background>
);

export { Stats };
