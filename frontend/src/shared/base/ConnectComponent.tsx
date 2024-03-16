import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import { useLoadComponent } from '@/shared/hooks';

export interface DispatchFromConfig {
  getDispatch?: () => Dispatch;
}

export type Config = {
  state: unknown;
  actionCreators?: (dispatch: Dispatch) => object;
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
  const mapStateToProps = (state: unknown, ownProps: P) => {
    const stateFromConfig = config.state as (
      state: unknown,
      ownProps: P,
    ) => object;

    return {
      ...stateFromConfig(state, ownProps),
    };
  };
  const mapDispatchToProps = (dispatch: Dispatch) => {
    const dispatchFromConfig: DispatchFromConfig = config.actionCreators
      ? config.actionCreators(dispatch)
      : {};

    dispatchFromConfig.getDispatch = () => dispatch || {};

    return dispatchFromConfig;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(loadComponent(WrappedComponent, config) as React.ComponentType<unknown>);
};
