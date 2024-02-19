import React from 'react';
import { useParams } from 'react-router-dom';

import { InvalidRoute } from '@/shared/components';
import { default as utils } from '@/shared/utils';

import { default as StaticFragment } from './partials';

const StaticComponent: React.FC = () => {
  const { componentType } = useParams<{ componentType: string }>();
  const formattedComponentType = utils.capitalizeFirstLetter(componentType);

  let componentToRender;

  if (formattedComponentType === 'Privacy') {
    componentToRender = <StaticFragment.PrivacyComponent />;
  } else if (formattedComponentType === 'Terms') {
    componentToRender = <StaticFragment.TermsComponent />;
  } else {
    componentToRender = <InvalidRoute />;
  }

  return (
    <div className="col-lg-12">
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-lg-12 px-0">
          <h1 className="display-4 font-italic">{formattedComponentType}</h1>
        </div>
      </div>
      {componentToRender}
    </div>
  );
};

export default StaticComponent;
