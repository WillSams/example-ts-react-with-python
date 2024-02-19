import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { InitialEntry } from 'history';

import { RootState } from '@/rootReducer';
import { initialState as defaultShared } from '@/shared/sharedReducer';

const mockStore: MockStoreCreator<any> = configureMockStore([
  /*middlewares*/
]);

interface CustomRenderOptions extends RenderOptions {
  children?: ReactNode;
  initialState: RootState;
  initialEntries: InitialEntry[];
}

const TestApp: FC<CustomRenderOptions> = ({
  children,
  initialState = { shared: { ...defaultShared } },
  initialEntries = [],
}) => (
  <Provider store={mockStore(initialState)}>
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  </Provider>
);

const customRender = (ui: React.ReactElement, options: CustomRenderOptions) => {
  const { initialState, initialEntries, ...restOptions } = options;
  return render(ui, {
    wrapper: (props) => (
      <TestApp
        {...props}
        initialState={initialState}
        initialEntries={initialEntries}
      />
    ),
    ...restOptions,
  });
};

export * from '@testing-library/react';
export { mockStore, customRender as render };
export type { CustomRenderOptions };
