import { ReactNode } from 'react';

import className from 'classnames';

import herobg from '../../public/assets/images/heroBg2.svg';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  reverse?: boolean;
};

const HeroV2 = (props: IHeroOneButtonProps) => {
  const verticalFeatureClass = className(
    'flex',
    'flex-wrap',
    'items-center',
    'py-24',
    {
      'flex-row-reverse': props.reverse,
    }
  );

  return (
    <div
      style={{
        backgroundImage: `url(${herobg.src})`,
        width: '100%',
        height: '100%',
      }}
    >
      <div className={verticalFeatureClass}>
        <header className="w-full text-center basis-2/3">
          <h1 className="text-4xl text-gray-900 font-bold whitespace-pre-line leading-hero">
            {props.title}
          </h1>
          <div className="text-2xl mt-4 mb-12">{props.description}</div>
          {props.button}
        </header>
      </div>
    </div>
  );
};

export { HeroV2 };
