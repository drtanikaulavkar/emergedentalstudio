import { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  xPadding?: string;
  children: ReactNode;
  leftTitle?: boolean;
};

const Section = (props: ISectionProps) => (
  <div
    className={`max-w-screen-lg mx-auto 
    ${props.yPadding ? props.yPadding : 'py-6 md:lg:py-8'} 
    ${props.xPadding ? props.xPadding : 'px-3'}
    }`}
  >
    {(props.title || props.description) && (
      <div
        className={`mb-2 md:lg:mb-6 ${
          props.leftTitle ? 'lg:text-left' : ''
        } text-center`}
      >
        {props.title && (
          <h2 className="text-4xl text-gray-900 font-bold">{props.title}</h2>
        )}
        {props.description && (
          <div className="text-xl md:px-20">{props.description}</div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
