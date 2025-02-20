import { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: string;
  title2: string;
  description: string;
  img: ReactNode;
  button: ReactNode;
  reverse?: boolean;
};

const HeroV3 = (props: IHeroOneButtonProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center w-screen">
        <div className="max-w-sm lg:basis-2/5 mx-auto lg:mx-0">{props.img}</div>
        <div className="flex flex-col justify-around">
          <div className="text-center px-4">
            <h1 className=" text-gray-900 font-bold whitespace-pre-line">
              <div>
                <p className="leading-tight text-2xl md:lg:text-4xl">
                  {props.title}
                </p>
                <p className="text-primary-500 leading-tight text-3xl md:lg:text-5xl">
                  {props.title2}
                </p>
              </div>
            </h1>
            <div className="text-xl md:lg:text-2xl leading-hero font-semibold text-gray-700">
              {props.description}
            </div>
          </div>
          <div className="text-center">{props.button}</div>
          {/* TODO: Add CTA for Whatsapp */}
        </div>
      </div>
    </>
  );
};

export { HeroV3 };
