import { ReactNode } from 'react';

import Image from 'next/image';

import heroImg from '../../public/assets/images/hero.png';

type IHeroOneButtonProps = {
  title: string;
  title2: string;
  description: string;
  button: ReactNode;
  reverse?: boolean;
};

const HeroV3 = (props: IHeroOneButtonProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-screen">
      <div className="text-center flex flex-col justify-items-stretch">
        <div className="flex-grow"></div>
        <h1 className="text-2xl md:lg:text-4xl text-gray-900 font-bold whitespace-pre-line">
          <div>
            <p className="leading-tight">{props.title}</p>
            <p className="text-primary-500 leading-tight">{props.title2}</p>
          </div>
        </h1>
        <div className="text-xl leading-hero font-semibold text-gray-700">
          {props.description}
        </div>
        <div className="flex-grow"></div>
        <div className="hidden lg:block">{props.button}</div>
        <div className="flex-grow"></div>
      </div>
      <div className="max-w-sm lg:basis-2/5">
        <Image src={heroImg} alt="dentist w patient" />
      </div>
      <div className="block lg:hidden mt-auto">{props.button}</div>
    </div>
  );
};

export { HeroV3 };
