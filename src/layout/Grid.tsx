import { ReactNode } from 'react';

import { Section } from './Section';

type IGridProps = {
  title?: string;
  yPadding?: string;
  gridLayout?: string;
  children: ReactNode;
};

const Grid = (props: IGridProps) => (
  <Section title={props.title} yPadding={props.yPadding || 'py-8 px-8'}>
    <div
      className={`grid gap-6 ${
        props.gridLayout || 'sm:grid-cols-2 md:grid-cols-3'
      }`}
    >
      {props.children}
    </div>
  </Section>
  // </div>
);

export { Grid };
