import { ReactNode } from 'react';

import className from 'classnames';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  reverse?: boolean;
};

const HeroOneButton = (props: IHeroOneButtonProps) => {
  const verticalFeatureClass = className('flex', 'flex-wrap', 'items-center', {
    'flex-row-reverse': props.reverse,
  });

  return (
    <div className={verticalFeatureClass}>
      <header className="w-full sm:w-1/2 sm:px-6 text-center">
        <h1 className="text-4xl text-gray-900 font-bold whitespace-pre-line leading-hero">
          {props.title}
        </h1>
        <div className="text-2xl mt-4 mb-12">{props.description}</div>
        {props.button}
      </header>
      <div className="w-full sm:w-1/2 p-6">
        <img
          className="bg-none mt-2"
          src="/assets/images/tanishaHero.png"
          style={{}}
          alt="Dr.Tanisha Hero Image"
          loading="lazy"
        />{' '}
      </div>
    </div>
  );
};

export { HeroOneButton };
