import { ReactNode } from 'react';

import herobg from '../../public/assets/images/heroBg.svg';

type IBackgroundProps = {
  children: ReactNode;
  color?: string;
  image?: boolean;
};

const Background = (props: IBackgroundProps) => (
  <div>
    {props.image ? (
      <div
        style={{
          backgroundImage: `url(${herobg.src})`,
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </div>
    ) : (
      <div className={props.color}>{props.children}</div>
    )}
  </div>
);

export { Background };
