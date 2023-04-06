import { ReactNode } from 'react';

import { Section } from './Section';

type IGridProps = {
  title?: string;
  yPadding?: string;
  children: ReactNode;
};

const Grid = (props: IGridProps) => (
  // <div
  //   className={`max-w-screen-lg mx-auto px-3 ${
  //     props.yPadding ? props.yPadding : 'py-8'
  //   }`}
  // >
  <Section title={props.title} yPadding="pt-12 pb-12">
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {props.children}
    </div>
  </Section>
  // </div>
);

export { Grid };
