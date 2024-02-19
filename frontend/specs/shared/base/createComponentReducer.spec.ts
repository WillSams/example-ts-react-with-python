import { createComponentReducer } from '../../../src/shared/base';

describe('createComponentReducer', () => {
  const componentName = 'TestComponent';
  const initialState = { loading: false };
  const actionHandlers = {};

  const componentReducer = createComponentReducer(componentName, initialState, actionHandlers);

  describe('should cycle LOAD_{componentName}, LOAD_{componentName}_SUCCESS, & UNLOAD_{componentName} lifecycle', () => {
    it(`LOAD_${componentName}`, () => {
      const state = componentReducer(initialState, { type: `LOAD_${componentName}` });
      expect(state).toEqual({ ...state, loading: true });
    });

    it(`LOAD_${componentName}_SUCCESS`, () => {
      const state = componentReducer(initialState, {
        type: `LOAD_${componentName}_SUCCESS`,
      });
      expect(state).toEqual({ ...state, loading: false });
    });

    it(`UNLOAD_${componentName}`, () => {
      const state = componentReducer(initialState, { type: `UNLOAD_${componentName}` });
      expect(state).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });
});

