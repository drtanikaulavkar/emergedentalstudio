import { ReactNode } from 'react';

import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';

type IBaseProps = {
  children?: ReactNode;
};

const Base = (props: IBaseProps) => (
  <div className="antialiased text-gray-600 bg-slate-100">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    {props.children}
  </div>
);

export { Base };
