import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { useLoadComponent } from '@/shared/hooks';

type Config = {
  state: (state: any, ownProps: any) => object;
  dispatch?: (dispatch: Dispatch) => object;
  componentName: string;
  load?: object;
};

const loadComponent = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: Config,
) => {
  const WithLoadComponent: React.FC<P> = (props) => {
    useLoadComponent({ props, config });

    return <WrappedComponent {...props} />;
  };

  WithLoadComponent.displayName = `WithLoadComponent${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  }`;

  return WithLoadComponent;
};

export const ConnectComponent = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: Config,
) => {
  const mapStateToProps = (state: any, ownProps: P) => {
    const stateFromConfig = config.state;

    return {
      ...stateFromConfig(state, ownProps),
    };
  };
  const mapDispatchToProps = (dispatch: Dispatch) => {
    const dispatchFromConfig: any = config.dispatch
      ? config.dispatch(dispatch)
      : {};

    dispatchFromConfig.getDispatch = () => dispatch;

    return dispatchFromConfig;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(loadComponent(WrappedComponent, config) as any);
};
