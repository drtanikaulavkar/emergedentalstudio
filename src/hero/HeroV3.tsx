import { ReactNode } from 'react';

import Image from 'next/image';

import heroImg from '../../public/assets/images/hero.jpg';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  reverse?: boolean;
};

const HeroV3 = (props: IHeroOneButtonProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-between items-center">
      <div className="flex-grow text-center py-8">
        <h1 className="text-5xl text-gray-900 font-semibold whitespace-pre-line leading-hero">
          {props.title}
        </h1>
        <div className="text-2xl mt-4 font-semibold text-gray-700">
          {props.description}
        </div>
        <div className="mt-6">{props.button}</div>
      </div>
      <div className=" lg:basis-2/5">
        <Image src={heroImg} alt="dentist w patient" />
      </div>
    </div>
  );
};

export { HeroV3 };
