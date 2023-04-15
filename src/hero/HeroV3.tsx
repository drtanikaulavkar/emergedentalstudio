import { ReactNode } from 'react';

import className from 'classnames';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  reverse?: boolean;
};

const HeroV3 = (props: IHeroOneButtonProps) => {
  const verticalFeatureClass = className(
    'flex',
    'relative',
    'flex-nowrap',
    'items-center',
    {
      'flex-row-reverse': props.reverse,
    }
  );

  return (
    <div className={verticalFeatureClass}>
      <header className="w-full flex-grow text-center lg:text-right">
        <h1 className="text-5xl text-gray-900 font-semibold whitespace-pre-line leading-hero">
          {props.title}
        </h1>
        <div className="text-2xl mt-4 mb-12 font-semibold text-primary-500 lg:text-gray-700">
          {props.description}
        </div>
        {props.button}
      </header>
      {/* <div className="hidden md:block lg:block relative bottom-0 right-0">
        <img
          className="hidden md:block lg:block bg-none mt-2"
          src="/assets/images/tanishaHero.png"
          style={{}}
          alt="Dr.Tanisha Hero Image"
          loading="lazy"
        />
      </div> */}
    </div>
  );
};

export { HeroV3 };
