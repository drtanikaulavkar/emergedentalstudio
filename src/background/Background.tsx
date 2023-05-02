import { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color?: string;
  image?: boolean;
};

const Background = (props: IBackgroundProps) => (
  <div>
    {props.image ? (
      <div
        className="bg-cover bg-center h-screen"
        style={{
          // backgroundImage: `url(${herobg.src})`,
          backgroundColor: '#deeefd',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="backdrop-filter backdrop-blur">{props.children}</div>
      </div>
    ) : (
      <div className={props.color}>{props.children}</div>
    )}
  </div>
);

export { Background };
