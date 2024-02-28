import { ReactNode } from 'react';

import Image from 'next/image';

import heroImg from '../../public/assets/images/hero.png';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  reverse?: boolean;
};

const HeroV3 = (props: IHeroOneButtonProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center">
      <div className="text-center py-8">
        <h1 className="text-4xl text-gray-900 font-semibold whitespace-pre-line leading-hero">
          {props.title}
        </h1>
        <div className="text-xl mt-4 font-semibold text-gray-700">
          {props.description}
        </div>
        <div className="mt-6">{props.button}</div>
      </div>
      <div className="max-w-sm lg:basis-2/5">
        <Image src={heroImg} alt="dentist w patient" />
      </div>
    </div>
  );
};

export { HeroV3 };
